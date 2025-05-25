<?php

namespace App\Traits;

use App\Models\Project;
use Illuminate\Support\Facades\Auth;

trait AuthorizesProjectActions
{
    /**
     * Проверяет, может ли пользователь выполнять действия над проектом.
     *
     * @param int $projectId ID проекта
     * @param bool $restrictToMentorAndAdmin Ограничить доступ только менторам и админам
     * @return bool
     */
    protected function authorizeProject(int $projectId, bool $restrictToMentorAndAdmin = false): bool
    {
        $project = Project::find($projectId);
        if (!$project) {
            return false;
        }

        $user = Auth::user();
        $isMentor = $project->mentor_id === $user->id;
        $isAdmin = $user->hasAnyRole('admin');

        if ($restrictToMentorAndAdmin) {
            return $isMentor || $isAdmin;
        }

        $isCreator = $project->users()
            ->where('user_id', $user->id)
            ->wherePivot('is_creator', true)
            ->exists();

        return $isMentor || $isCreator || $isAdmin;
    }

    /**
     * Проверяет, может ли пользователь установить ментора для проекта.
     *
     * @param int $projectId ID проекта
     * @param int $mentorId ID пользователя, которого хотят назначить ментором
     * @return bool
     */
    protected function authorizeSetMentor(int $projectId, int $mentorId): bool
    {
        $project = Project::find($projectId);
        if (!$project) {
            return false;
        }

        $user = Auth::user();

        if ($user->hasAnyRole('admin')) {
            return true;
        }

        if ($user->hasAnyRole('mentor') && $mentorId == $user->id) {
            return true;
        }

        return false;
    }

    /**
     * Проверяет, может ли пользователь удалить ментора из проекта.
     *
     * @param int $projectId ID проекта
     * @return bool
     */
    protected function authorizeRemoveMentor(int $projectId): bool
    {
        $project = Project::find($projectId);
        if (!$project) {
            return false;
        }

        $user = Auth::user();
        $isAdmin = $user->hasAnyRole('admin');
        $isMentorRole = $user->hasAnyRole('mentor') && $project->mentor_id == $user->id;

        return $isAdmin || $isMentorRole;
    }
}
