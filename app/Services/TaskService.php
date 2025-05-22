<?php

namespace App\Services;

use App\Dto\TaskDto;
use App\Dto\TaskRequestDto;
use App\Repositories\TaskRepository;
use App\Traits\PaginatesCollections;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class TaskService
{
    use PaginatesCollections;

    public function __construct(
        private TaskRepository $taskRepository
    ) {}

    public function getFilteredTasks(array $filters = []): array
    {
        $paginator = $this->taskRepository->getFilteredTasks($filters);
        return $this->formatPaginatedData($paginator, fn($task) => TaskDto::fromModel($task)->toArray());
    }

    public function getFormattedTaskById(int $id): array
    {
        try {
            $task = $this->taskRepository->getByIdWithRelations($id);
            return TaskDto::fromModel($task)->toFullArray();
        } catch (Throwable $e) {
            Log::error("Ошибка получения задания [$id]: " . $e->getMessage());
            throw new \Exception("Не удалось получить задание: {$e->getMessage()}", 0, $e);
        }
    }

    public function getFilteredTaskRequests(array $filters = []): array
    {
        $paginator = $this->taskRepository->getFilteredTaskRequests($filters);
        return $this->formatPaginatedData($paginator, fn($taskRequest) => TaskRequestDto::fromModel($taskRequest)->toArrayForAdmin());
    }

    public function getResponsibleUserTaskRequests(array $filters = []): array
    {
        $paginator = $this->taskRepository->getFilteredTaskRequests($filters, true);
        return $this->formatPaginatedData($paginator, fn($taskRequest) => TaskRequestDto::fromModel($taskRequest)->toArrayForAdmin());
    }

    public function getTaskRequestById(int|string $id): array
    {
        try {
            $taskRequest = $this->taskRepository->getTaskRequestById($id);
            return TaskRequestDto::fromModel($taskRequest)->toArray();
        } catch (Throwable $e) {
            Log::error("Ошибка получения заявки [$id]: " . $e->getMessage());
            throw new \Exception("Не удалось получить заявку: {$e->getMessage()}", 0, $e);
        }
    }

    public function getAdminTasks(array $filters = []): array
    {
        $paginator = $this->taskRepository->getAdminTasks($filters);
        return $this->formatPaginatedData($paginator, fn($task) => TaskDto::fromModel($task)->toArrayForAdmin());
    }

    public function createRequest(array $data, array $files): int
    {
        try {
            return DB::transaction(function () use ($data, $files) {
                $taskRequestId = $this->taskRepository->createRequest($data);
                if (!empty($files)) {
                    $this->taskRepository->uploadFiles($taskRequestId, $files);
                }
                return $taskRequestId;
            });
        } catch (\Throwable $e) {
            Log::error("Ошибка создания заявки: " . $e->getMessage(), [
                'data' => $data,
                'files_count' => count($files),
            ]);
            throw new \Exception("Не удалось создать заявку: {$e->getMessage()}", 0, $e);
        }
    }

    public function deleteTaskRequest(int $id): void
    {
        try {
            $this->taskRepository->deleteTaskRequest($id);
        } catch (Throwable $e) {
            Log::error("Ошибка удаления заявки [$id]: " . $e->getMessage());
            throw new \Exception("Не удалось удалить заявку: {$e->getMessage()}", 0, $e);
        }
    }

    public function approveTaskRequest(int $id, array $data, array $files = []): int
    {
        try {
            return $this->taskRepository->approveTaskRequest($id, $data, $files);
        } catch (Throwable $e) {
            Log::error("Ошибка одобрения заявки [$id]: " . $e->getMessage(), [
                'data' => $data,
                'files_count' => count($files),
            ]);
            throw new \Exception("Не удалось одобрить заявку: {$e->getMessage()}", 0, $e);
        }
    }

    public function updateTaskRequestResponsibleUser(int $id, int $mentorId): void
    {
        try {
            $this->taskRepository->updateTaskRequestResponsibleUser($id, $mentorId);
        } catch (Throwable $e) {
            Log::error("Ошибка обновления ответственного для заявки [$id]: " . $e->getMessage());
            throw new \Exception("Не удалось обновить ответственного: {$e->getMessage()}", 0, $e);
        }
    }

    public function createTask(array $data, array $files = []): int
    {
        try {
            return $this->taskRepository->createTask($data, $files);
        } catch (Throwable $e) {
            Log::error("Ошибка создания задачи: " . $e->getMessage(), [
                'data' => $data,
                'files_count' => count($files),
            ]);
            throw new \Exception("Не удалось создать задачу: {$e->getMessage()}", 0, $e);
        }
    }
}
