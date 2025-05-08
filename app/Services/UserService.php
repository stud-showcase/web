<?php

namespace App\Services;

use App\Dto\UserDto;
use App\Repositories\UserRepository;

class UserService
{
    public function __construct(
        private UserRepository $userRepository
    ) {}

    public function getAdminUsers(array $filters = []): array
    {
        $paginator = $this->userRepository->getFilteredUsers($filters);
        $paginator->setCollection(
            $paginator->getCollection()->map(fn($user) => UserDto::fromModel($user)->toArray())
        );

        return [
            'data' => $paginator->items(),
            'currentPage' => $paginator->currentPage(),
            'lastPage' => $paginator->lastPage(),
            'perPage' => $paginator->perPage(),
            'total' => $paginator->total(),
            'links' => $paginator->links()->elements[0] ?? [],
        ];
    }
}
