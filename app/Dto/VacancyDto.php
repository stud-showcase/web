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
        public ?string $taskTitle
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
            ] : null,
            taskTitle: $vacancy->relationLoaded('project') && $vacancy->project->relationLoaded('task')
                ? $vacancy->project->task->title ?? null
                : null
        );
    }

    public function toArray(): array
    {
        return array_filter([
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'project' => $this->project,
            'taskTitle' => $this->taskTitle,
        ], fn($value) => $value !== null);
    }
}
