<?php

namespace App\Http\Requests\Admin;

use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class RemoveProjectMentorRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        return $this->authorizeRemoveMentor($this->route('id'));
    }

    public function rules(): array
    {
        return [];
    }
}
