<?php

namespace App\Http\Requests;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UploadProjectFileRequest extends FormRequest
{
    public function authorize()
    {
        $projectId = $this->route('id');
        $project = Project::find($projectId);

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

    public function rules()
    {
        return [
            'files' => 'required|array|min:1',
            'files.*' => 'required|file|max:10240',
        ];
    }

    public function messages()
    {
        return [
            'files.required' => 'Необходимо загрузить хотя бы один файл.',
            'files.array' => 'Файлы должны быть переданы в виде массива.',
            'files.min' => 'Необходимо загрузить хотя бы один файл.',
            'files.*.file' => 'Каждый загруженный объект должен быть файлом.',
            'files.*.max' => 'Размер каждого файла не должен превышать 10 МБ.',
        ];
    }
}
