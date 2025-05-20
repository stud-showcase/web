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

    public function getMentorTaskRequests(array $filters = []): array
    {
        $paginator = $this->taskRepository->getFilteredTaskRequests($filters, true);
        return $this->formatPaginatedData($paginator, fn($taskRequest) => TaskRequestDto::fromModel($taskRequest)->toArrayForAdmin());
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
}
