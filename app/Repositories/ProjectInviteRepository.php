<?php

namespace App\Repositories;

use App\Models\ProjectInvite;
use Illuminate\Support\Facades\DB;

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

    public function acceptInvite(ProjectInvite $invite): void
    {
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
    }

    public function findWithRelations(int $inviteId): ProjectInvite
    {
        return ProjectInvite::with(['user', 'project', 'vacancy'])->findOrFail($inviteId);
    }
}
