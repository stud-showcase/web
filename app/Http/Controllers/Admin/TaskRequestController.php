<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApproveTaskRequestRequest;
use App\Http\Requests\UpdateTaskRequestMentorRequest;
use App\Services\TaskService;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TaskRequestController extends Controller
{
    public function __construct(
        private TaskService $taskService,
        private UserService $userService,
    ) {}

    public function index(Request $request): Response
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
            'availableFilters' => $this->taskService->getAvailableFilters(['customers']),
        ]);
    }

    public function show(int $id): Response
    {
        $taskRequest = $this->taskService->getTaskRequestById($id);
        $users = $this->userService->getPrivilegedUsers();
        return Inertia::render('admin/Application', [
            'taskRequest' => $taskRequest,
            'users' => $users,
            ...$this->taskService->getAvailableFilters(['tags']),
        ]);
    }

    public function responsible(Request $request): Response
    {
        $filters = $request->only(['search']);
        $taskRequests = $this->taskService->getResponsibleUserTaskRequests($filters);
        return Inertia::render('admin/Applications', [
            'taskRequests' => $taskRequests,
            'filters' => $filters,
            'availableFilters' => [
                'customers' => $this->taskService->getAvailableFilters(['taskRequestCustomers'], (int)Auth::id()),
            ],
        ]);
    }

    public function destroy(Request $request, int $id): RedirectResponse
    {
        $this->taskService->deleteTaskRequest($id);
        return redirect()->route('admin.applications.index')->with('success', 'Заявка успешно удалена');
    }

    public function approve(ApproveTaskRequestRequest $request, int $id): RedirectResponse
    {
        $data = $request->validated();
        $this->taskService->approveTaskRequest($id, $data, $request->file('files', []));
        return redirect()->route('admin.applications.index')->with('success', 'Заявка успешно одобрена');
    }

    public function updateResponsible(UpdateTaskRequestMentorRequest $request, int $id): RedirectResponse
    {
        $data = $request->validated();
        $this->taskService->updateTaskRequestResponsibleUser($id, $data['responsibleUserId']);
        return redirect()->route('admin.applications.index')->with('success', 'Ответственный успешно обновлен');
    }
}
