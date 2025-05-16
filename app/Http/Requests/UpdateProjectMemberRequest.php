<?php

namespace App\Http\Requests;

use App\Models\Project;
use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectMemberRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        // FIXME
        // if ($this->has('isCreator')) {
        //     $project = Project::select(['id', 'mentor_id'])->find($this->route('projectId'));
        //     return $project && $project->mentor_id == $this->user()->id;
        // }

        // return $this->authorizeProject($this->route('projectId'));
        return true;
    }

    public function rules(): array
    {
        return [
            'position' => 'sometimes|string|max:255',
            'isCreator' => 'sometimes|boolean',
        ];
    }
}
