<?php

namespace App\Interfaces\Repositories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface ProjectRepositoryInterface
{
    public function getProjects(array $filters, bool $forUser = false): LengthAwarePaginator;
    public function getByIdWithRelations(int $id): Project;
    public function getUserProjectTags(string $userId): Collection;
    public function create(int $taskId, string $name, User $user): Project;
    public function update(int $projectId, array $data): Project;
    public function delete(int $id): void;
    public function createFiles(int $projectId, array $files): void;
    public function deleteFile(int $projectId, int $fileId): void;
    public function getAdminProjects(array $filters): LengthAwarePaginator;
    public function setMentor(int $projectId, string $mentorId): void;
    public function removeMentor(int $projectId): void;
}
