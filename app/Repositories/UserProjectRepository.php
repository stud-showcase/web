<?php

namespace App\Repositories;

use App\Models\UserProject;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class UserProjectRepository
{
    public function findByProjectAndUser(int $projectId, string $userId): UserProject
    {
        $userProject = UserProject::where('project_id', $projectId)
            ->where('user_id', $userId)
            ->first();

        if (!$userProject) {
            throw new ModelNotFoundException("Участник [$userId] не найден в проекте [$projectId].");
        }

        return $userProject;
    }

    public function update(int $projectId, string $userId, array $data): void
    {
        DB::transaction(function () use ($projectId, $userId, $data) {
            $userProject = $this->findByProjectAndUser($projectId, $userId);
            $userProject->update($data);
        });
    }

    public function delete(int $projectId, string $userId): void
    {
        DB::transaction(function () use ($projectId, $userId) {
            $userProject = $this->findByProjectAndUser($projectId, $userId);
            $userProject->delete();
        });
    }
}
