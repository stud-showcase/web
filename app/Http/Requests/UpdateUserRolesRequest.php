<?php

namespace App\Http\Requests;

use App\Models\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateUserRolesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::user()->hasAnyRole('admin');
    }

    public function rules(): array
    {
        return [
            'roles' => 'required|array',
            'roles.*' => 'integer|exists:roles,id',
        ];
    }
}
