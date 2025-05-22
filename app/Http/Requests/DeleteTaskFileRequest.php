<?php

namespace App\Http\Requests;

use App\Models\Task;
use Illuminate\Foundation\Http\FormRequest;

class DeleteTaskFileRequest extends FormRequest
{
    public function authorize(): bool
    {
        $task = Task::find($this->route('id'));
        if (!$task) {
            return false;
        }

        return true;
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
