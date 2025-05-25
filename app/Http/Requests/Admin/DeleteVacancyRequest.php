<?php

namespace App\Http\Requests\Admin;

use App\Models\Vacancy;
use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class DeleteVacancyRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        $vacancy = Vacancy::select(['id', 'project_id'])->find($this->route('vacancyId'));
        if (!$vacancy || $vacancy->project_id != $this->route('projectId')) {
            return false;
        }

        return $this->authorizeProject($this->route('projectId'), true);
    }

    public function rules(): array
    {
        return [];
    }
}
