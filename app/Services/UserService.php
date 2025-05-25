<?php

namespace App\Services;

use App\Dto\UserDto;
use App\Repositories\UserRepository;
use App\Traits\PaginatesCollections;
use Illuminate\Support\Facades\Log;
use Throwable;

class UserService
{
    use PaginatesCollections;

    public function __construct(
        private UserRepository $userRepository
    ) {}

    public function getAdminUsers(array $filters = []): array
    {
        try {
            $paginator = $this->userRepository->getFilteredUsers($filters);
            return $this->formatPaginatedData($paginator, fn($user) => UserDto::fromModel($user)->toArray());
        } catch (Throwable $e) {
            Log::error("Ошибка получения пользователей: " . $e->getMessage(), ['filters' => $filters]);
            throw $e;
        }
    }

    public function getUserById(string $id): array
    {
        try {
            $user = $this->userRepository->getUserById($id);
            return UserDto::fromModel($user)->toArray();
        } catch (Throwable $e) {
            Log::error("Ошибка получения пользователя [$id]: " . $e->getMessage());
            throw $e;
        }
    }

    public function updateUser(string $id, array $data): array
    {
        try {
            $user = $this->userRepository->updateUser($id, $data);
            return UserDto::fromModel($user)->toArray();
        } catch (Throwable $e) {
            Log::error("Ошибка обновления пользователя [$id]: " . $e->getMessage(), ['data' => $data]);
            throw $e;
        }
    }

    public function deleteUser(string $id): void
    {
        try {
            $this->userRepository->deleteUser($id);
        } catch (Throwable $e) {
            Log::error("Ошибка удаления пользователя [$id]: " . $e->getMessage());
            throw $e;
        }
    }

    public function updateUserRoles(string $id, array $roleIds): void
    {
        try {
            $this->userRepository->updateUserRoles($id, $roleIds);
        } catch (Throwable $e) {
            Log::error("Ошибка обновления ролей пользователя [$id]: " . $e->getMessage(), ['role_ids' => $roleIds]);
            throw $e;
        }
    }

    public function getAvailableRoles(): array
    {
        try {
            return $this->userRepository->getAvailableRoles();
        } catch (Throwable $e) {
            Log::error("Ошибка получения доступных ролей: " . $e->getMessage());
            throw $e;
        }
    }

    public function getPrivilegedUsers(): array
    {
        try {
            $users = $this->userRepository->getPrivilegedUsers();
            return $users->map(fn($user) => UserDto::fromModel($user)->toArray())->toArray();
        } catch (Throwable $e) {
            Log::error("Ошибка получения привилегированных пользователей: " . $e->getMessage());
            throw $e;
        }
    }
}
