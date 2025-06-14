<?php

namespace App\Interfaces\Repositories\Admin;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface UserRepositoryInterface
{
    public function getFilteredUsers(array $filters): LengthAwarePaginator;
    public function getUserById(string $id): User;
    public function updateUser(string $id, array $data): User;
    public function deleteUser(string $id): void;
    public function updateUserRoles(string $id, array $roleIds): void;
    public function getAvailableRoles(): array;
    public function getPrivilegedUsers(): Collection;
}
