<?php

namespace App\Repositories;

use App\Models\ProjectInvite;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Throwable;

class ProjectInviteRepository
{
    public function create(string $userId, int $projectId, int|string|null $vacancyId): void
    {
        try {
            ProjectInvite::create([
                'user_id' => $userId,
                'project_id' => $projectId,
                'vacancy_id' => $vacancyId,
            ]);
            Cache::tags(['projects'])->forget("project:{$projectId}");
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось создать приглашение: {$e->getMessage()}", 0, $e);
        }
    }

    public function acceptInvite(ProjectInvite $invite): void
    {
        try {
            DB::transaction(function () use ($invite) {
                DB::table('user_project')->insert([
                    'user_id' => $invite->user_id,
                    'project_id' => $invite->project_id,
                    'position' => $invite->vacancy?->name,
                    'is_creator' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $invite->delete();
            });
            Cache::tags(['projects', 'user_projects'])->flush();
            Cache::tags(['projects'])->forget("project:{$invite->project_id}");
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось принять приглашение: {$e->getMessage()}", 0, $e);
        }
    }

    public function rejectInvite(ProjectInvite $invite): void
    {
        try {
            DB::transaction(function () use ($invite) {
                $invite->delete();
            });

            Cache::tags(['projects'])->forget("project:{$invite->project_id}");
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось отклонить приглашение: {$e->getMessage()}", 0, $e);
        }
    }

    public function findWithRelations(int $inviteId): ProjectInvite
    {
        try {
            return ProjectInvite::with(['user', 'project', 'vacancy'])->findOrFail($inviteId);
        } catch (Throwable $e) {
            throw new ModelNotFoundException("Не удалось получить приглашение: {$e->getMessage()}", 0, $e);
        }
    }

    public function find(int $inviteId): ProjectInvite
    {
        try {
            return ProjectInvite::findOrFail($inviteId);
        } catch (Throwable $e) {
            throw new ModelNotFoundException("Не удалось получить приглашение: {$e->getMessage()}", 0, $e);
        }
    }
}
