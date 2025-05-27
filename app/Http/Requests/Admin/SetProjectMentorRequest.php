<?php

namespace App\Http\Requests\Admin;

use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class SetProjectMentorRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        return $this->authorizeSetMentor($this->route('id'), $this->input('mentorId'));
    }

    public function rules(): array
    {
        return [
            'mentorId' => 'required|string|exists:users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'mentorId.required' => 'Необходимо указать ментора',
            'mentorId.exists' => 'Выбранный ментор не существует в системе',
        ];
    }
}
