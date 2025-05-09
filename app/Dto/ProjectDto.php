<?php

namespace App\Dto;

use App\Models\Project;
use App\Models\UserProject;
use Illuminate\Support\Facades\Auth;

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
        public ?array $vacancies,
        public ?array $invites,
        public bool $canJoin,
    ) {}

    public static function fromModel(Project $project): self
    {
        $userId = Auth::id();
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
            isHiring: $project->users->count() < $project->task->max_members && !$project->is_close,
            task: TaskDto::fromModel($project->task),
            vacancies: isset($project->vacancies)
                ? $project->vacancies->map(fn($vacancy) => VacancyDto::fromModel($vacancy)->toArray())->toArray()
                : null,
            invites: isset($project->invites)
                ? $project->invites->map(function ($invite) {
                    return [
                        'id' => $invite->user->id,
                        'firstName' => $invite->user->first_name,
                        'secondName' => $invite->user->second_name,
                        'lastName' => $invite->user->last_name,
                        'vacancyId' => $invite->vacancy->id ?? null,
                        'vacancyName' => $invite->vacancy->name ?? null,
                    ];
                })->toArray()
                : null,
            canJoin: !$userId || !UserProject::where('project_id', $project->id)
                ->where('user_id', $userId)
                ->exists()
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
            'invites' => $this->invites,
            'canJoin' => $this->canJoin,
        ];
    }

    public function toArrayForAdmin(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'annotation' => $this->annotation,
            'mentor' => $this->mentor,
            'status' => $this->status,
            'canJoin' => $this->canJoin,
        ];
    }
}
