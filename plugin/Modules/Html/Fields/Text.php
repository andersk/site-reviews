<?php

namespace GeminiLabs\SiteReviews\Modules\Html\Fields;

use GeminiLabs\SiteReviews\Modules\Html\Fields\Field;

class Text extends Field
{
	/**
	 * @return string|void
	 */
	public function build()
	{
		$this->mergeFieldArgs();
		return $this->builder->buildTag();
	}

	/**
	 * @return array
	 */
	public static function defaults()
	{
		return [
			'class' => 'regular-text',
		];
	}
}
