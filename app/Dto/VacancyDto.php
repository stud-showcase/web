<?php

namespace App\Dto;

use App\Models\UserProject;
use App\Models\Vacancy;
use Illuminate\Support\Facades\Auth;

class VacancyDto
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $description,
        public ?array $project,
        public ?array $task,
        public bool $canJoin,
    ) {}

    public static function fromModel(Vacancy $vacancy): self
    {
        $userId = Auth::id();
        return new self(
            id: $vacancy->id,
            name: $vacancy->name,
            description: $vacancy->description,
            project: $vacancy->relationLoaded('project') ? [
                'id' => $vacancy->project->id,
                'name' => $vacancy->project->name,
                'isHiring' => $vacancy->project->users->count() < $vacancy->project->task->max_members && !$vacancy->project->is_close,
            ] : null,
            task: $vacancy->project->relationLoaded('task') ? [
                'title' => $vacancy->project->task->title ?? null,
                'tags' => $vacancy->project->task->tags->map(fn($tag) => [
                    'id' => $tag->id,
                    'name' => $tag->name,
                ])->toArray(),
            ] : null,
            canJoin: !$userId || (
                !$vacancy->project->users->contains('id', $userId) &&
                !$vacancy->projectInvites->contains('user_id', $userId)
            )
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'project' => $this->project,
            'task' => $this->task,
            'canJoin' => $this->canJoin,
        ];
    }

    public function toArrayForAdmin(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'project' => $this->project,
            'canJoin' => $this->canJoin,
        ];
    }
}
