<?php

namespace App\Interfaces\Services\Admin;

interface UserServiceInterface
{
    public function getAdminUsers(array $filters = []): array;
    public function getUserById(string $id): array;
    public function updateUser(string $id, array $data): array;
    public function deleteUser(string $id): void;
    public function getAvailableRoles(): array;
    public function getPrivilegedUsers(): array;
}
