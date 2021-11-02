/**
 * External dependencies
 */
import { useMemoOne } from './use-memo-one';

const { debounce, isEqual, reduce } = lodash;
const { usePrevious } = wp.compose;
const { RawHTML, useEffect, useRef, useState } = wp.element;
const { __, sprintf } = wp.i18n;
const { apiFetch } = wp;
const { addQueryArgs } = wp.url;
const { Placeholder, Spinner } = wp.components;
const { getBlockType } = wp.blocks;

function __experimentalSanitizeBlockAttributes(name, attributes) {
    // Get the type definition associated with a registered block.
    const blockType = getBlockType(name);
    if (undefined === blockType) {
        throw new Error(`Block type '${ name }' is not registered.`);
    }
    return reduce(blockType.attributes, (accumulator, schema, key) => {
        const value = attributes[key];
        if (undefined !== value) {
            accumulator[key] = value;
        } else if (schema.hasOwnProperty('default')) {
            accumulator[key] = schema.default;
        }
        if (['node', 'children'].indexOf(schema.source) !== -1) {
            // Ensure value passed is always an array, which we're expecting in
            // the RichText component to handle the deprecated value.
            if (typeof accumulator[key] === 'string') {
                accumulator[key] = [accumulator[key]];
            } else if (!Array.isArray(accumulator[key])) {
                accumulator[key] = [];
            }
        }
        return accumulator;
    }, {});
}

function useDebounce(fn, wait, options) {
    const debounced = useMemoOne(() => debounce(fn, wait, options), [
        fn,
        wait,
        options,
    ]);
    useEffect(() => () => debounced.cancel(), [debounced]);
    return debounced;
}

function rendererPath(block, attributes = null, urlQueryArgs = {}) {
    return addQueryArgs(`/wp/v2/block-renderer/${ block }`, {
        context: 'edit',
        ...(null !== attributes ? { attributes } : {}),
        ...urlQueryArgs,
    });
}

function DefaultEmptyResponsePlaceholder({ className }) {
    return (
        <Placeholder className={ className }>
            { __('Block rendered as empty.') }
        </Placeholder>
    );
}

function DefaultErrorResponsePlaceholder({ response, className }) {
    const errorMessage = sprintf(
        // translators: %s: error message describing the problem
        __('Error loading block: %s'),
        response.errorMsg
    );
    return <Placeholder className={ className }>{ errorMessage }</Placeholder>;
}

function DefaultLoadingResponsePlaceholder({ children, showLoader }) {
    return (
        <div style={{ position: 'relative' }}>
            { showLoader && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-9px',
                        marginLeft: '-9px',
                    }}
                >
                    <Spinner />
                </div>
            )}
            <div style={{ opacity: showLoader ? '0.3' : 1 }}>
                { children }
            </div>
        </div>
    );
}

export default function ServerSideRender(props) {
    const {
        attributes,
        block,
        className,
        httpMethod = 'GET',
        urlQueryArgs,
        EmptyResponsePlaceholder = DefaultEmptyResponsePlaceholder,
        ErrorResponsePlaceholder = DefaultErrorResponsePlaceholder,
        LoadingResponsePlaceholder = DefaultLoadingResponsePlaceholder,
    } = props;

    const isMountedRef = useRef(true);
    const [showLoader, setShowLoader] = useState(false);
    const fetchRequestRef = useRef();
    const [response, setResponse] = useState(null);
    const prevProps = usePrevious(props);
    const [isLoading, setIsLoading] = useState(false);

    function fetchData() {
        if (!isMountedRef.current) {
            return;
        }
        setIsLoading(true);


        const sanitizedAttributes = (attributes && __experimentalSanitizeBlockAttributes(block, attributes)) ?? null;
        // If httpMethod is 'POST', send the attributes in the request body instead of the URL.
        // This allows sending a larger attributes object than in a GET request, where the attributes are in the URL.
        const isPostRequest = 'POST' === httpMethod;
        const urlAttributes = isPostRequest ? null : sanitizedAttributes;
        const path = rendererPath(block, urlAttributes, urlQueryArgs);
        const data = isPostRequest ? { attributes: sanitizedAttributes } : null;
        // Store the latest fetch request so that when we process it, we can
        // check if it is the current request, to avoid race conditions on slow networks.
        const fetchRequest = (fetchRequestRef.current = apiFetch({
                path,
                data,
                method: isPostRequest ? 'POST' : 'GET',
            })
            .then((fetchResponse) => {
                if (isMountedRef.current && fetchRequest === fetchRequestRef.current && fetchResponse) {
                    setResponse(fetchResponse.rendered);
                }
            })
            .catch((error) => {
                if (isMountedRef.current && fetchRequest === fetchRequestRef.current) {
                    setResponse({
                        error: true,
                        errorMsg: error.message,
                    });
                }
            })
            .finally(() => {
                if (isMountedRef.current && fetchRequest === fetchRequestRef.current) {
                    setIsLoading(false);
                }
            }));
        return fetchRequest;
    }

    const debouncedFetchData = useDebounce(fetchData, 500);

    // When the component unmounts, set isMountedRef to false. This will
    // let the async fetch callbacks know when to stop.
    useEffect(
        () => () => {
            isMountedRef.current = false;
        },
        []
    );

    useEffect(() => {
        // Don't debounce the first fetch. This ensures that the first render
        // shows data as soon as possible
        if (prevProps === undefined) {
            fetchData();
        } else if (!isEqual(prevProps, props)) {
            debouncedFetchData();
        }
    });

    /**
     * Effect to handle showing the loading placeholder.
     * Show it only if there is no previous response or
     * the request takes more than one second.
     */
    useEffect(() => {
        if (!isLoading) {
            return;
        }
        const timeout = setTimeout(() => {
            setShowLoader(true);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [isLoading]);

    /**
     * Effect to allow triggering something after render
     */
    useEffect(() => {
        if (props.onRender) {
            debounce(props.onRender, 250)(response, block, attributes);
        }
    }, [response]);

    const hasResponse = !! response;
    const hasEmptyResponse = response === '';
    const hasError = response?.error;

    if (hasEmptyResponse || !hasResponse) {
        return <EmptyResponsePlaceholder { ...props } />;
    }
    if (hasError) {

        return <ErrorResponsePlaceholder response={ response } { ...props } />;
    }
    if (isLoading) {
        return (
            <LoadingResponsePlaceholder { ...props } showLoader={ showLoader }>
                { hasResponse && (<RawHTML className={ className }>{ response }</RawHTML>)}
            </LoadingResponsePlaceholder>
        );
    }
    return <RawHTML className={ className }>{ response }</RawHTML>;
}
