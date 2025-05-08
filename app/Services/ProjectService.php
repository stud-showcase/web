<?php

namespace App\Services;

use App\Repositories\ProjectRepository;
use App\Dto\ProjectDto;
use App\Models\Project;
use App\Models\User;
use App\Repositories\ProjectInviteRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

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

    public function createInvite(int $userId, int $projectId, ?int $vacancyId): void
    {
        try {
            $this->inviteRepository->create($userId, $projectId, $vacancyId);
        } catch (\Throwable $e) {
            Log::error("Ошибка создания запроса на вступление в проект [$projectId]: " . $e->getMessage(), ['exception' => $e]);
            throw $e;
        }
    }

    public function acceptInvite(int $inviteId): int
    {
        try {
            $invite = $this->inviteRepository->findWithRelations($inviteId);
            $inviteProjectId = $invite->project_id;

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

            return $inviteProjectId;
        } catch (\Throwable $e) {
            Log::error("Ошибка принятия запроса [$inviteId] на вступление в проект: " . $e->getMessage(), ['exception' => $e]);
            throw $e;
        }
    }

    public function createProject(int $taskId, string $name, User $user): Project
    {
        return $this->projectRepository->create($taskId, $name, $user);
    }

    public function updateProject(int $projectId, array $data): Project
    {
        try {
            $filteredData = array_filter($data, fn($key) => in_array($key, ['name', 'annotation', 'status_id']), ARRAY_FILTER_USE_KEY);
            return $this->projectRepository->update($projectId, $filteredData);
        } catch (Throwable $e) {
            throw new \Exception("Не удалось обновить проект: {$e->getMessage()}", 0, $e);
        }
    }

    public function uploadFiles(int $projectId, array $files): void
    {
        try {
            $fileData = [];
            foreach ($files as $file) {
                $extension = $file->getClientOriginalExtension();
                $uniqueName = Str::uuid() . '.' . $extension;
                $directory = 'project_files/' . $projectId;
                $path = $file->storeAs($directory, $uniqueName, 'public');

                $fileData[] = [
                    'name' => $file->getClientOriginalName(),
                    'path' => str_replace('public/', '', $path),
                ];
            }

            $this->projectRepository->createFiles($projectId, $fileData);
        } catch (Throwable $e) {
            throw new \Exception("Не удалось загрузить файлы: {$e->getMessage()}", 0, $e);
        }
    }
}
