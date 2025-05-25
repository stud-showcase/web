<?php

namespace App\Http\Requests\Admin;

use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class DeleteProjectMemberRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        return $this->authorizeProject($this->route('projectId'), true);
    }

    public function rules(): array
    {
        return [];
    }
}
