<?php

namespace App\Http\Requests;

use App\Models\Task;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        $task = Task::find($this->input('taskId'));
        return $task && $task->canTake(Auth::user());
    }

    public function rules(): array
    {
        return [
            'taskId' => 'required|exists:tasks,id',
            'projectName' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'taskId.required' => 'Выберите задачу',
            'taskId.exists' => 'Выбранная задача не найдена',
            'projectName.required' => 'Название проекта обязательно',
            'projectName.max' => 'Название проекта не может превышать 255 символов',
        ];
    }
}
