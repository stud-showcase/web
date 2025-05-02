<?php

namespace App\Services;

use App\Repositories\ProjectRepository;
use App\Dto\ProjectDto;
use App\Models\Project;
use App\Models\ProjectInvite;
use App\Repositories\ProjectInviteRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProjectService
{
    public function __construct(
        private ProjectRepository $projectRepository,
        private ProjectInviteRepository $inviteRepository
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

    public function createInvite(int $userId, int $projectId, ?int $vacancyId): bool
    {
        try {
            $project = Project::withCount('users')->with('task')->findOrFail($projectId);

            if ($project->users->count() >= $project->task->max_members) {
                return false;
            }

            $this->inviteRepository->create($userId, $projectId, $vacancyId);
            return true;
        } catch (\Throwable $e) {
            Log::error("Ошибка создания запроса на вступление в проект [$projectId]: " . $e->getMessage(), ['exception' => $e]);
            return false;
        }
    }

    public function acceptInvite(int $inviteId): ProjectInvite|bool
    {
        try {
            $invite = $this->inviteRepository->findWithRelations($inviteId);

            DB::transaction(function () use ($invite) {
                DB::table('user_project')->insert([
                    'user_id' => $invite->user_id,
                    'project_id' => $invite->project_id,
                    'position' => $invite->vacancy?->name,
                    'is_creator' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $invite->delete();
            });

            return $invite;
        } catch (\Throwable $e) {
            Log::error("Ошибка принятия запроса [$inviteId] на вступление в проект: " . $e->getMessage(), ['exception' => $e]);
            return false;
        }
    }
}
