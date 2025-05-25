<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateApplicationRequest;
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
            'availableFilters' => $this->taskService->getAvailableFilters(['tags', 'customers']),
        ]);
    }

    public function show(int $id): \Inertia\Response
    {
        $task = $this->taskService->getFormattedTaskById($id);
        return Inertia::render('user/Task', [
            'task' => $task,
        ]);
    }

    public function showApplication(): \Inertia\Response
    {
        return Inertia::render('user/Application');
    }

    public function createApplication(CreateApplicationRequest $request): RedirectResponse
    {
        try {
            $this->taskService->createApplication(
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
