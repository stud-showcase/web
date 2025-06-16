<?php

namespace App\Http\Requests;

use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class DeleteProjectMemberRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        return $this->authorizeProject($this->route('projectId'));
    }

    public function rules(): array
    {
        return [];
    }
}
