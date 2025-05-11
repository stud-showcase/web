<?php

namespace App\Http\Requests;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ShowControlPanelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
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

        return $isMentor || $isTeamCreator;
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
