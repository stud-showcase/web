<?php

namespace App\Http\Requests;

use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class DeleteProjectFileRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        return $this->authorizeProject($this->route('projectId'));
    }

    public function rules(): array
    {
        return [
            'fileId' => 'required|exists:project_files,id',
        ];
    }

    public function messages(): array
    {
        return [
            'fileId.required' => 'Файл не был загружен',
            'fileId.exists' => 'Файл не найден',
        ];
    }
}
