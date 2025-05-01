<?php

namespace App\Services;

use App\Repositories\ProjectRepository;
use App\Dto\ProjectDto;

class ProjectService
{
    public function __construct(
        private ProjectRepository $projectRepository
    ) {}

    public function getFilteredProjects(array $filters): array
    {
        $applyFiltersToUserProjects = isset($filters['userProjects']) && $filters['userProjects'] == true;

        $projectsPaginator = $this->projectRepository->getProjects($filters, !$applyFiltersToUserProjects);
        $projectsPaginator->setCollection(
            $projectsPaginator->getCollection()->map(fn($project) => ProjectDto::fromModel($project)->toArray())
        );

        $userProjectsPaginator = $this->projectRepository->getUserProjects($filters, $applyFiltersToUserProjects);
        $userProjectsPaginator->setCollection(
            $userProjectsPaginator->getCollection()->map(fn($project) => ProjectDto::fromModel($project)->toArray())
        );

        $projectsData = [
            'projects' => [
                'data' => $projectsPaginator->items(),
                'currentPage' => $projectsPaginator->currentPage(),
                'lastPage' => $projectsPaginator->lastPage(),
                'perPage' => $projectsPaginator->perPage(),
                'total' => $projectsPaginator->total(),
                'links' => $projectsPaginator->links()->elements[0] ?? [],
            ],
            'userProjects' => [
                'data' => $userProjectsPaginator->items(),
                'currentPage' => $userProjectsPaginator->currentPage(),
                'lastPage' => $userProjectsPaginator->lastPage(),
                'perPage' => $userProjectsPaginator->perPage(),
                'total' => $userProjectsPaginator->total(),
                'links' => $userProjectsPaginator->links()->elements[0] ?? [],
            ],
        ];

        return $projectsData;
    }

    public function getFormattedProjectById(int $id): array
    {
        $project = $this->projectRepository->getByIdWithRelations($id);
        return ProjectDto::fromModel($project)->toArray();
    }
}
