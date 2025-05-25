<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::user()->hasAnyRole('admin');
    }

    public function rules(): array
    {
        return [];
    }
}
