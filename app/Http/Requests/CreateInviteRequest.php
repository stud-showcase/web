<?php

namespace App\Http\Requests;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateInviteRequest extends FormRequest
{
    public function authorize(): bool
    {
        $project = Project::find($this->route('id'));
        return !Auth::user()->hasPrivilegedRole() && $project && $project->is_hiring;
    }

    public function rules(): array
    {
        return [
            'vacancyId' => 'nullable|exists:vacancies,id',
        ];
    }

    public function messages(): array
    {
        return [
            'vacancyId.exists' => 'Вакансия не найдена',
        ];
    }
}
