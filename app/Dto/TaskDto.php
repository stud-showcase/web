<?php

namespace App\Dto;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class TaskDto
{
    public function __construct(
        public int $id,
        public string $title,
        public ?string $description,
        public string $customer,
        public int $maxMembers,
        public string $createdAt,
        public string $deadline,
        public array $tags,
        public array $complexity,
        public ?string $customerEmail,
        public ?string $customerPhone,
        public ?array $files,
        public ?array $projects,
        public bool $canTake
    ) {}

    public static function fromModel(Task $task): self
    {
        return new self(
            id: $task->id,
            title: $task->title,
            description: $task->description,
            customer: $task->customer,
            maxMembers: $task->max_members,
            deadline: Carbon::parse($task->deadline)->format('Y-m-d'),
            createdAt: $task->created_at->format('Y-m-d'),
            tags: $task->tags->map(fn($tag) => [
                'id' => $tag->id,
                'name' => $tag->name,
            ])->toArray(),
            complexity: [
                'id' => $task->complexity->id,
                'name' => $task->complexity->name,
            ],
            customerEmail: $task->customer_email,
            customerPhone: $task->customer_phone,
            files: isset($task->files)
                ? $task->files->map(fn($file) => FileDto::fromModel($file)->toArray())->toArray()
                : null,
            projects: isset($task->projects)
                ? $task->projects->map(fn($project) => [
                    'id' => $project->id,
                    'name' => $project->name,
                    'annotation' => $project->annotation,
                    'status' => [
                        'id' => $project->status->id,
                        'name' => $project->status->name,
                    ],
                    'isHiring' => $project->users->count() < $task->max_members && !$project->is_close,
                ])->toArray()
                : null,
            canTake: $task->canTake(Auth::user())
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
            'maxMembers' => $this->maxMembers,
            'deadline' => $this->deadline,
            'createdAt' => $this->createdAt,
            'tags' => $this->tags,
            'complexity' => $this->complexity,
            'canTake' => $this->canTake,
        ];
    }

    public function toFullArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'customer' => $this->customer,
            'customerEmail' => $this->customerEmail,
            'customerPhone' => $this->customerPhone,
            'maxMembers' => $this->maxMembers,
            'deadline' => $this->deadline,
            'createdAt' => $this->createdAt,
            'tags' => $this->tags,
            'complexity' => $this->complexity,
            'files' => $this->files,
            'projects' => $this->projects,
            'canTake' => $this->canTake,
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
            'maxMembers' => $this->maxMembers,
            'deadline' => $this->deadline,
            'complexity' => $this->complexity,
        ];
    }
}
