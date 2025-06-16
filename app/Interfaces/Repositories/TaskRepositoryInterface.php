<?php

namespace App\Interfaces\Repositories;

use App\Models\Task;
use App\Models\TaskRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface TaskRepositoryInterface
{
    public function getFilteredTasks(array $filters): LengthAwarePaginator;
    public function getByIdWithRelations(int $id): Task;
    public function getTaskForAdmin(int $id): Task;
    public function getTaskRequestById(int $id): TaskRequest;
    public function getFilteredTaskRequests(array $filters, bool $forUser = false): LengthAwarePaginator;
    public function getAdminTasks(array $filters): LengthAwarePaginator;
    public function createApplication(array $data): int;
    public function uploadFiles(int $taskRequestId, array $files): void;
    public function deleteTaskRequest(int $id): void;
    public function approveTaskRequest(int $id, array $data, array $files = []): int;
    public function updateTaskRequestResponsibleUser(int $id, string $responsibleUserId): void;
    public function createTask(array $data, array $files = []): int;
    public function updateTask(int $id, array $data): void;
    public function createFiles(int $taskId, array $files): void;
    public function deleteTask(int $id): void;
    public function deleteFile(int $taskId, int $fileId): void;
    public function getTaskCustomers(): Collection;
    public function getTaskRequestCustomers(?string $responsibleUserId = null): Collection;
}
