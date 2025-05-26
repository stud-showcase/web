<?php

namespace App\Http\Requests\Admin;

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
            'startDate' => 'required|date|before:endDate',
            'endDate' => 'required|date|after:startDate',
        ];
    }
}
