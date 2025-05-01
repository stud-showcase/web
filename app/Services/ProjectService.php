<?php

namespace App\Services;

use App\Repositories\ProjectRepository;
use App\Dto\ProjectDto;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProjectService
{
    public function __construct(
        private ProjectRepository $projectRepository
    ) {}

    public function getFilteredProjects(array $filters): LengthAwarePaginator
    {
        return $this->projectRepository->getFilteredWithRelations($filters)
            ->through(fn($project) => ProjectDto::fromModel($project)->toArray());
    }

    public function getFormattedProjectById(int $id): array
    {
        $project = $this->projectRepository->getByIdWithRelations($id);
        return ProjectDto::fromModel($project)->toArray();
    }
}
