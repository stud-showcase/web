<?php

namespace App\Dto;

class ProjectDto
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $annotation,
        public array $members,
        public ?array $mentor,
        public array $files,
        public array $status,
        public bool $isHiring,
        public TaskDto $task,
        public ?array $vacancies
    ) {}

    public static function fromModel($project): self
    {
        return new self(
            id: $project->id,
            name: $project->name,
            annotation: $project->annotation,
            members: $project->users->map(function ($user) {
                return array_merge(
                    UserDto::fromModel($user)->toArray(),
                    [
                        'position' => $user->pivot->position,
                        'isCreator' => (bool) $user->pivot->is_creator,
                    ]
                );
            })->toArray(),
            mentor: $project->mentor ? UserDto::fromModel($project->mentor)->toArray() : null,
            files: $project->files->map(fn($file) => FileDto::fromModel($file)->toArray())->toArray(),
            status: [
                'id' => $project->status->id,
                'name' => $project->status->name,
            ],
            isHiring: $project->members_count < $project->task->max_members,
            task: TaskDto::fromModel($project->task),
            vacancies: isset($project->vacancies)
                ? $project->vacancies->map(fn($vacancy) => VacancyDto::fromModel($vacancy)->toArray())->toArray()
                : null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'annotation' => $this->annotation,
            'members' => $this->members,
            'mentor' => $this->mentor,
            'files' => $this->files,
            'status' => $this->status,
            'isHiring' => $this->isHiring,
            'task' => $this->task->toArray(),
            'vacancies' => $this->vacancies,
        ];
    }
}
