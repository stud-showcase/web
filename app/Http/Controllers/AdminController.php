<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApproveTaskRequestRequest;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\DeleteTaskFileRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\UpdateTaskRequestMentorRequest;
use App\Http\Requests\UploadTaskFileRequest;
use App\Models\Complexity;
use App\Models\Tag;
use App\Models\Task;
use App\Models\TaskRequest;
use App\Services\ProjectService;
use App\Services\UserService;
use App\Services\TaskService;
use App\Services\VacancyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class AdminController extends Controller
{
    public function __construct(
        private ProjectService $projectService,
        private UserService $userService,
        private TaskService $taskService,
        private VacancyService $vacancyService
    ) {}

    public function projects(Request $request): \Inertia\Response
    {
        $filters = $request->only([
            'search',
            'status',
            'isHiring',
            'perPage',
        ]);
        $projects = $this->projectService->getAdminProjects($filters);
        return Inertia::render('admin/Projects', [
            'projects' => $projects,
            'filters' => $filters,
        ]);
    }

    public function users(Request $request): \Inertia\Response
    {
        $filters = $request->only(['search']);
        $users = $this->userService->getAdminUsers($filters);
        return Inertia::render('admin/Users', [
            'users' => $users,
            'filters' => $filters,
        ]);
    }

    public function tasks(Request $request): \Inertia\Response
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
            'availableFilters' => [
                'customers' => Task::select('customer')->distinct()->pluck('customer')->toArray(),
            ]
        ]);
    }

    public function showTask(int $id): \Inertia\Response
    {
        $task = $this->taskService->getTaskForAdmin($id);
        return Inertia::render('admin/Task', [
            'task' => $task,
        ]);
    }

    public function indexTaskCreate(): \Inertia\Response
    {
        return Inertia::render('admin/TaskCreate', [
            'tags' => Tag::all()->toArray(),
        ]);
    }

    public function createTask(CreateTaskRequest $request): RedirectResponse
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

    public function updateTask(UpdateTaskRequest $request, int $id): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->taskService->updateTask($id, $data);
            return redirect()->route('admin.tasks.index')->with('success', 'Задача успешно обновлена');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления задачи [$id]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Не удалось обновить задачу']);
        }
    }

    public function uploadTaskFiles(UploadTaskFileRequest $request, int $id): RedirectResponse
    {
        try {
            $this->taskService->uploadFiles($id, $request->file('files'));
            return redirect()->route('admin.tasks.show', $id)->with('success', 'Файлы успешно загружены.');
        } catch (Throwable $e) {
            Log::error("Ошибка загрузки файлов для задачи [$id]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Не удалось загрузить файлы.']);
        }
    }

    public function deleteTask(int $id): RedirectResponse
    {
        try {
            $this->taskService->deleteTask($id);
            return redirect()->route('admin.tasks.index')->with('success', 'Задача успешно удалена');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления задачи [$id]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Не удалось удалить задачу']);
        }
    }

    public function deleteTaskFile(DeleteTaskFileRequest $request, int $taskId, int $fileId): RedirectResponse
    {
        try {
            $this->taskService->deleteFile($taskId, $fileId);
            return redirect()->route('admin.tasks.show', $taskId)->with('success', 'Файл удалён');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления файла [$fileId] для задачи [$taskId]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Не удалось удалить файл']);
        }
    }

    public function taskRequests(Request $request): \Inertia\Response
    {
        $filters = $request->only([
            'search',
            'withProject',
            'customers',
            'perPage',
        ]);
        $taskRequests = $this->taskService->getFilteredTaskRequests($filters);
        return Inertia::render('admin/Applications', [
            'taskRequests' => $taskRequests,
            'filters' => $filters,
            'availableFilters' => [
                'customers' => TaskRequest::select('customer')->distinct()->pluck('customer')->toArray(),
            ]
        ]);
    }

    public function showTaskRequest(int $id): \Inertia\Response
    {
        $taskRequest = $this->taskService->getTaskRequestById($id);
        return Inertia::render('admin/Application', [
            'taskRequest' => $taskRequest,
        ]);
    }

    public function getResponsibleUserTaskRequests(Request $request): \Inertia\Response
    {
        $filters = $request->only(['search']);
        $taskRequests = $this->taskService->getResponsibleUserTaskRequests($filters);
        return Inertia::render('admin/Applications', [
            'taskRequests' => $taskRequests,
            'filters' => $filters,
            'availableFilters' => [
                'customers' => TaskRequest::query()
                    ->where('responsible_user_id', Auth::id())
                    ->select('customer')
                    ->distinct()
                    ->pluck('customer')
                    ->toArray(),
            ]
        ]);
    }

    public function vacancies(Request $request): \Inertia\Response
    {
        $filters = $request->only(['search']);
        $vacancies = $this->vacancyService->getAdminVacancies($filters);
        return Inertia::render('admin/Vacancies', [
            'vacancies' => $vacancies,
            'filters' => $filters,
        ]);
    }

    public function deleteTaskRequest(Request $request, int $id): RedirectResponse
    {
        $this->taskService->deleteTaskRequest($id);
        return redirect()->route('admin.applications.index')->with('success', 'Заявка успешно удалена');
    }

    public function approveTaskRequest(ApproveTaskRequestRequest $request, int $id): RedirectResponse
    {
        $data = $request->validated();
        $this->taskService->approveTaskRequest($id, $data, $request->file('files', []));
        return redirect()->route('admin.applications.index')->with('success', 'Заявка успешно одобрена');
    }

    public function updateTaskRequestResponsibleUser(UpdateTaskRequestMentorRequest $request, int $id): RedirectResponse
    {
        $data = $request->validated();
        $this->taskService->updateTaskRequestResponsibleUser($id, $data['responsibleUserId']);
        return redirect()->route('admin.applications.index')->with('success', 'Ответственный успешно обновлен');
    }
}
