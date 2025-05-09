<?php

namespace App\Http\Requests;

use App\Models\Project;
use App\Models\UserProject;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateProjectMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        $projectId = $this->route('projectId');
        $user = Auth::user();

        $project = Project::find($projectId);
        if (!$project) {
            return false;
        }

        $isMentor = $project->mentor_id == $user->id;
        $isCreator = UserProject::where('project_id', $projectId)
            ->where('user_id', $user->id)
            ->where('is_creator', true)
            ->exists();

        if ($this->has('isCreator') && !$isMentor) {
            return false;
        }

        return $isMentor || $isCreator;
    }

    public function rules(): array
    {
        return [
            'position' => 'sometimes|string|max:255',
            'isCreator' => 'sometimes|boolean',
        ];
    }
}
