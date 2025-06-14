<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ApproveTaskRequestRequest as AdminApproveTaskRequestRequest;
use App\Http\Requests\Admin\DeleteTaskRequestRequest as AdminDeleteTaskRequestRequest;
use App\Http\Requests\Admin\UpdateTaskRequestResponsibleUser as AdminUpdateTaskRequestResponsibleUser;
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

    public function destroy(AdminDeleteTaskRequestRequest $request, int $id): RedirectResponse
    {
        try {
            $this->taskService->deleteTaskRequest($id);
            return redirect()->route('admin.applications.index')->with('success', 'Заявка успешно удалена');
        } catch (\Exception $e) {
            return redirect()->route('admin.applications.index')->with('error', "Ошибка удаления заявки [$id]");
        }
    }

    public function approve(AdminApproveTaskRequestRequest $request, int $id): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->taskService->approveTaskRequest($id, $data, $request->file('files') ?? []);
            return redirect()->route('admin.applications.index')->with('success', 'Заявка успешно одобрена');
        } catch (\Exception $e) {
            return redirect()->route('admin.applications.index')->with('error', "Ошибка одобрения заявки [$id]");
        }
    }

    public function updateResponsible(AdminUpdateTaskRequestResponsibleUser $request, int $id): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->taskService->updateTaskRequestResponsibleUser($id, (string) $data['responsibleUserId']);
            return redirect()->route('admin.applications.index')->with('success', 'Ответственный успешно обновлен');
        } catch (\Exception $e) {
            return redirect()->route('admin.applications.index')->with('error', "Ошибка назначения ответственного [$id]");
        }
    }
}
