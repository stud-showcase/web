<?php

namespace App\Http\Requests;

use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class CreateVacancyRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        return $this->authorizeProject($this->route('id'));
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Название вакансии обязательно',
            'name.max' => 'Название вакансии не может превышать 255 символов',
            'description.required' => 'Описание вакансии обязательно',
            'description.max' => 'Описание вакансии не может превышать 1000 символов',
        ];
    }
}
