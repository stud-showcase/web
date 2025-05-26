<?php

namespace App\Http\Requests\Admin;

use App\Rules\MaxTotalFileSize;
use Illuminate\Foundation\Http\FormRequest;

class UploadTaskFileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
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
            'files.required' => 'Необходимо выбрать хотя бы один файл',
            'files.max' => 'Можно загрузить не более 10 файлов',
        ];
    }
}
