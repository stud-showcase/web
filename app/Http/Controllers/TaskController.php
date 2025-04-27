<?php

namespace App\Http\Controllers;

use App\Services\TaskService;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $taskService
    ) {}

    public function index(): \Inertia\Response
    {
        $tasks = $this->taskService->getFormattedTasks();
        return Inertia::render('user/TaskBank', [
            'tasks' => $tasks,
        ]);
    }

    public function show(int $id): \Inertia\Response
    {
        $task = $this->taskService->getFormattedTaskById($id);
        return Inertia::render('user/Task', [
            'task' => $task,
        ]);
    }
}
