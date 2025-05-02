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
        $invite = ProjectInvite::find($this->input('invite_id'));

        if (!$invite) {
            return false;
        }

        $project = $invite->project;

        if (!$project) {
            return false;
        }

        return $project->users()
            ->where('user_id', Auth::id())
            ->wherePivot('is_creator', true)
            ->exists();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'invite_id' => 'required|exists:project_invite,id',
        ];
    }
}
