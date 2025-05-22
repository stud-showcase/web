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
            throw $e;;
        }
    }
}
