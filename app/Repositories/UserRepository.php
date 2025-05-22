<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Cache;
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
        } catch (Throwable $e) {
            throw new ModelNotFoundException("Не удалось получить пользователей: {$e->getMessage()}", 0, $e);
        }
    }
}
