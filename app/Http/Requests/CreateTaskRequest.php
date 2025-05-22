<?php

namespace App\Http\Requests;

use App\Rules\MaxTotalFileSize;
use Illuminate\Foundation\Http\FormRequest;

class CreateTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'customer' => 'required|string|max:255',
            'maxProjects' => 'required|integer|min:1|max:127',
            'maxMembers' => 'required|integer|min:1|max:127',
            'customerEmail' => 'nullable|email|max:255',
            'customerPhone' => 'nullable|string|max:20',
            'deadline' => 'required|date|after:now',
            'complexityId' => 'required|exists:complexities,id',
            'files' => ['nullable', 'array', 'max:10', new MaxTotalFileSize()],
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Название задачи обязательно для заполнения',
            'title.max' => 'Название задачи не может превышать 255 символов',
            'description.required' => 'Описание задачи обязательно для заполнения',
            'description.max' => 'Описание задачи не может превышать 1000 символов',
            'customer.required' => 'Имя заказчика обязательно для заполнения',
            'customer.max' => 'Имя заказчика не может превышать 255 символов',
            'maxProjects.required' => 'Максимальное количество проектов обязательно',
            'maxProjects.min' => 'Максимальное количество проектов должно быть не менее 1',
            'maxProjects.max' => 'Максимальное количество проектов не может превышать 127',
            'maxMembers.required' => 'Максимальное количество участников обязательно',
            'maxMembers.min' => 'Максимальное количество участников должно быть не менее 1',
            'maxMembers.max' => 'Максимальное количество участников не может превышать 127',
            'customerEmail.email' => 'Электронная почта заказчика должна быть действительным адресом',
            'customerEmail.max' => 'Электронная почта заказчика не может превышать 255 символов',
            'customerPhone.max' => 'Телефон заказчика не может превышать 20 символов',
            'deadline.required' => 'Дедлайн обязателен для заполнения',
            'deadline.date' => 'Дедлайн должен быть корректной датой',
            'deadline.after' => 'Недопустимая дата',
            'complexityId.required' => 'Сложность задачи обязательна',
            'complexityId.exists' => 'Указана неверная сложность',
            'files.max' => 'Можно загрузить не более 10 файлов',
            'tags.*.exists' => 'Указан неверный тег',
        ];
    }
}
