/*! For license information please see site-reviews-blocks.js.LICENSE.txt */
!function(){"use strict";var e={367:function(e,t,n){var r=n(424),i=60103,a=60106;var s=60109,o=60110,l=60112;var u=60115,c=60116;if("function"==typeof Symbol&&Symbol.for){var d=Symbol.for;i=d("react.element"),a=d("react.portal"),d("react.fragment"),d("react.strict_mode"),d("react.profiler"),s=d("react.provider"),o=d("react.context"),l=d("react.forward_ref"),d("react.suspense"),u=d("react.memo"),c=d("react.lazy")}var v="function"==typeof Symbol&&Symbol.iterator;function f(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var p={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function g(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||p}function w(){}function h(e,t,n){this.props=e,this.context=t,this.refs=m,this.updater=n||p}g.prototype.isReactComponent={},g.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(f(85));this.updater.enqueueSetState(this,e,t,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},w.prototype=g.prototype;var y=h.prototype=new w;y.constructor=h,r(y,g.prototype),y.isPureReactComponent=!0;var b={current:null},x=Object.prototype.hasOwnProperty,_={key:!0,ref:!0,__self:!0,__source:!0};function j(e,t,n){var r,a={},s=null,o=null;if(null!=t)for(r in void 0!==t.ref&&(o=t.ref),void 0!==t.key&&(s=""+t.key),t)x.call(t,r)&&!_.hasOwnProperty(r)&&(a[r]=t[r]);var l=arguments.length-2;if(1===l)a.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];a.children=u}if(e&&e.defaultProps)for(r in l=e.defaultProps)void 0===a[r]&&(a[r]=l[r]);return{$$typeof:i,type:e,key:s,ref:o,props:a,_owner:b.current}}function k(e){return"object"==typeof e&&null!==e&&e.$$typeof===i}var S=/\/+/g;function O(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function C(e,t,n,r,s){var o=typeof e;"undefined"!==o&&"boolean"!==o||(e=null);var l=!1;if(null===e)l=!0;else switch(o){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case i:case a:l=!0}}if(l)return s=s(l=e),e=""===r?"."+O(l,0):r,Array.isArray(s)?(n="",null!=e&&(n=e.replace(S,"$&/")+"/"),C(s,t,n,"",(function(e){return e}))):null!=s&&(k(s)&&(s=function(e,t){return{$$typeof:i,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(s,n+(!s.key||l&&l.key===s.key?"":(""+s.key).replace(S,"$&/")+"/")+e)),t.push(s)),1;if(l=0,r=""===r?".":r+":",Array.isArray(e))for(var u=0;u<e.length;u++){var c=r+O(o=e[u],u);l+=C(o,t,n,c,s)}else if(c=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=v&&e[v]||e["@@iterator"])?e:null}(e),"function"==typeof c)for(e=c.call(e),u=0;!(o=e.next()).done;)l+=C(o=o.value,t,n,c=r+O(o,u++),s);else if("object"===o)throw t=""+e,Error(f(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return l}function R(e,t,n){if(null==e)return e;var r=[],i=0;return C(e,r,"","",(function(e){return t.call(n,e,i++)})),r}function L(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var A={current:null};function B(){var e=A.current;if(null===e)throw Error(f(321));return e}t.createElement=j},294:function(e,t,n){e.exports=n(367)},424:function(e){var t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function i(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,a){for(var s,o,l=i(e),u=1;u<arguments.length;u++){for(var c in s=Object(arguments[u]))n.call(s,c)&&(l[c]=s[c]);if(t){o=t(s);for(var d=0;d<o.length;d++)r.call(s,o[d])&&(l[o[d]]=s[o[d]])}}return l}}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}!function(){var e=n(294);function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function r(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,a=[],s=!0,o=!1;try{for(n=n.call(e);!(s=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);s=!0);}catch(e){o=!0,i=e}finally{try{s||null==n.return||n.return()}finally{if(o)throw i}}return a}}(e,n)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var i=wp.components.CheckboxControl,a=wp.element.useState,s=function(t,n,s){var o=[];return jQuery.each(t,(function(t,l){var u=r(a(!1),2),c=u[0],d=u[1],v=n.split(",").indexOf(t)>-1;o.push((0,e.createElement)(i,{key:"hide-".concat(t),className:"glsr-checkbox-control",checked:v||c,label:l,onChange:function(e){d(e),n=_.without(_.without(n.split(","),""),t),e&&n.push(t),s({hide:n.toString()})}}))})),o},o=(0,e.createElement)("svg",{width:"22px",height:"22px",viewBox:"0 0 22 22",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)("path",{d:"M11 2l-3 6-6 .75 4.13 4.62-1.13 6.63 6-3 6 3-1.12-6.63 4.12-4.62-6-.75-3-6zm0 2.24l2.34 4.69 4.65.58-3.18 3.56.87 5.15-4.68-2.34v-11.64zm8.28-.894v.963h-3.272v2.691h-1.017v-6.3h4.496v.963h-3.479v1.683h3.272z"})),l=(0,e.createElement)("svg",{width:"22px",height:"22px",viewBox:"0 0 22 22",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)("path",{d:"M11 2l-3 6-6 .75 4.13 4.62-1.13 6.63 6-3 6 3-1.12-6.63 4.12-4.62-6-.75-3-6zm0 2.24l2.34 4.69 4.65.58-3.18 3.56.87 5.15-4.68-2.34v-11.64zm3.681-3.54h2.592c1.449 0 2.232.648 2.232 1.823 0 1.071-.819 1.782-2.102 1.827l2.075 2.651h-1.26l-2.007-2.651h-.513v2.651h-1.017v-6.3zm2.565.954h-1.548v1.773h1.548c.819 0 1.202-.297 1.202-.905 0-.599-.405-.869-1.202-.869z"})),u=(0,e.createElement)("svg",{width:"22px",height:"22px",viewBox:"0 0 22 22",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)("path",{d:"M11 2l-3 6-6 .75 4.13 4.62-1.13 6.63 6-3 6 3-1.12-6.63 4.12-4.62-6-.75-3-6zm0 2.24l2.34 4.69 4.65.58-3.18 3.56.87 5.15-4.68-2.34v-11.64zm8.415-2.969l-.518.824c-.536-.342-1.13-.54-1.769-.54-.842 0-1.418.365-1.418.941 0 .522.491.725 1.31.842l.437.059c1.022.14 2.03.563 2.03 1.733 0 1.283-1.161 1.985-2.525 1.985-.855 0-1.881-.284-2.534-.846l.554-.81c.432.396 1.247.693 1.976.693.824 0 1.472-.351 1.472-.932 0-.495-.495-.725-1.418-.851l-.491-.068c-.936-.131-1.868-.572-1.868-1.742 0-1.265 1.121-1.967 2.484-1.967.918 0 1.643.257 2.277.68z"})),c=wp.i18n._x,d=[{label:"- "+c("Select","admin-text","site-reviews")+" -",value:""},{label:"- "+c("Specific Post ID","admin-text","site-reviews")+" -",value:"custom"},{label:c("The Current Page","admin-text","site-reviews"),value:"post_id"},{label:c("The Parent Page","admin-text","site-reviews"),value:"parent_id"}],v=wp.i18n._x,f=[],p={label:"- "+v("Select","admin-text","site-reviews")+" -",value:""},m={label:"- "+v("Multiple Categories","admin-text","site-reviews")+" -",value:"custom"};wp.apiFetch({path:"/site-reviews/v1/categories?per_page=50"}).then((function(e){f.push(p),f.push(m),jQuery.each(e,(function(e,t){f.push({label:"".concat(t.name," (").concat(t.slug,")"),value:t.id})}))}));var g=f,w=wp.i18n._x,h=[{label:"- "+w("Select","admin-text","site-reviews")+" -",value:""},{label:"- "+w("Specific User ID","admin-text","site-reviews")+" -",value:"custom"},{label:w("The Logged-in user","admin-text","site-reviews"),value:"user_id"},{label:w("The Page author","admin-text","site-reviews"),value:"author_id"},{label:w("The Profile user (BuddyPress/Ultimate Member)","admin-text","site-reviews"),value:"profile_id"}],y=function(e,t,n){GLSR.Event.trigger(t,e,n)};function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var j=function(e,t){var n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.raw);return n.hide&&(n.hide=n.hide.join()),n.rating&&(n.rating=Number(n.rating)),~["","post_id","parent_id"].indexOf(n.assigned_posts)?t.assign_to?n.assign_to=n.assigned_posts:n.assigned_to=n.assigned_posts:t.assign_to?n.assign_to="custom":n.assigned_to="custom",n.user=n.assigned_users,~_.findIndex(h,(function(e){return e.value==n.assigned_users}))||(n.user="custom"),n.category=n.assigned_terms,~_.findIndex(g,(function(e){return e.value==n.assigned_terms}))||(n.category="custom"),n};function k(){return k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},k.apply(this,arguments)}function S(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var O=["children","custom_value","help","label","onChange","options","className","hideLabelFromVision","selectedValue"],C=(wp.i18n._x,wp.components),R=C.BaseControl,L=(C.TextControl,lodash.isEmpty),A=wp.compose.useInstanceId;function B(t){var n=t.children,r=t.custom_value,i=void 0===r?"custom":r,a=t.help,s=t.label,o=t.onChange,l=t.options,u=void 0===l?[]:l,c=t.className,d=t.hideLabelFromVision,v=(t.selectedValue,S(t,O)),f=A(B),p="inspector-select-control-".concat(f),m=v.value;return!L(u)&&(0,e.createElement)(R,{label:s,hideLabelFromVision:d,id:p,help:a,className:c},(0,e.createElement)("select",k({id:p,className:"components-select-control__input",onChange:function(e){o(e.target.value)},"aria-describedby":a?"".concat(p,"__help"):void 0},v),u.map((function(t,n){return(0,e.createElement)("option",{key:"".concat(t.label,"-").concat(t.value,"-").concat(n),value:t.value,disabled:t.disabled},t.label)}))),i===m&&n)}var I=wp.element,E=I.useRef,N=I.useState,G=I.useEffect;function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var T=lodash,M=T.debounce,U=T.isEqual,z=T.reduce,$=wp.compose.usePrevious,q=wp.element,Q=q.RawHTML,F=q.useEffect,V=q.useRef,Y=q.useState,J=wp.i18n,X=J.__,H=J.sprintf,K=wp.apiFetch,W=wp.url.addQueryArgs,Z=wp.components,ee=Z.Placeholder,te=Z.Spinner,ne=wp.blocks.getBlockType;function re(e,t,n){var r,i,a,s,o,l,u=(r=function(){return M(e,t,n)},i=[e,t,n],a=N((function(){return{inputs:i,result:r()}}))[0],s=E(!0),o=E(a),l=s.current||Boolean(i&&o.current.inputs&&function(e,t){if(e.length!==t.length)return!1;for(var n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}(i,o.current.inputs))?o.current:{inputs:i,result:r()},G((function(){s.current=!1,o.current=l}),[l]),l.result);return F((function(){return function(){return u.cancel()}}),[u]),u}function ie(t){var n=t.className;return(0,e.createElement)(ee,{className:n},X("Block rendered as empty."))}function ae(t){var n=t.response,r=t.className,i=H(X("Error loading block: %s"),n.errorMsg);return(0,e.createElement)(ee,{className:r},i)}function se(t){var n=t.className;return(0,e.createElement)(ee,{className:n},(0,e.createElement)(te,null))}function oe(t){var n=t.attributes,i=t.block,a=t.className,s=t.httpMethod,o=void 0===s?"GET":s,l=t.urlQueryArgs,u=t.EmptyResponsePlaceholder,c=void 0===u?ie:u,d=t.ErrorResponsePlaceholder,v=void 0===d?ae:d,f=t.LoadingResponsePlaceholder,p=void 0===f?se:f,m=V(!0),g=V(),w=r(Y(null),2),h=w[0],y=w[1],b=$(t);function x(){var e;if(m.current){null!==h&&y(null);var t=null!==(e=n&&function(e,t){var n=ne(e);if(void 0===n)throw new Error("Block type '".concat(e,"' is not registered."));return z(n.attributes,(function(e,n,r){var i=t[r];return void 0!==i?e[r]=i:n.hasOwnProperty("default")&&(e[r]=n.default),-1!==["node","children"].indexOf(n.source)&&("string"==typeof e[r]?e[r]=[e[r]]:Array.isArray(e[r])||(e[r]=[])),e}),{})}(i,n))&&void 0!==e?e:null,r="POST"===o,a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return W("/wp/v2/block-renderer/".concat(e),P(P({context:"edit"},null!==t?{attributes:t}:{}),n))}(i,r?null:t,l),s=r?{attributes:t}:null,u=g.current=K({path:a,data:s,method:r?"POST":"GET"}).then((function(e){m.current&&u===g.current&&e&&y(e.rendered)})).catch((function(e){m.current&&u===g.current&&y({error:!0,errorMsg:e.message})}));return u}}var _=re(x,500);return F((function(){return function(){m.current=!1}}),[]),F((function(){void 0===b?x():U(b,t)||_()})),F((function(){t.onRender&&t.onRender(h,i,n)}),[h]),""===h?(0,e.createElement)(c,t):h?h.error?(0,e.createElement)(v,k({response:h},t)):(0,e.createElement)(Q,{className:a},h):(0,e.createElement)(p,t)}var le=wp.i18n._x,ue=wp.blocks,ce=ue.createBlock,de=ue.registerBlockType,ve=wp.blockEditor,fe=ve.InspectorAdvancedControls,pe=ve.InspectorControls,me=wp.components,ge=me.PanelBody,we=(me.SelectControl,me.TextControl),he=GLSR_Block.nameprefix+"/form",ye={assign_to:{default:"",type:"string"},assigned_posts:{default:"",type:"string"},assigned_terms:{default:"",type:"string"},assigned_users:{default:"",type:"string"},category:{default:"",type:"string"},className:{default:"",type:"string"},hide:{default:"",type:"string"},id:{default:"",type:"string"},user:{default:"",type:"string"}},be=(de(he,{attributes:ye,category:GLSR_Block.nameprefix,description:le("Display a review form.","admin-text","site-reviews"),edit:function(t){var n=t.attributes,r=n.assign_to,i=n.assigned_posts,a=n.assigned_terms,o=n.assigned_users,l=n.category,u=n.hide,c=n.id,v=n.user,f=(t.className,t.setAttributes),p={assign_to:(0,e.createElement)(B,{key:"assigned_posts",label:le("Assign Reviews to a Page","admin-text","site-reviews"),onChange:function(e){return f({assign_to:e,assigned_posts:"custom"===e?i:""})},options:d,value:r},(0,e.createElement)(we,{className:"glsr-base-conditional-control",help:le("Separate values with a comma.","admin-text","site-reviews"),onChange:function(e){return f({assigned_posts:e})},placeholder:le("Enter the Post IDs","admin-text","site-reviews"),type:"text",value:i})),category:(0,e.createElement)(B,{key:"assigned_terms",label:le("Assign Reviews to a Category","admin-text","site-reviews"),onChange:function(e){return f({category:e,assigned_terms:"custom"===e?a:""})},options:g,value:l},(0,e.createElement)(we,{className:"glsr-base-conditional-control",help:le("Separate values with a comma.","admin-text","site-reviews"),onChange:function(e){return f({assigned_terms:e})},placeholder:le("Enter the Category IDs or slugs","admin-text","site-reviews"),type:"text",value:a})),user:(0,e.createElement)(B,{key:"assigned_users",label:le("Assign Reviews to a User","admin-text","site-reviews"),onChange:function(e){return f({user:e,assigned_users:"custom"===e?o:""})},options:h,value:v},(0,e.createElement)(we,{className:"glsr-base-conditional-control",help:le("Separate values with a comma.","admin-text","site-reviews"),onChange:function(e){return f({assigned_users:e})},placeholder:le("Enter the User IDs or usernames","admin-text","site-reviews"),type:"text",value:o})),hide:s(GLSR_Block.hideoptions.site_reviews_form,u,f)},m={id:(0,e.createElement)(we,{label:le("Custom ID","admin-text","site-reviews"),onChange:function(e){return f({id:e})},value:c})};return[(0,e.createElement)(pe,null,(0,e.createElement)(ge,{title:le("Settings","admin-text","site-reviews")},Object.values(wp.hooks.applyFilters(GLSR_Block.nameprefix+".form.InspectorControls",p,t)))),(0,e.createElement)(fe,null,Object.values(wp.hooks.applyFilters(GLSR_Block.nameprefix+".form.InspectorAdvancedControls",m,t))),(0,e.createElement)(oe,{block:he,attributes:t.attributes,onRender:y})]},example:{},icon:{src:o},keywords:["reviews","form"],save:function(){return null},title:le("Submit a Review","admin-text","site-reviews"),transforms:{from:[{type:"block",blocks:["core/legacy-widget"],isMatch:function(e){var t=e.idBase,n=e.instance;return"glsr_site-reviews-form"===t&&!(null==n||!n.raw)},transform:function(e){var t=e.instance;return ce(he,j(t,ye))}}]}}),wp.i18n._x),xe=[{label:"- "+be("Select","admin-text","site-reviews")+" -",value:""},{label:be("Terms were accepted","admin-text","site-reviews"),value:"true"},{label:be("Terms were not accepted","admin-text","site-reviews"),value:"false"}],_e={label:"- "+(0,wp.i18n._x)("Select","admin-text","site-reviews")+" -",value:""},je=[];wp.apiFetch({path:"/site-reviews/v1/types?per_page=50"}).then((function(e){e.length<2||(je.push(_e),jQuery.each(e,(function(e,t){je.push({label:t.name,value:t.id})})))}));var ke=je,Se=wp.i18n._x,Oe=wp.blocks,Ce=Oe.createBlock,Re=Oe.registerBlockType,Le=wp.blockEditor,Ae=Le.InspectorAdvancedControls,Be=Le.InspectorControls,Ie=wp.components,Ee=Ie.PanelBody,Ne=Ie.RangeControl,Ge=Ie.SelectControl,De=Ie.TextControl,Pe=Ie.ToggleControl,Te=GLSR_Block.nameprefix+"/reviews",Me={assigned_to:{default:"",type:"string"},assigned_posts:{default:"",type:"string"},assigned_terms:{default:"",type:"string"},assigned_users:{default:"",type:"string"},category:{default:"",type:"string"},className:{default:"",type:"string"},display:{default:5,type:"number"},hide:{default:"",type:"string"},id:{default:"",type:"string"},pagination:{default:"",type:"string"},post_id:{default:"",type:"string"},rating:{default:0,type:"number"},schema:{default:!1,type:"boolean"},terms:{default:"",type:"string"},type:{default:"local",type:"string"},user:{default:"",type:"string"}};wp.hooks.addFilter("blocks.getBlockAttributes",Te,(function(e,t,n,r){return r&&r.count&&(e.display=r.count),e}));Re(Te,{attributes:Me,category:GLSR_Block.nameprefix,description:Se("Display your most recent reviews.","admin-text","site-reviews"),edit:function(t){t.attributes.post_id=jQuery("#post_ID").val();var n=t.attributes,r=n.assigned_to,i=n.assigned_posts,a=n.assigned_terms,o=n.assigned_users,l=n.category,u=n.display,c=n.hide,v=n.id,f=n.pagination,p=n.rating,m=n.schema,w=n.terms,b=n.type,x=n.user,_=(t.className,t.setAttributes),j={assigned_to:(0,e.createElement)(B,{key:"assigned_posts",label:Se("Limit Reviews to an Assigned Page","admin-text","site-reviews"),onChange:function(e){return _({assigned_to:e,assigned_posts:"custom"===e?i:""})},options:d,value:r},(0,e.createElement)(De,{className:"glsr-base-conditional-control",help:Se("Separate values with a comma.","admin-text","site-reviews"),onChange:function(e){return _({assigned_posts:e})},placeholder:Se("Enter the Post IDs","admin-text","site-reviews"),type:"text",value:i})),category:(0,e.createElement)(B,{key:"assigned_terms",label:Se("Limit Reviews to an Assigned Category","admin-text","site-reviews"),onChange:function(e){return _({category:e,assigned_terms:"custom"===e?a:""})},options:g,value:l},(0,e.createElement)(De,{className:"glsr-base-conditional-control",help:Se("Separate values with a comma.","admin-text","site-reviews"),onChange:function(e){return _({assigned_terms:e})},placeholder:Se("Enter the Category IDs or slugs","admin-text","site-reviews"),type:"text",value:a})),user:(0,e.createElement)(B,{key:"assigned_users",label:Se("Limit Reviews to an Assigned User","admin-text","site-reviews"),onChange:function(e){return _({user:e,assigned_users:"custom"===e?o:""})},options:h,value:x},(0,e.createElement)(De,{className:"glsr-base-conditional-control",help:Se("Separate values with a comma.","admin-text","site-reviews"),onChange:function(e){return _({assigned_users:e})},placeholder:Se("Enter the User IDs or usernames","admin-text","site-reviews"),type:"text",value:o})),terms:(0,e.createElement)(Ge,{key:"terms",label:Se("Limit Reviews to terms","admin-text","site-reviews"),onChange:function(e){return _({terms:e})},options:xe,value:w}),pagination:(0,e.createElement)(Ge,{key:"pagination",label:Se("Enable Pagination","admin-text","site-reviews"),onChange:function(e){return _({pagination:e})},options:[{label:"- "+Se("Select","admin-text","site-reviews")+" -",value:""},{label:Se("Yes (AJAX load more)","admin-text","site-reviews"),value:"loadmore"},{label:Se("Yes (AJAX pagination)","admin-text","site-reviews"),value:"ajax"},{label:Se("Yes (page reload)","admin-text","site-reviews"),value:"true"}],value:f}),type:(0,e.createElement)(Ge,{key:"type",label:Se("Limit the Type of Reviews","admin-text","site-reviews"),onChange:function(e){return _({type:e})},options:ke,value:b}),display:(0,e.createElement)(Ne,{key:"display",label:Se("Reviews Per Page","admin-text","site-reviews"),min:1,max:50,onChange:function(e){return _({display:e})},value:u}),rating:(0,e.createElement)(Ne,{key:"rating",label:Se("Minimum Rating","admin-text","site-reviews"),min:0,max:GLSR_Block.maxrating,onChange:function(e){return _({rating:e})},value:p}),schema:(0,e.createElement)(Pe,{key:"schema",checked:m,help:Se("The schema should only be enabled once per page.","admin-text","site-reviews"),label:Se("Enable the schema?","admin-text","site-reviews"),onChange:function(e){return _({schema:e})}}),hide:s(GLSR_Block.hideoptions.site_reviews,c,_)},k={id:(0,e.createElement)(De,{label:Se("Custom ID","admin-text","site-reviews"),onChange:function(e){return _({id:e})},value:v})};return[(0,e.createElement)(Be,null,(0,e.createElement)(Ee,{title:Se("Settings","admin-text","site-reviews")},Object.values(wp.hooks.applyFilters(GLSR_Block.nameprefix+".reviews.InspectorControls",j,t)))),(0,e.createElement)(Ae,null,Object.values(wp.hooks.applyFilters(GLSR_Block.nameprefix+".reviews.InspectorAdvancedControls",k,t))),(0,e.createElement)(oe,{block:Te,attributes:t.attributes,onRender:y})]},example:{attributes:{display:2,pagination:"ajax",rating:0}},icon:{src:l},keywords:["reviews"],save:function(){return null},title:Se("Latest Reviews","admin-text","site-reviews"),transforms:{from:[{type:"block",blocks:["core/legacy-widget"],isMatch:function(e){var t=e.idBase,n=e.instance;return"glsr_site-reviews"===t&&!(null==n||!n.raw)},transform:function(e){var t=e.instance;return Ce(Te,j(t,Me))}}]}});var Ue=wp.i18n._x,ze=wp.blocks,$e=ze.createBlock,qe=ze.registerBlockType,Qe=wp.blockEditor,Fe=Qe.InspectorAdvancedControls,Ve=Qe.InspectorControls,Ye=wp.components,Je=Ye.PanelBody,Xe=Ye.RangeControl,He=Ye.SelectControl,Ke=Ye.TextControl,We=Ye.ToggleControl,Ze=GLSR_Block.nameprefix+"/summary",et={assigned_to:{default:"",type:"string"},assigned_posts:{default:"",type:"string"},assigned_terms:{default:"",type:"string"},assigned_users:{default:"",type:"string"},category:{default:"",type:"string"},className:{default:"",type:"string"},hide:{default:"",type:"string"},post_id:{default:"",type:"string"},rating:{default:0,type:"number"},schema:{default:!1,type:"boolean"},terms:{default:"",type:"string"},type:{default:"local",type:"string"},user:{default:"",type:"string"}};qe(Ze,{attributes:et,category:GLSR_Block.nameprefix,description:Ue("Display a summary of your reviews.","admin-text","site-reviews"),edit:function(t){t.attributes.post_id=jQuery("#post_ID").val();var n=t.attributes,r=n.assigned_to,i=n.assigned_posts,a=n.assigned_terms,o=n.assigned_users,l=n.category,u=(n.display,n.hide),c=(n.id,n.pagination,n.rating),v=n.schema,f=n.terms,p=n.type,m=n.user,w=(t.className,t.setAttributes),b={assigned_to:(0,e.createElement)(B,{key:"assigned_posts",label:Ue("Limit Reviews to an Assigned Page","admin-text","site-reviews"),onChange:function(e){return w({assigned_to:e,assigned_posts:"custom"===e?i:""})},options:d,value:r},(0,e.createElement)(Ke,{className:"glsr-base-conditional-control",help:Ue("Separate values with a comma.","admin-text","site-reviews"),onChange:function(e){return w({assigned_posts:e})},placeholder:Ue("Enter the Post IDs","admin-text","site-reviews"),type:"text",value:i})),category:(0,e.createElement)(B,{key:"assigned_terms",label:Ue("Limit Reviews to an Assigned Category","admin-text","site-reviews"),onChange:function(e){return w({category:e,assigned_terms:"custom"===e?a:""})},options:g,value:l},(0,e.createElement)(Ke,{className:"glsr-base-conditional-control",help:Ue("Separate values with a comma.","admin-text","site-reviews"),onChange:function(e){return w({assigned_terms:e})},placeholder:Ue("Enter the Category IDs or slugs","admin-text","site-reviews"),type:"text",value:a})),user:(0,e.createElement)(B,{key:"assigned_users",label:Ue("Limit Reviews to an Assigned User","admin-text","site-reviews"),onChange:function(e){return w({user:e,assigned_users:"custom"===e?o:""})},options:h,value:m},(0,e.createElement)(Ke,{className:"glsr-base-conditional-control",help:Ue("Separate values with a comma.","admin-text","site-reviews"),onChange:function(e){return w({assigned_users:e})},placeholder:Ue("Enter the User IDs or usernames","admin-text","site-reviews"),type:"text",value:o})),terms:(0,e.createElement)(He,{key:"terms",label:Ue("Limit Reviews to terms","admin-text","site-reviews"),onChange:function(e){return w({terms:e})},options:xe,value:f}),type:(0,e.createElement)(He,{key:"type",label:Ue("Limit the Type of Reviews","admin-text","site-reviews"),onChange:function(e){return w({type:e})},options:ke,value:p}),rating:(0,e.createElement)(Xe,{key:"rating",label:Ue("Minimum Rating","admin-text","site-reviews"),min:0,max:GLSR_Block.maxrating,onChange:function(e){return w({rating:e})},value:c}),schema:(0,e.createElement)(We,{key:"schema",checked:v,help:Ue("The schema should only be enabled once per page.","admin-text","site-reviews"),label:Ue("Enable the schema?","admin-text","site-reviews"),onChange:function(e){return w({schema:e})}}),hide:s(GLSR_Block.hideoptions.site_reviews_summary,u,w)};return[(0,e.createElement)(Ve,null,(0,e.createElement)(Je,{title:Ue("Settings","admin-text","site-reviews")},Object.values(wp.hooks.applyFilters(GLSR_Block.nameprefix+".summary.InspectorControls",b,t)))),(0,e.createElement)(Fe,null,Object.values(wp.hooks.applyFilters(GLSR_Block.nameprefix+".summary.InspectorAdvancedControls",{},t))),(0,e.createElement)(oe,{block:Ze,attributes:t.attributes,onRender:y})]},example:{},icon:{src:u},keywords:["reviews","summary"],save:function(){return null},title:Ue("Rating Summary","admin-text","site-reviews"),transforms:{from:[{type:"block",blocks:["core/legacy-widget"],isMatch:function(e){var t=e.idBase,n=e.instance;return"glsr_site-reviews-summary"===t&&!(null==n||!n.raw)},transform:function(e){var t=e.instance;return $e(Ze,j(t,et))}}]}})}()}();