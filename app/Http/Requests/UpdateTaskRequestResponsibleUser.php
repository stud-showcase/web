<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequestMentorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'responsibleUserId' => 'required|exists:users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'responsibleUserId.required' => 'Необходимо указать ответственного пользователя',
            'responsibleUserId.exists' => 'Указанный пользователь не существует',
        ];
    }
}
