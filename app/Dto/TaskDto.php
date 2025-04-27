<?php

namespace App\Dto;

class TaskDto
{
    public function __construct(
        public int $id,
        public string $title,
        public ?string $description,
        public string $customer,
        public string $customerEmail,
        public ?string $customerPhone,
        public int $maxMembers,
        public string $deadline,
        public array $complexity,
        public array $tags
    ) {}

    public static function fromModel($task): self
    {
        return new self(
            id: $task->id,
            title: $task->title,
            description: $task->description,
            customer: $task->customer,
            customerEmail: $task->customer_email,
            customerPhone: $task->customer_phone,
            maxMembers: $task->max_members,
            deadline: $task->deadline,
            complexity: [
                'id' => $task->complexity->id,
                'name' => $task->complexity->name,
            ],
            tags: $task->tags->map(fn($tag) => [
                'id' => $tag->id,
                'name' => $tag->name,
            ])->toArray(),
        );
    }

    public function toArray(): array
    {
        return get_object_vars($this);
    }
}
