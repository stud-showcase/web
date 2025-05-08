<?php

namespace App\Http\Requests;

use App\Models\Project;
use App\Models\Vacancy;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateVacancyRequest extends FormRequest
{
    public function authorize()
    {
        $projectId = $this->route('projectId');
        $vacancyId = $this->route('vacancyId');

        $project = Project::find($projectId);
        $vacancy = Vacancy::find($vacancyId);

        if (!$project || !$vacancy) {
            return false;
        }

        if ($vacancy->project_id != $project->id) {
            return false;
        }

        $isMentor = $project->mentor_id == Auth::id();
        $isTeamCreator = $project->users()
            ->where('user_id', Auth::id())
            ->wherePivot('is_creator', true)
            ->exists();

        return $isMentor || $isTeamCreator;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Название вакансии обязательно.',
            'name.string' => 'Название вакансии должно быть строкой.',
            'name.max' => 'Название вакансии не может превышать 255 символов.',
            'description.required' => 'Описание вакансии обязательно.',
            'description.string' => 'Описание вакансии должно быть строкой.',
            'description.max' => 'Описание вакансии не может превышать 1000 символов.',
        ];
    }
}
