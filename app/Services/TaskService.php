<?php

namespace App\Services;

use App\Dto\TaskDto;
use App\Dto\TaskRequestDto;
use App\Repositories\TaskRepository;
use App\Traits\PaginatesCollections;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
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
            throw $e;
        }
    }

    public function getTaskForAdmin(int $id): array
    {
        try {
            $task = $this->taskRepository->getTaskForAdmin($id);
            return TaskDto::fromModel($task)->toFullArray();
        } catch (Throwable $e) {
            Log::error("Ошибка получения задачи для админа [$id]: " . $e->getMessage());
            throw $e;
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
            throw $e;
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
            throw $e;
        }
    }

    public function deleteTaskRequest(int $id): void
    {
        try {
            $this->taskRepository->deleteTaskRequest($id);
        } catch (Throwable $e) {
            Log::error("Ошибка удаления заявки [$id]: " . $e->getMessage());
            throw $e;
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
            throw $e;
        }
    }

    public function updateTaskRequestResponsibleUser(int $id, int $mentorId): void
    {
        try {
            $this->taskRepository->updateTaskRequestResponsibleUser($id, $mentorId);
        } catch (Throwable $e) {
            Log::error("Ошибка обновления ответственного для заявки [$id]: " . $e->getMessage());
            throw $e;
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
            throw $e;
        }
    }

    public function updateTask(int $id, array $data): void
    {
        try {
            $this->taskRepository->updateTask($id, $data);
        } catch (Throwable $e) {
            Log::error("Ошибка обновления задачи [$id]: " . $e->getMessage(), [
                'data' => $data,
            ]);
            throw $e;
        }
    }

    public function uploadFiles(int $taskId, array $files): void
    {
        try {
            $filesData = [];
            foreach ($files as $file) {
                if (!$file instanceof UploadedFile) {
                    throw new \InvalidArgumentException('Недопустимый тип файла');
                }

                $extension = $file->getClientOriginalExtension();
                $uniqueName = Str::uuid() . '.' . $extension;
                $directory = 'task_files/' . $taskId;
                $path = $file->storeAs($directory, $uniqueName, 'public');

                $filesData[] = [
                    'name' => $file->getClientOriginalName(),
                    'path' => str_replace('public/', '', $path),
                ];
            }

            $this->taskRepository->createFiles($taskId, $filesData);
        } catch (Throwable $e) {
            Log::error("Ошибка загрузки файлов для задачи [$taskId]: " . $e->getMessage(), [
                'files_count' => count($files),
            ]);
            throw $e;
        }
    }

    public function deleteTask(int $id): void
    {
        try {
            $this->taskRepository->deleteTask($id);
        } catch (Throwable $e) {
            Log::error("Ошибка удаления задачи [$id]: " . $e->getMessage());
            throw $e;
        }
    }

    public function deleteFile(int $taskId, int $fileId): void
    {
        try {
            $this->taskRepository->deleteFile($taskId, $fileId);
        } catch (Throwable $e) {
            Log::error("Ошибка удаления файла [$fileId] для задачи [$taskId]: " . $e->getMessage());
            throw $e;
        }
    }
}
