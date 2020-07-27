<?php

namespace GeminiLabs\SiteReviews\Modules\Html\Fields;

class Hidden extends Field
{
    /**
     * @inheritDoc
     */
    public static function required($fieldLocation = null)
    {
        return [
            'is_raw' => true,
        ];
    }
}
