<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateTaskRequest as AdminCreateTaskRequest;
use App\Http\Requests\Admin\DeleteTaskFileRequest as AdminDeleteTaskFileRequest;
use App\Http\Requests\Admin\UpdateTaskRequest as AdminUpdateTaskRequest;
use App\Http\Requests\Admin\UploadTaskFileRequest as AdminUploadTaskFileRequest;
use App\Services\TaskService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $taskService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only([
            'search',
            'perPage',
            'complexity',
            'customers',
        ]);
        $tasks = $this->taskService->getAdminTasks($filters);
        return Inertia::render('admin/TaskBank', [
            'tasks' => $tasks,
            'filters' => $filters,
            'availableFilters' => $this->taskService->getAvailableFilters(['customers']),
        ]);
    }

    public function show(int $id): Response
    {
        $task = $this->taskService->getTaskForAdmin($id);
        return Inertia::render('admin/Task', [
            'task' => $task,
            ...$this->taskService->getAvailableFilters(['tags']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/TaskCreate', [
            ...$this->taskService->getAvailableFilters(['tags']),
        ]);
    }

    public function store(AdminCreateTaskRequest $request): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->taskService->createTask($data, $request->file('files', []));
            return redirect()->route('admin.tasks.index')->with('success', 'Задача успешно создана');
        } catch (Throwable $e) {
            Log::error("Ошибка создания задачи: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Не удалось создать задачу']);
        }
    }

    public function update(AdminUpdateTaskRequest $request, int $id): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->taskService->updateTask($id, $data);
            return redirect()->route('admin.tasks.show', $id)->with('success', 'Задача успешно обновлена');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления задачи [$id]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Не удалось обновить задачу']);
        }
    }

    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->taskService->deleteTask($id);
            return redirect()->route('admin.tasks.index')->with('success', 'Задача успешно удалена');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления задачи [$id]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Не удалось удалить задачу']);
        }
    }

    public function uploadFiles(AdminUploadTaskFileRequest $request, int $id): RedirectResponse
    {
        try {
            $this->taskService->uploadFiles($id, $request->file('files'));
            return redirect()->route('admin.tasks.show', $id)->with('success', 'Файлы успешно загружены.');
        } catch (Throwable $e) {
            Log::error("Ошибка загрузки файлов для задачи [$id]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Не удалось загрузить файлы.']);
        }
    }

    public function deleteFile(AdminDeleteTaskFileRequest $request, int $taskId, int $fileId): RedirectResponse
    {
        try {
            $this->taskService->deleteFile($taskId, $fileId);
            return redirect()->route('admin.tasks.show', $taskId)->with('success', 'Файл удалён');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления файла [$fileId] для задачи [$taskId]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Не удалось удалить файл']);
        }
    }
}
