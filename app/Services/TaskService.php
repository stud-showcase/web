<?php

namespace App\Services;

use App\Repositories\TaskRepository;
use App\Dto\TaskDto;

class TaskService
{
    public function __construct(
        private TaskRepository $taskRepository
    ) {}

    public function getFilteredTasks(array $filters): array
    {
        $paginator = $this->taskRepository->getFilteredTasks($filters);

        $paginator->setCollection(
            $paginator->getCollection()->map(fn($task) => TaskDto::fromModel($task)->toArray())
        );

        $tasksData = [
            'data' => $paginator->items(),
            'currentPage' => $paginator->currentPage(),
            'lastPage' => $paginator->lastPage(),
            'perPage' => $paginator->perPage(),
            'total' => $paginator->total(),
            'links' => $paginator->links()->elements[0] ?? []
        ];

        return $tasksData;
    }

    public function getFormattedTaskById(int $id): array
    {
        $task = $this->taskRepository->getByIdWithRelations($id);
        return TaskDto::fromModel($task)->toFullArray();
    }
}
