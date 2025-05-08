<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserRepository
{
    public function getFilteredUsers(array $filters): LengthAwarePaginator
    {
        return User::query()
            ->with(['roles', 'group' => fn($q) => $q->select('id', 'name')])
            ->when(
                isset($filters['search']) && !empty($filters['search']),
                fn($q) => $q->where(function ($query) use ($filters) {
                    $query->where('first_name', 'LIKE', '%' . $filters['search'] . '%')
                        ->orWhere('second_name', 'LIKE', '%' . $filters['search'] . '%')
                        ->orWhere('last_name', 'LIKE', '%' . $filters['search'] . '%')
                        ->orWhere('email', 'LIKE', '%' . $filters['search'] . '%');
                })
            )
            ->paginate(10)
            ->withQueryString();
    }
}
