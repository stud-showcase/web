<?php

namespace App\Http\Requests;

use App\Models\Vacancy;
use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class UpdateVacancyRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        $vacancy = Vacancy::select(['id', 'project_id'])->find($this->route('vacancyId'));
        if (!$vacancy || $vacancy->project_id != $this->route('projectId')) {
            return false;
        }

        return $this->authorizeProject($this->route('projectId'));
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Название вакансии обязательно',
            'name.max' => 'Название вакансии не может превышать 255 символов',
            'description.required' => 'Описание вакансии обязательно',
            'description.max' => 'Описание вакансии не может превышать 1000 символов',
        ];
    }
}
