<?php

namespace App\Traits;

use App\Models\Project;
use Illuminate\Support\Facades\Auth;

trait AuthorizesProjectActions
{
    protected function authorizeProject(int $projectId): bool
    {
        $project = Project::find($projectId);
        if (!$project) {
            return false;
        }

        $user = Auth::user();
        $isMentor = $project->mentor_id == $user->id;
        $isCreator = $project->users()
            ->where('user_id', $user->id)
            ->wherePivot('is_creator', true)
            ->exists();

        return $isMentor || $isCreator;
    }
}
