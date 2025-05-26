<?php

namespace App\Http\Requests\Admin;

use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class SetProjectMentorRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        return $this->authorizeSetMentor($this->route('projectId'), $this->input('mentorId'));
    }

    public function rules(): array
    {
        return [
            'mentorId' => 'required|integer|exists:users,id',
        ];
    }
}
