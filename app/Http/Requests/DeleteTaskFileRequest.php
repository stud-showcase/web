<?php

namespace App\Http\Requests;

use App\Models\Task;
use App\Models\TaskFile;
use Illuminate\Foundation\Http\FormRequest;

class DeleteTaskFileRequest extends FormRequest
{
    public function authorize(): bool
    {
        $task = Task::find($this->route('taskId'));
        $taskFile = TaskFile::find($this->route('fileId'));
        return $task && $taskFile;
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
