<?php

namespace App\Services;

use App\Repositories\ProjectRepository;
use App\Dto\ProjectDto;
use Illuminate\Support\Collection;

class ProjectService
{
    public function __construct(
        private ProjectRepository $projectRepository
    ) {}

    public function getFormattedProjects(): Collection
    {
        return $this->projectRepository->getAllWithRelations()
            ->map(fn($project) => ProjectDto::fromModel($project)->toArray());
    }

    public function getFormattedProjectById(int $id): array
    {
        $project = $this->projectRepository->getByIdWithDetails($id);

        return ProjectDto::fromModel($project)->toArray();
    }
}
