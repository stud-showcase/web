<?php

namespace App\Http\Requests;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteProjectFileRequest extends FormRequest
{
    public function authorize(): bool
    {
        $projectId = $this->route('projectId');
        $project = Project::find($projectId);

        if (!$project) {
            return false;
        }

        $isMentor = $project->mentor_id == Auth::id();
        $isTeamCreator = $project->users()
            ->where('user_id', Auth::id())
            ->wherePivot('is_creator', true)
            ->exists();

        return $isMentor || $isTeamCreator;
    }

    public function rules(): array
    {
        return [
            'fileId' => 'required|exists:project_files,id',
        ];
    }

    public function messages(): array
    {
        return [
            'fileId.required' => 'Файл не был загружен',
            'fileId.exists' => 'Файл не найден',
        ];
    }
}
