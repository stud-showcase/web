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
        $restrictToMentorAndAdmin = $this->has('isCreator');
        return $this->authorizeProject($this->route('projectId'), $restrictToMentorAndAdmin);
    }

    public function rules(): array
    {
        return [
            'position' => 'sometimes|string|max:255',
            'isCreator' => 'sometimes|boolean',
        ];
    }
}
