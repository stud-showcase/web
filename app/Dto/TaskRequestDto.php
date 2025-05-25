<?php

namespace App\Dto;

use App\Models\TaskRequest;

class TaskRequestDto
{
    public function __construct(
        public int $id,
        public string $title,
        public string $description,
        public string $customer,
        public ?string $customerEmail,
        public ?string $customerPhone,
        public bool $withProject,
        public ?string $projectName,
        public ?array $user,
        public ?array $responsibleUser,
        public array $files
    ) {}

    public static function fromModel(TaskRequest $taskRequest): self
    {
        return new self(
            id: $taskRequest->id,
            title: $taskRequest->title,
            description: $taskRequest->description,
            customer: $taskRequest->customer->name,
            customerEmail: $taskRequest->customer->email,
            customerPhone: $taskRequest->customer->phone,
            withProject: $taskRequest->with_project,
            projectName: $taskRequest->project_name,
            user: $taskRequest->user ? UserDto::fromModel($taskRequest->user)->toArray() : null,
            responsibleUser: $taskRequest->responsibleUser ? UserDto::fromModel($taskRequest->responsibleUser)->toArray() : null,
            files: $taskRequest->files->map(fn($file) => FileDto::fromModel($file)->toArray())->toArray()
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'customer' => $this->customer,
            'customerEmail' => $this->customerEmail,
            'customerPhone' => $this->customerPhone,
            'withProject' => $this->withProject,
            'projectName' => $this->projectName,
            'user' => $this->user,
            'responsibleUser' => $this->responsibleUser,
            'files' => $this->files,
        ];
    }

    public function toArrayForAdmin(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'customer' => $this->customer,
            'customerEmail' => $this->customerEmail,
            'customerPhone' => $this->customerPhone,
            'withProject' => $this->withProject,
            'projectName' => $this->projectName,
            'user' => $this->user,
            'responsibleUser' => $this->responsibleUser,
        ];
    }
}
