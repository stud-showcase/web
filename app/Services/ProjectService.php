<?php

namespace App\Services;

use App\Repositories\ProjectRepository;
use App\Dto\ProjectDto;
use App\Models\Project;
use App\Models\User;
use App\Repositories\ProjectInviteRepository;
use App\Repositories\UserProjectRepository;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

class ProjectService
{
    public function __construct(
        private ProjectRepository $projectRepository,
        private ProjectInviteRepository $inviteRepository,
        private UserProjectRepository $userProjectRepository,
    ) {}

    public function getFilteredProjects(array $filters): array
    {
        $projectsPaginator = $this->projectRepository->getProjects($filters);
        $projectsPaginator->setCollection(
            $projectsPaginator->getCollection()->map(fn($project) => ProjectDto::fromModel($project)->toArray())
        );

        $projectsData = [
            'data' => $projectsPaginator->items(),
            'currentPage' => $projectsPaginator->currentPage(),
            'lastPage' => $projectsPaginator->lastPage(),
            'perPage' => $projectsPaginator->perPage(),
            'total' => $projectsPaginator->total(),
            'links' => $projectsPaginator->links()->elements[0] ?? [],
        ];

        return $projectsData;
    }

    public function getFilteredUserProjects(array $filters): array
    {
        $projectsPaginator = $this->projectRepository->getUserProjects($filters);
        $projectsPaginator->setCollection(
            $projectsPaginator->getCollection()->map(fn($project) => ProjectDto::fromModel($project)->toArray())
        );

        $projectsData = [
            'data' => $projectsPaginator->items(),
            'currentPage' => $projectsPaginator->currentPage(),
            'lastPage' => $projectsPaginator->lastPage(),
            'perPage' => $projectsPaginator->perPage(),
            'total' => $projectsPaginator->total(),
            'links' => $projectsPaginator->links()->elements[0] ?? [],
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

    public function acceptInvite(int $inviteId): void
    {
        try {
            $invite = $this->inviteRepository->findWithRelations($inviteId);
            $this->inviteRepository->acceptInvite($invite);
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
            $filteredData = array_filter($data, fn($key) => in_array($key, ['name', 'annotation', 'statusId', 'isClose']), ARRAY_FILTER_USE_KEY);
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

    public function getAdminProjects(array $filters = []): array
    {
        $paginator = $this->projectRepository->getAdminProjects($filters);
        $paginator->setCollection(
            $paginator->getCollection()->map(fn($project) => ProjectDto::fromModel($project)->toArrayForAdmin())
        );

        return [
            'data' => $paginator->items(),
            'currentPage' => $paginator->currentPage(),
            'lastPage' => $paginator->lastPage(),
            'perPage' => $paginator->perPage(),
            'total' => $paginator->total(),
            'links' => $paginator->links()->elements[0] ?? [],
        ];
    }

    public function updateMember(int $projectId, string $memberId, array $data): void
    {
        try {
            $this->userProjectRepository->update($projectId, $memberId, $data);
        } catch (Throwable $e) {
            Log::error("Ошибка обновления участника [$memberId] проекта [$projectId]: " . $e->getMessage());
            throw $e;
        }
    }

    public function deleteMember(int $projectId, string $memberId): void
    {
        try {
            $this->userProjectRepository->delete($projectId, $memberId);
        } catch (Throwable $e) {
            Log::error("Ошибка удаления участника [$memberId] из проекта [$projectId]: " . $e->getMessage());
            throw $e;
        }
    }
}
