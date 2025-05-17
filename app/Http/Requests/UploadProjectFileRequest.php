<?php

namespace App\Http\Requests;

use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

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
            'files' => 'required|array|max:10',
            'files.*' => 'file|max:10240',
        ];
    }

    public function messages(): array
    {
        return [
            'files.required' => 'Файлы обязательны для загрузки',
            'files.*.max' => 'Размер каждого файла не может превышать 10 МБ',
        ];
    }
}
