<?php

namespace App\Http\Requests;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;

class InviteRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        $project = Project::withCount('users')->with('task')->findOrFail($this->input('projectId'));

        return !($project->users->count() >= $project->task->max_members && $project->is_close);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'projectId' => 'required|exists:projects,id',
            'vacancyId' => 'nullable|exists:vacancies,id',
        ];
    }
}
