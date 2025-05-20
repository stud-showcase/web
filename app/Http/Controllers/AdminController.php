<?php

namespace App\Http\Controllers;

use App\Services\ProjectService;
use App\Services\UserService;
use App\Services\TaskService;
use App\Services\VacancyService;
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
        $filters = $request->only(['search']);
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
        $filters = $request->only(['search']);
        $tasks = $this->taskService->getAdminTasks($filters);
        return Inertia::render('admin/TaskBank', [
            'tasks' => $tasks,
            'filters' => $filters,
        ]);
    }

    public function taskRequests(Request $request): \Inertia\Response
    {
        $filters = $request->only(['search']);
        $taskRequests = $this->taskService->getFilteredTaskRequests($filters);
        return Inertia::render('admin/Applications', [
            'taskRequests' => $taskRequests,
            'filters' => $filters,
        ]);
    }

    public function getMentorTaskRequests(Request $request): \Inertia\Response
    {
        $filters = $request->only(['search']);
        $taskRequests = $this->taskService->getMentorTaskRequests($filters);
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
}
