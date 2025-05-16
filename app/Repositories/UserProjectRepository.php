<?php

namespace App\Repositories;

use App\Models\UserProject;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Throwable;

class UserProjectRepository
{
    public function findByProjectAndUser(int $projectId, string $userId): UserProject
    {
        try {
            $userProject = UserProject::where('project_id', $projectId)
                ->where('user_id', $userId)
                ->first();

            if (!$userProject) {
                throw new ModelNotFoundException("Участник [$userId] не найден в проекте [$projectId].");
            }

            return $userProject;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось найти участника: {$e->getMessage()}", 0, $e);
        }
    }

    public function update(int $projectId, string $userId, array $data): void
    {
        try {
            DB::transaction(function () use ($projectId, $userId, $data) {
                $userProject = $this->findByProjectAndUser($projectId, $userId);
                $userProject->update([
                    'position' => $data['position'] ?? '',
                    'is_creator' => $data['isCreator'] ?? 0
                ]);
            });
            Cache::tags(['projects', 'user_projects'])->flush();
            Cache::tags(['projects'])->forget("project:{$projectId}");
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось обновить участника: {$e->getMessage()}", 0, $e);
        }
    }

    public function delete(int $projectId, string $userId): void
    {
        try {
            DB::transaction(function () use ($projectId, $userId) {
                $userProject = $this->findByProjectAndUser($projectId, $userId);
                $userProject->delete();
            });
            Cache::tags(['projects', 'user_projects'])->flush();
            Cache::tags(['projects'])->forget("project:{$projectId}");
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось удалить участника: {$e->getMessage()}", 0, $e);
        }
    }
}
