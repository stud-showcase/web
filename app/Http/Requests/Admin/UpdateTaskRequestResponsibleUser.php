<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateTaskRequestResponsibleUser extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::user()->hasAnyRole(['admin']);
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
