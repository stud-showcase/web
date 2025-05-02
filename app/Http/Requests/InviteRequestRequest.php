<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InviteRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'project_id' => 'required|exists:projects,id',
            'vacancy_id' => 'nullable|exists:vacancies,id',
        ];
    }
}
