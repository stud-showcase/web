<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return !empty($this->input('roles')) ? Auth::user()->hasAnyRole('admin') : true;
    }

    public function rules(): array
    {
        $userId = $this->route('id');

        return [
            'firstName' => 'sometimes|string|max:255',
            'secondName' => 'sometimes|string|max:255',
            'lastName' => 'sometimes|string|max:255|nullable',
            'email' => [
                'sometimes',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'group' => 'sometimes|string|max:255|nullable',
            'roles' => 'sometimes|array',
            'roles.*' => 'string|exists:roles,name',
        ];
    }

    public function messages(): array
    {
        return [
            'firstName.max' => 'Имя не должно превышать 255 символов',
            'secondName.max' => 'Отчество не должно превышать 255 символов',
            'lastName.max' => 'Фамилия не должна превышать 255 символов',
            'email.email' => 'Укажите корректный email адрес',
            'email.max' => 'Email не должен превышать 255 символов',
            'email.unique' => 'Этот email уже используется',
            'group.max' => 'Название группы не должно превышать 255 символов',
            'roles.array' => 'Роли должны быть переданы в виде списка',
            'roles.*.exists' => 'Выбрана несуществующая роль',
        ];
    }
}
