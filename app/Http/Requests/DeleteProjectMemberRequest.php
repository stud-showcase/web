<?php

namespace App\Http\Requests;

use App\Models\Project;
use App\Models\UserProject;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteProjectMemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}
