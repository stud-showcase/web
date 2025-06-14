<?php

namespace App\Interfaces\Services;

use App\Models\Project;
use App\Models\User;

interface ProjectServiceInterface
{
    public function getAvailableFilters(array $requestedFilters, bool $forUser = false): array;
    public function getProjects(array $filters = []): array;
    public function getUserProjects(array $filters = []): array;
    public function getProjectById(int $id): array;
    public function createInvite(string $userId, int $projectId, ?int $vacancyId): void;
    public function acceptInvite(int $inviteId): void;
    public function rejectInvite(int $inviteId): void;
    public function createProject(int $taskId, string $name, User $user): Project;
    public function updateProject(int $projectId, array $data): Project;
    public function deleteProject(int $projectId): void;
    public function setMentor(int $projectId, string $mentorId): void;
    public function removeMentor(int $projectId): void;
    public function uploadFiles(int $projectId, array $files): void;
    public function deleteFile(int $projectId, int $fileId): void;
    public function getAdminProjects(array $filters = []): array;
    public function updateMember(int $projectId, string $memberId, array $data): void;
    public function deleteMember(int $projectId, string $memberId): void;
    public function getSettings(): array;
    public function updateSettings(array $data): void;
}
