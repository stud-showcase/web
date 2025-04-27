<?php

namespace App\Services;

use App\Repositories\TaskRepository;
use App\Dto\TaskDto;
use Illuminate\Support\Collection;

class TaskService
{
    public function __construct(
        private TaskRepository $taskRepository
    ) {}

    public function getFormattedTasks(): Collection
    {
        return $this->taskRepository->getAllWithRelations()
            ->map(fn($task) => TaskDto::fromModel($task)->toArray());
    }

    public function getFormattedTaskById(int $id): array
    {
        $task = $this->taskRepository->getByIdWithRelations($id);
        return TaskDto::fromModel($task)->toFullArray();
    }
}
