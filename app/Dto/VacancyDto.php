<?php

namespace App\Dto;

use App\Models\Vacancy;

class VacancyDto
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $description,
        public ?array $project,
        public ?array $task,
    ) {}

    public static function fromModel(Vacancy $vacancy): self
    {
        return new self(
            id: $vacancy->id,
            name: $vacancy->name,
            description: $vacancy->description,
            project: $vacancy->relationLoaded('project') ? [
                'id' => $vacancy->project->id,
                'name' => $vacancy->project->name,
                'isHiring' => $vacancy->project->users->count() < $vacancy->project->task->max_members,
            ] : null,
            task: $vacancy->project->relationLoaded('task') ? [
                'title' => $vacancy->project->task->title ?? null,
                'tags' => $vacancy->project->task->tags->map(fn($tag) => [
                    'id' => $tag->id,
                    'name' => $tag->name,
                ])->toArray(),
            ] : null
        );
    }

    public function toArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'project' => $this->project,
            'task' => $this->task,
        ], fn($value) => $value !== null);
    }
}
