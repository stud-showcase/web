<?php

namespace App\Http\Requests;

use App\Rules\MaxTotalFileSize;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateApplicationRequest extends FormRequest
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
            'files' => ['nullable', 'array', 'max:10', new MaxTotalFileSize()],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Название заявки обязательно для заполнения',
            'title.max' => 'Название заявки не может превышать 255 символов',
            'description.required' => 'Описание заявки обязательно для заполнения',
            'customer.required' => 'Имя заказчика обязательно для заполнения',
            'customer.max' => 'Имя заказчика не может превышать 255 символов',
            'customerEmail.required' => 'Электронная почта заказчика обязательна для заполнения',
            'customerEmail.email' => 'Электронная почта заказчика должна быть действительным адресом',
            'customerEmail.max' => 'Электронная почта заказчика не может превышать 255 символов',
            'customerPhone.max' => 'Телефон заказчика не может превышать 20 символов',
            'projectName.required_if' => 'Название проекта обязательно, если выбрана опция "Создать проект"',
            'projectName.max' => 'Название проекта не может превышать 255 символов',
            'files.max' => 'Можно загрузить не более 10 файлов',
        ];
    }
}
