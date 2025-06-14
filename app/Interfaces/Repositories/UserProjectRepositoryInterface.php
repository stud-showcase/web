<?php

namespace App\Interfaces\Repositories;

use App\Models\UserProject;

interface UserProjectRepositoryInterface
{
    public function findByProjectAndUser(int $projectId, string $userId): UserProject;
    public function update(int $projectId, string $userId, array $data): void;
    public function delete(int $projectId, string $userId): void;
}
