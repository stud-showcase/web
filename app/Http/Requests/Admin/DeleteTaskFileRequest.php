<?php

namespace App\Http\Requests\Admin;

use App\Models\Task;
use Illuminate\Foundation\Http\FormRequest;

class DeleteTaskFileRequest extends FormRequest
{
    public function authorize(): bool
    {
        $task = Task::find($this->route('taskId'));

        if (!$task) {
            return false;
        }

        return $task->files()->where('id', $this->route('fileId'))->exists();
    }

    public function rules(): array
    {
        return [];
    }

    public function messages(): array
    {
        return [];
    }
}
