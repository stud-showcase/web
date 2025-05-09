<?php

namespace App\Http\Requests;

use App\Models\Task;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        $task = Task::findOrFail($this->input('taskId'));
        return $task->canTake(Auth::user());
    }

    public function rules(): array
    {
        return [
            'taskId' => 'required|exists:tasks,id',
            'projectName' => 'required|string|max:255',
        ];
    }
}
