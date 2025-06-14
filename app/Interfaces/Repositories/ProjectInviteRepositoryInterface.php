<?php

namespace App\Interfaces\Repositories;

use App\Models\ProjectInvite;

interface ProjectInviteRepositoryInterface
{
    public function create(string $userId, int $projectId, ?int $vacancyId): void;
    public function acceptInvite(ProjectInvite $invite): void;
    public function rejectInvite(ProjectInvite $invite): void;
    public function findWithRelations(int $inviteId): ProjectInvite;
    public function find(int $inviteId): ProjectInvite;
}
