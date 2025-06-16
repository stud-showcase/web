<?php

namespace App\Interfaces\Services;

interface TaskServiceInterface
{
    public function getAvailableFilters(array $requestedFilters, ?string $responsibleUserId = null): array;
    public function getFilteredTasks(array $filters = []): array;
    public function getFormattedTaskById(int $id): array;
    public function getTaskForAdmin(int $id): array;
    public function getFilteredTaskRequests(array $filters = []): array;
    public function getResponsibleUserTaskRequests(array $filters = []): array;
    public function getTaskRequestById(int $id): array;
    public function getAdminTasks(array $filters = []): array;
    public function createApplication(array $data, array $files): int;
    public function deleteTaskRequest(int $id): void;
    public function approveTaskRequest(int $id, array $data, array $files = []): int;
    public function updateTaskRequestResponsibleUser(int $id, string $mentorId): void;
    public function createTask(array $data, array $files = []): int;
    public function updateTask(int $id, array $data): void;
    public function uploadFiles(int $taskId, array $files): void;
    public function deleteTask(int $id): void;
    public function deleteFile(int $taskId, int $fileId): void;
    public function createTag(string $name): void;
    public function updateTag(int $id, string $name): void;
    public function deleteTag(int $id): void;
}
