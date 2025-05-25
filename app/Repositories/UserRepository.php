<?php

namespace App\Repositories;

use App\Models\Role;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Throwable;

class UserRepository
{
    public function getFilteredUsers(array $filters): LengthAwarePaginator
    {
        $cacheKey = 'users:filtered:' . md5(json_encode($filters)) . ':page_' . request()->query('page', 1);
        try {
            return Cache::tags(['users'])->remember($cacheKey, 300, function () use ($filters) {
                return User::query()
                    ->with('roles')
                    ->when(
                        !empty($filters['search']),
                        fn($q) => $q->where(function ($query) use ($filters) {
                            $query->where('first_name', 'LIKE', '%' . $filters['search'] . '%')
                                ->orWhere('second_name', 'LIKE', '%' . $filters['search'] . '%')
                                ->orWhere('last_name', 'LIKE', '%' . $filters['search'] . '%')
                                ->orWhere('email', 'LIKE', '%' . $filters['search'] . '%');
                        })
                    )
                    ->paginate(20)
                    ->withQueryString();
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить пользователей: {$e->getMessage()}", 0, $e);
        }
    }

    public function getUserById(string $id): User
    {
        $cacheKey = "user:{$id}";
        try {
            return Cache::tags(['users'])->remember($cacheKey, 3600, function () use ($id) {
                return User::with('roles')->findOrFail($id);
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить пользователя [$id]: {$e->getMessage()}", 0, $e);
        }
    }

    public function updateUser(string $id, array $data): User
    {
        try {
            return DB::transaction(function () use ($id, $data) {
                $user = User::findOrFail($id);
                $user->update([
                    'first_name' => $data['firstName'] ?? $user->first_name,
                    'second_name' => $data['secondName'] ?? $user->second_name,
                    'last_name' => $data['lastName'] ?? $user->last_name,
                    'email' => $data['email'] ?? $user->email,
                    'group' => $data['group'] ?? $user->group,
                ]);

                Cache::tags(['users'])->flush();
                Cache::tags(['users'])->forget("user:{$id}");
                return $user->load('roles');
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось обновить пользователя [$id]: {$e->getMessage()}", 0, $e);
        }
    }

    public function deleteUser(string $id): void
    {
        try {
            DB::transaction(function () use ($id) {
                $user = User::findOrFail($id);

                $user->projects()->detach();
                $user->invites()->delete();
                $user->taskRequests()->where('with_project', 1)->delete();
                $user->mentoredProjects()->update(['mentor_id' => null]);
                $user->roles()->detach();
                $user->delete();
            });
            Cache::tags(['users', 'projects', 'user_projects'])->flush();
            Cache::tags(['users'])->forget("user:{$id}");
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось удалить пользователя [$id]: {$e->getMessage()}", 0, $e);
        }
    }

    public function updateUserRoles(string $id, array $roleIds): void
    {
        try {
            DB::transaction(function () use ($id, $roleIds) {
                $user = User::findOrFail($id);
                $user->roles()->sync($roleIds);
            });
            Cache::tags(['users', 'roles'])->flush();
            Cache::tags(['users'])->forget("user:{$id}");
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось обновить роли пользователя [$id]: {$e->getMessage()}", 0, $e);
        }
    }

    public function getAvailableRoles(): array
    {
        return Cache::tags(['roles'])->remember('available_roles', 3600, function () {
            return Role::all()->pluck('name', 'id')->toArray();
        });
    }

    public function getPrivilegedUsers(): Collection
    {
        $cacheKey = 'users:privileged';
        try {
            return Cache::tags(['users'])->remember($cacheKey, 3600, function () {
                return User::query()
                    ->with('roles')
                    ->whereHas('roles', function ($query) {
                        $query->whereIn('name', ['mentor', 'admin']);
                    })
                    ->get();
            });
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить привилегированных пользователей: {$e->getMessage()}", 0, $e);
        }
    }
}
