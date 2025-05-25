<?php

namespace App\Http\Requests\Admin;

use App\Rules\MaxTotalFileSize;
use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class UploadProjectFileRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        return $this->authorizeProject($this->route('id'), true);
    }

    public function rules(): array
    {
        return [
            'files' => ['required', 'array', 'max:10', new MaxTotalFileSize()],
        ];
    }

    public function messages(): array
    {
        return [
            'files.required' => 'Файлы обязательны для загрузки',
            'files.max' => 'Можно загрузить не более 10 файлов',
        ];
    }
}
