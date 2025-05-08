<?php

namespace App\Http\Requests;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateProjectRequest extends FormRequest
{
    public function authorize()
    {
        $project = Project::find($this->route('id'));

        if (!$project) {
            return false;
        }

        $isMentor = $project->mentor_id == Auth::id();
        $isTeamCreator = $project->users()
            ->where('user_id', Auth::id())
            ->wherePivot('is_creator', true)
            ->exists();

        if ($this->has('status_id') && !$isMentor) {
            return false;
        }

        return $isMentor || $isTeamCreator;
    }

    public function rules()
    {
        return [
            'name' => 'sometimes|string|max:255',
            'annotation' => 'sometimes|string|max:1000',
            'status_id' => 'sometimes|exists:project_statuses,id',
        ];
    }

    public function messages()
    {
        return [
            'name.string' => 'Название проекта должно быть строкой.',
            'name.max' => 'Название проекта не может превышать 255 символов.',
            'annotation.string' => 'Аннотация должна быть строкой.',
            'annotation.max' => 'Аннотация не может превышать 1000 символов.',
            'status_id.exists' => 'Указанный статус не существует.',
        ];
    }
}
