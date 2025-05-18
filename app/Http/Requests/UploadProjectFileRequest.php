<?php

namespace App\Http\Requests;

use App\Rules\MaxTotalFileSize;
use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class UploadProjectFileRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        return $this->authorizeProject($this->route('id'));
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
