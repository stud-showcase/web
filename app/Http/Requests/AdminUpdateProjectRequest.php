<?php

namespace App\Http\Requests;

use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class AdminUpdateProjectRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        return $this->authorizeProject($this->route('id'), true);
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'annotation' => 'sometimes|string|nullable',
            'statusId' => 'sometimes|integer|exists:project_statuses,id',
            'isActive' => 'sometimes|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.max' => 'Название проекта не может превышать 255 символов',
            'annotation.max' => 'Аннотация не может превышать 1000 символов',
            'statusId.exists' => 'Указанный статус не существует',
        ];
    }
}
