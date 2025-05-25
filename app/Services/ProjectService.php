<?php

namespace App\Services;

use App\Dto\ProjectDto;
use App\Models\Project;
use App\Models\User;
use App\Repositories\ProjectInviteRepository;
use App\Repositories\ProjectRepository;
use App\Repositories\SettingRepository;
use App\Repositories\TagRepository;
use App\Repositories\UserProjectRepository;
use App\Traits\PaginatesCollections;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Throwable;

class ProjectService
{
    use PaginatesCollections;

    public function __construct(
        private ProjectRepository $projectRepository,
        private ProjectInviteRepository $inviteRepository,
        private UserProjectRepository $userProjectRepository,
        private TagRepository $tagRepository,
        private SettingRepository $settingRepository,
    ) {}

    public function getAvailableFilters(array $requestedFilters, bool $forUser = false): array
    {
        $filters = [];

        if (in_array('tags', $requestedFilters)) {
            $filters['tags'] = $forUser
                ? $this->projectRepository->getUserProjectTags(Auth::id())->toArray()
                : $this->tagRepository->getTagsForFilters()->toArray();
        }

        return $filters;
    }

    public function getProjects(array $filters = []): array
    {
        $paginator = $this->projectRepository->getProjects($filters);
        return $this->formatPaginatedData($paginator, fn($project) => ProjectDto::fromModel($project)->toArray());
    }

    public function getUserProjects(array $filters = []): array
    {
        $paginator = $this->projectRepository->getProjects($filters, true);
        return $this->formatPaginatedData($paginator, fn($project) => ProjectDto::fromModel($project)->toArray());
    }

    public function getProjectById(int $id): array
    {
        try {
            $project = $this->projectRepository->getByIdWithRelations($id);
            return ProjectDto::fromModel($project)->toArray();
        } catch (Throwable $e) {
            Log::error("Ошибка получения проекта [$id]: " . $e->getMessage());
            throw $e;
        }
    }

    public function createInvite(string $userId, int $projectId, ?int $vacancyId): void
    {
        try {
            $this->inviteRepository->create($userId, $projectId, $vacancyId);
        } catch (Throwable $e) {
            Log::error("Ошибка создания приглашения в проект [$projectId]: " . $e->getMessage(), ['user_id' => $userId, 'vacancy_id' => $vacancyId]);
            throw $e;
        }
    }

    public function acceptInvite(int $inviteId): void
    {
        try {
            $invite = $this->inviteRepository->findWithRelations($inviteId);
            $this->inviteRepository->acceptInvite($invite);
        } catch (Throwable $e) {
            Log::error("Ошибка принятия приглашения [$inviteId]: " . $e->getMessage());
            throw $e;
        }
    }

    public function rejectInvite(int $inviteId): void
    {
        try {
            $invite = $this->inviteRepository->find($inviteId);
            $this->inviteRepository->rejectInvite($invite);
        } catch (Throwable $e) {
            Log::error("Ошибка отклонения приглашения [$inviteId]: " . $e->getMessage());
            throw $e;
        }
    }

    public function createProject(int $taskId, string $name, User $user): Project
    {
        try {
            return $this->projectRepository->create($taskId, $name, $user);
        } catch (Throwable $e) {
            Log::error("Ошибка создания проекта: " . $e->getMessage(), ['task_id' => $taskId, 'name' => $name, 'user_id' => $user->id]);
            throw $e;
        }
    }

    public function updateProject(int $projectId, array $data): Project
    {
        try {
            return $this->projectRepository->update($projectId, $data);
        } catch (Throwable $e) {
            Log::error("Ошибка обновления проекта [$projectId]: " . $e->getMessage(), ['data' => $data]);
            throw $e;
        }
    }

    public function deleteProject(int $projectId): void
    {
        try {
            $this->projectRepository->delete($projectId);
        } catch (Throwable $e) {
            Log::error("Ошибка удаления проекта [$projectId]: " . $e->getMessage());
            throw $e;
        }
    }

    public function setMentor(int $projectId, int $mentorId): void
    {
        try {
            $this->projectRepository->setMentor($projectId, $mentorId);
        } catch (Throwable $e) {
            Log::error("Ошибка установки ментора [$mentorId] для проекта [$projectId]: " . $e->getMessage());
            throw $e;
        }
    }

    public function removeMentor(int $projectId): void
    {
        try {
            $this->projectRepository->removeMentor($projectId);
        } catch (Throwable $e) {
            Log::error("Ошибка удаления ментора из проекта [$projectId]: " . $e->getMessage());
            throw $e;
        }
    }

    public function uploadFiles(int $projectId, array $files): void
    {
        try {
            $filesData = [];
            foreach ($files as $file) {
                if (!$file instanceof UploadedFile) {
                    throw new \InvalidArgumentException('Недопустимый тип файла');
                }

                $extension = $file->getClientOriginalExtension();
                $uniqueName = Str::uuid() . '.' . $extension;
                $directory = 'project_files/' . $projectId;
                $path = $file->storeAs($directory, $uniqueName, 'public');

                $filesData[] = [
                    'name' => $file->getClientOriginalName(),
                    'path' => str_replace('public/', '', $path),
                ];
            }

            $this->projectRepository->createFiles($projectId, $filesData);
        } catch (\Throwable $e) {
            Log::error("Ошибка загрузки файлов для проекта [$projectId]: " . $e->getMessage(), [
                'files_count' => count($files),
            ]);
            throw $e;
        }
    }

    public function deleteFile(int $projectId, int $fileId): void
    {
        try {
            $this->projectRepository->deleteFile($projectId, $fileId);
        } catch (Throwable $e) {
            Log::error("Ошибка удаления файла [$fileId] для проекта [$projectId]: " . $e->getMessage());
            throw $e;
        }
    }

    public function getAdminProjects(array $filters = []): array
    {
        $paginator = $this->projectRepository->getAdminProjects($filters);
        return $this->formatPaginatedData($paginator, fn($project) => ProjectDto::fromModel($project)->toArrayForAdmin());
    }

    public function updateMember(int $projectId, string $memberId, array $data): void
    {
        try {
            $this->userProjectRepository->update($projectId, $memberId, $data);
        } catch (Throwable $e) {
            Log::error("Ошибка обновления участника [$memberId] проекта [$projectId]: " . $e->getMessage(), ['data' => $data]);
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

    public function getSettings(): array
    {
        try {
            $settings = $this->settingRepository->getSettings();
            return [
                'startDate' => $settings?->start_date,
                'endDate' => $settings?->end_date,
            ];
        } catch (Throwable $e) {
            return [
                'startDate' => null,
                'endDate' => null,
            ];
        }
    }

    public function updateSettings(array $data): void
    {
        try {
            $this->settingRepository->updateSettings($data);
        } catch (Throwable $e) {
            Log::error('Ошибка изменения настроек: ' . $e->getMessage(), $data);
            throw $e;
        }
    }
}
