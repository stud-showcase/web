<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MaxTotalFileSize implements ValidationRule
{
    protected int $maxSizeInMb;

    public function __construct(int $maxSizeInMb = 10)
    {
        $this->maxSizeInMb = $maxSizeInMb;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_array($value)) {
            $fail('Неверный формат файлов.');
            return;
        }

        $totalSize = array_reduce($value, function ($sum, $file) {
            return $sum + $file->getSize();
        }, 0);

        $maxSizeBytes = $this->maxSizeInMb * 1024 * 1024;

        if ($totalSize > $maxSizeBytes) {
            $fail("Общий размер файлов не должен превышать {$this->maxSizeInMb} МБ.");
        }
    }
}
