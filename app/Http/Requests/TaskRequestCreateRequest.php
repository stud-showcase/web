<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequestCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // Вы можете добавить логику проверки авторизации пользователя
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'customer' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:20',
            'with_project' => 'nullable|boolean',
            'project_name' => 'nullable|required_if:with_project,true|string|max:255',
            'files.*' => ['nullable', 'file', 'max:10240'],
        ];
    }

    /**
     * Customize the error messages.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'project_name.required_if' => 'Название проекта обязательно, если выбрана опция "Создать проект".',
        ];
    }
}
