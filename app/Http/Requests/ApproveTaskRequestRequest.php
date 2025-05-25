<?php

namespace App\Http\Requests;

use App\Rules\MaxTotalFileSize;
use Illuminate\Foundation\Http\FormRequest;

class ApproveTaskRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
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
            'maxProjects' => 'nullable|integer|min:1|max:127',
            'maxMembers' => 'required|integer|min:1|max:127',
            'deadline' => 'required|date',
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
            'customer.required' => 'Имя заказчика обязательно для заполнения',
            'customer.max' => 'Имя заказчика не может превышать 255 символов',
            'customerEmail.required' => 'Электронная почта заказчика обязательна для заполнения',
            'customerEmail.email' => 'Электронная почта заказчика должна быть действительным адресом',
            'customerEmail.max' => 'Электронная почта заказчика не может превышать 255 символов',
            'customerPhone.max' => 'Телефон заказчика не может превышать 20 символов',
            'projectName.required_if' => 'Название проекта обязательно, если выбрана опция "Создать проект"',
            'projectName.max' => 'Название проекта не может превышать 255 символов',
            'maxMembers.min' => 'Максимальное количество участников должно быть не менее 1',
            'maxMembers.max' => 'Максимальное количество участников не может превышать 127',
            'maxProjects.min' => 'Максимальное количество проектов должно быть не менее 1',
            'maxProjects.max' => 'Максимальное количество проектов не может превышать 127',
            'deadline.date' => 'Дедлайн должен быть корректной датой',
            'complexityId.required' => 'Выберите сложность',
            'complexityId.exists' => 'Указана неверная сложность',
            'files.max' => 'Можно загрузить не более 10 файлов',
            'tags.*.exists' => 'Указан неверный тег',
        ];
    }
}
