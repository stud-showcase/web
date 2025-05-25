<?php

namespace App\Http\Requests;

use App\Models\ProjectInvite;
use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class AcceptInviteRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        $invite = ProjectInvite::find($this->input('inviteId'));
        if (!$invite) {
            return false;
        }

        $projectId = $invite->project->id;
        if ($projectId != $this->route('id')) {
            return false;
        }

        return $this->authorizeProject($projectId);
    }

    public function rules(): array
    {
        return [
            'inviteId' => 'required|exists:project_invites,id',
        ];
    }

    public function messages(): array
    {
        return [
            'inviteId.exists' => 'Приглашение не найдено'
        ];
    }
}
