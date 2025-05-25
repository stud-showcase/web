<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::user()->hasAnyRole('admin');
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
        ];
    }
}
