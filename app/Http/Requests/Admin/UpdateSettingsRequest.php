<?php

namespace App\Http\Requests\Admin;

use App\Rules\MaxDateRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'startDate' => [
                'required',
                'date',
                'before:endDate',
                new MaxDateRule(100),
            ],
            'endDate' => [
                'required',
                'date',
                'after:startDate',
                new MaxDateRule(100),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'startDate.required' => 'Дата начала обязательна',
            'startDate.date' => 'Некорректный формат даты начала',
            'startDate.before' => 'Дата начала должна быть раньше даты окончания',
            'endDate.required' => 'Дата окончания обязательна',
            'endDate.date' => 'Некорректный формат даты окончания',
            'endDate.after' => 'Дата окончания должна быть позже даты начала',
        ];
    }
}
