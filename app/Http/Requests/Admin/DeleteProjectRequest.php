<?php

namespace App\Http\Requests\Admin;

use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class DeleteProjectRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        return $this->authorizeProject($this->route('id'), true);
    }

    public function rules(): array
    {
        return [];
    }
}
