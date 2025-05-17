<?php

namespace App\Http\Requests;

use App\Models\ProjectInvite;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AcceptInviteRequest extends FormRequest
{
    public function authorize(): bool
    {
        // FIXME
        // $invite = ProjectInvite::find($this->input('inviteId'));
        // if (!$invite) {
        //     return false;
        // }

        // $project = $invite->project;
        // $user = Auth::user();

        // if ($project->id != $this->route('id')) {
        //     return false;
        // }

        // return $user->hasPrivilegedRole() || $project->users()
        //     ->where('user_id', $user->id)
        //     ->wherePivot('is_creator', true)
        //     ->exists();
        return true;
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
