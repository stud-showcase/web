<?php

namespace App\Services;

use App\Repositories\TaskRepository;
use App\Dto\TaskDto;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TaskService
{
    public function __construct(
        private TaskRepository $taskRepository
    ) {}

    public function getFilteredTasks(array $filters): LengthAwarePaginator
    {
        return $this->taskRepository->getFilteredTasks($filters)
            ->through(fn($task) => TaskDto::fromModel($task)->toArray());
    }

    public function getFormattedTaskById(int $id): array
    {
        $task = $this->taskRepository->getByIdWithRelations($id);
        return TaskDto::fromModel($task)->toFullArray();
    }
}
