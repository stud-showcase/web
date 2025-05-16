<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequestCreateRequest;
use App\Models\Tag;
use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $taskService
    ) {}

    public function index(Request $request): \Inertia\Response
    {
        $filters = $request->only([
            'complexity',
            'tags',
            'members',
            'customers',
            'deadline',
            'search',
        ]);

        $tasks = $this->taskService->getFilteredTasks($filters);

        return Inertia::render('user/TaskBank', [
            'tasks' => $tasks,
            'filters' => $filters,
            'availableFilters' => [
                'tags' => Tag::select('id', 'name')->get()->toArray(),
                'customers' => Task::select('customer')->distinct()->pluck('customer')->toArray(),
            ]
        ]);
    }

    public function show(int $id): \Inertia\Response
    {
        $task = $this->taskService->getFormattedTaskById($id);
        return Inertia::render('user/Task', [
            'task' => $task,
        ]);
    }

    public function createRequest(TaskRequestCreateRequest $request): RedirectResponse
    {
        try {
            $this->taskService->createRequest(
                $request->validated(),
                $request->file('files') ?? []
            );
            return redirect()->back()->with('success', 'Заявка успешно отправлена.');
        } catch (Throwable $e) {
            Log::error("Ошибка создания заявки: " . $e->getMessage(), [
                'data' => $request->validated(),
                'files_count' => count($request->file('files') ?? []),
            ]);
            return redirect()->back()->withErrors(['error' => 'Не удалось создать заявку.',]);
        }
    }
}
