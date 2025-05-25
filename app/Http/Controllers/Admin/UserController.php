<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DeleteUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UpdateUserRolesRequest;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class UserController extends Controller
{
    public function __construct(
        private UserService $userService
    ) {}

    public function index(Request $request): Response
    {
        try {
            $filters = $request->only(['search', 'roles']);
            $users = $this->userService->getAdminUsers($filters);
            $roles = $this->userService->getAvailableRoles();

            return Inertia::render('admin/Users', [
                'users' => $users,
                'filters' => $filters,
                'roles' => $roles,
            ]);
        } catch (Throwable $e) {
            Log::error("Ошибка загрузки списка пользователей: " . $e->getMessage(), ['filters' => $filters]);
            return Inertia::render('admin/Users', ['error' => 'Не удалось загрузить пользователей']);
        }
    }

    public function show(string $id): Response
    {
        try {
            $user = $this->userService->getUserById($id);
            $roles = $this->userService->getAvailableRoles();

            return Inertia::render('admin/User', [
                'user' => $user,
                'roles' => $roles,
            ]);
        } catch (Throwable $e) {
            Log::error("Ошибка загрузки пользователя [$id]: " . $e->getMessage());
            return Inertia::render('admin/User', ['error' => 'Не удалось загрузить пользователя']);
        }
    }

    public function update(UpdateUserRequest $request, string $id): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->userService->updateUser($id, $data);
            return redirect()->route('admin.users.show', $id)->with('success', 'Данные пользователя обновлены');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления данных пользователя [$id]: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy(DeleteUserRequest $request, string $id): RedirectResponse
    {
        try {
            $this->userService->deleteUser($id);
            return redirect()->route('admin.users.index')->with('success', 'Пользователь успешно удалён');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления пользователя [$id]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function updateRoles(UpdateUserRolesRequest $request, string $id): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->userService->updateUserRoles($id, $data['roles']);
            return redirect()->route('admin.users.show', $id)->with('success', 'Роли пользователя обновлены');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления ролей пользователя [$id]: " . $e->getMessage(), ['roles' => $request->input('roles')]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
