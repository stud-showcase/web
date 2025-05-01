<?php

namespace App\Http\Controllers;

use App\Services\TaskService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $taskService
    ) {}

    public function index(Request $request)
    {
        $filters = $request->only([
            'complexity',
            'tags',
            'minMembers',
            'maxMembers',
            'customers',
        ]);

        $tasks = $this->taskService->getFilteredTasks($filters);

        return Inertia::render('user/TaskBank', [
            'tasks' => $tasks,
            'filters' => $filters,
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
