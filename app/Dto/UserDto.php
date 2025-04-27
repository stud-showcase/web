<?php

namespace App\Dto;

use App\Models\User;

class UserDto
{
    public function __construct(
        public string $id,
        public string $firstName,
        public string $secondName,
        public ?string $lastName,
        public string $email,
        public array $roles,
    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            firstName: $user->first_name,
            secondName: $user->second_name,
            lastName: $user->last_name,
            email: $user->email,
            roles: $user->roles->pluck('name')->toArray()
        );
    }

    public function toArray(): array
    {
        return get_object_vars($this);
    }
}
