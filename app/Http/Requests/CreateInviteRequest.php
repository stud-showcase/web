<?php

namespace App\Http\Requests;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;

class CreateInviteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        $project = Project::withCount('users')->with('task')->findOrFail($this->route('id'));

        return !($project->users_count >= $project->task->max_members && $project->is_close);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'vacancyId' => 'nullable|exists:vacancies,id',
        ];
    }
}
