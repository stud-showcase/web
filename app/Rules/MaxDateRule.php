<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MaxDateRule implements ValidationRule
{
    private int $maxYears;

    public function __construct(int $maxYears = 100)
    {
        $this->maxYears = $maxYears;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!$value) {
            return;
        }

        $maxDate = now()->addYears($this->maxYears);
        $inputDate = \DateTime::createFromFormat('Y-m-d', $value);

        if (!$inputDate) {
            $fail('Некорректный формат даты');
            return;
        }

        if ($inputDate > $maxDate) {
            $fail("Дата не может быть больше чем {$maxDate->format('Y-m-d')}");
        }
    }
}
