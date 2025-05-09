<?php

namespace App\Http\Requests;

use App\Models\ProjectInvite;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AcceptInviteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $invite = ProjectInvite::find($this->input('inviteId'));
        $inviteProject = $invite->project;
        $currentUser = Auth::user();

        if ($inviteProject->id != $this->route('id')) {
            return false;
        }

        $isPrivileged = $currentUser->hasPrivilegedRole();
        $isTeamCreator = $inviteProject->users()
            ->where('user_id', $currentUser->id)
            ->wherePivot('is_creator', true)
            ->exists();

        return $isPrivileged || $isTeamCreator;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'inviteId' => 'required|exists:project_invites,id',
        ];
    }
}
