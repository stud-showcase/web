<?php

namespace App\Http\Requests;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;

class CreateInviteRequest extends FormRequest
{
    public function authorize(): bool
    {
        $project = Project::withCount('users')->with('task')->find($this->route('id'));
        if (!$project) {
            return false;
        }

        return !($project->users_count >= $project->task->max_members && $project->is_close);
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
