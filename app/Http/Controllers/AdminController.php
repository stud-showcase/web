<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApproveTaskRequestRequest;
use App\Http\Requests\UpdateTaskRequestMentorRequest;
use App\Services\ProjectService;
use App\Services\UserService;
use App\Services\TaskService;
use App\Services\VacancyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        ]);
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
        ]);
    }

    public function showTaskRequest(int|string $id): \Inertia\Response
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
