<?php

namespace App\Repositories;

use App\Models\ProjectInvite;

class ProjectInviteRepository
{
    public function create(int $userId, int $projectId, ?int $vacancyId): void
    {
        ProjectInvite::create([
            'user_id' => $userId,
            'project_id' => $projectId,
            'vacancy_id' => $vacancyId,
        ]);
    }

    public function findWithRelations(int $inviteId): ProjectInvite
    {
        return ProjectInvite::with(['user', 'project', 'vacancy'])->findOrFail($inviteId);
    }
}
