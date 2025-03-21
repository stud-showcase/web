<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(): \Inertia\Response
    {
        $tasks = Task::with(['complexity', 'projects', 'tags'])->paginate(10);
        return Inertia::render('user/TaskBank', [
            'tasks' => $tasks,
        ]);
    }

    public function show(int $id): \Inertia\Response
    {
        $task = Task::with(['complexity', 'projects', 'tags'])->findOrFail($id);
        return Inertia::render('user/Task', [
            'task' => $task,
        ]);
    }
}
