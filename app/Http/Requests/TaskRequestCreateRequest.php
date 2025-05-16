<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class TaskRequestCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return !$this->input('withProject') || Auth::check();
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'customer' => 'required|string|max:255',
            'customerEmail' => 'required|email|max:255',
            'customerPhone' => 'nullable|string|max:20',
            'withProject' => 'nullable|boolean',
            'projectName' => 'nullable|required_if:withProject,true|string|max:255',
            'files' => 'nullable|array|max:10',
            'files.*' => 'nullable|file|max:10240',
        ];
    }

    public function messages(): array
    {
        return [
            'projectName.required_if' => 'Название проекта обязательно, если выбрана опция "Создать проект"',
        ];
    }
}
