<?php

namespace App\Repositories;

use App\Interfaces\Repositories\ProjectRepositoryInterface;
use App\Models\Project;
use App\Models\ProjectFile;
use App\Models\ProjectInvite;
use App\Models\ProjectStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Throwable;

class ProjectRepository implements ProjectRepositoryInterface
{
    public function __construct(
        private FileRepository $fileRepository
    ) {}

    public function getProjects(array $filters, bool $forUser = false): LengthAwarePaginator
    {
        $cacheKey = 'projects:filtered:' . md5(json_encode($filters) . ':' . ($forUser ? 'user:' . Auth::id() : 'all')) . ':page_' . request()->query('page', 1);
        try {
            return Cache::tags(['projects'])->remember($cacheKey, 300, function () use ($filters, $forUser) {
                $projects = $this->buildProjectQuery($filters, $forUser)
                    ->paginate(10)
                    ->withQueryString();
                return $projects;
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить проекты: {$e->getMessage()}", 0, $e);
        }
    }

    public function getByIdWithRelations(int $id): Project
    {
        $cacheKey = "project:{$id}";
        try {
            return Cache::tags(['projects'])->remember($cacheKey, 3600, function () use ($id) {
                $project = Project::with([
                    'task.complexity',
                    'task.tags',
                    'status',
                    'mentor',
                    'users' => fn($q) => $q->select('users.id', 'users.first_name', 'users.second_name', 'users.last_name', 'users.email')->with('roles'),
                    'files',
                    'vacancies',
                    'invites' => fn($q) => $q->with([
                        'user' => fn($q2) => $q2->select('id', 'first_name', 'second_name', 'last_name'),
                        'vacancy' => fn($q2) => $q2->select('id', 'name'),
                    ]),
                ])->findOrFail($id);
                return $project;
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить проект: {$e->getMessage()}", 0, $e);
        }
    }

    public function create(int $taskId, string $name, User $user): Project
    {
        try {
            $project = DB::transaction(function () use ($taskId, $name, $user) {
                $hasUserPrivilegedRole = $user->hasPrivilegedRole();
                $project = Project::create([
                    'task_id' => $taskId,
                    'status_id' => ProjectStatus::STATUS_WAITING,
                    'name' => $name,
                    'mentor_id' => $hasUserPrivilegedRole ? $user->id : null,
                ]);

                if (!$hasUserPrivilegedRole) {
                    $project->users()->attach($user->id, ['is_creator' => true]);
                }

                return $project;
            });

            Cache::tags(['projects', 'user_projects', 'tasks'])->flush();
            return $project;
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось создать проект: {$e->getMessage()}", 0, $e);
        }
    }

    public function update(int $projectId, array $data): Project
    {
        try {
            $project = DB::transaction(function () use ($projectId, $data) {
                $project = Project::findOrFail($projectId);

                $project->update([
                    'name' => $data['name'] ?? $project->name,
                    'annotation' => $data['annotation'] ?? $project->annotation,
                    'status_id' => $data['statusId'] ?? $project->status_id,
                    'is_close' => $data['isClose'] ?? $project->is_close,
                ]);

                if (!empty($data['isClose'])) {
                    ProjectInvite::where('project_id', $projectId)->delete();
                }

                return $project->fresh();
            });

            Cache::tags(['projects', 'user_projects'])->flush();
            Cache::tags(['projects'])->forget("project:{$projectId}");
            return $project;
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось обновить проект: {$e->getMessage()}", 0, $e);
        }
    }

    public function delete(int $id): void
    {
        try {
            DB::transaction(function () use ($id) {
                $project = Project::with(['invites', 'users', 'vacancies'])->findOrFail($id);

                $project->invites()->delete();
                $project->users()->detach();
                $project->vacancies()->delete();
                $project->delete();

                Cache::tags(['projects', 'tasks'])->flush();
                Cache::forget("project:{$id}");
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось удалить проект: {$e->getMessage()}", 0, $e);
        }
    }

    public function createFiles(int $projectId, array $files): void
    {
        try {
            DB::transaction(function () use ($projectId, $files) {
                foreach ($files as $file) {
                    $this->fileRepository->saveFile($file, 'project', $projectId);
                }
            });
            Cache::tags(['projects'])->forget("project:{$projectId}");
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось создать файлы для проекта [$projectId]: {$e->getMessage()}", 0, $e);
        }
    }

    public function deleteFile(int $projectId, int $fileId): void
    {
        try {
            DB::transaction(function () use ($projectId, $fileId) {
                $file = ProjectFile::where('project_id', $projectId)
                    ->where('id', $fileId)
                    ->firstOrFail();
                $this->fileRepository->deleteFile($file);
            });
            Cache::tags(['projects'])->forget("project:{$projectId}");
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось удалить файл: {$e->getMessage()}", 0, $e);
        }
    }

    public function getAdminProjects(array $filters): LengthAwarePaginator
    {
        $cacheKey = 'admin_projects:filtered:' . md5(json_encode($filters)) . ':page_' . request()->query('page', 1);
        try {
            return Cache::tags(['projects'])->remember($cacheKey, 300, function () use ($filters) {
                $perPage = isset($filters['perPage']) && is_numeric($filters['perPage']) && $filters['perPage'] > 0
                    ? (int)$filters['perPage']
                    : 20;
                return Project::query()
                    ->with([
                        'mentor' => fn($q) => $q->select('users.id', 'first_name', 'second_name', 'last_name', 'email'),
                        'status'
                    ])
                    ->when(
                        isset($filters['search']) && !empty($filters['search']),
                        fn($q) => $q->where('name', 'LIKE', '%' . $filters['search'] . '%')
                    )
                    ->when(
                        isset($filters['status']) && is_array($filters['status']) && count($filters['status']) > 0,
                        fn($q) => $q->whereIn('status_id', $filters['status'])
                    )
                    ->when(
                        isset($filters['isHiring']),
                        fn($q) => $filters['isHiring']
                            ? $q->whereHas('task', fn($q2) => $q2->whereRaw('(SELECT COUNT(*) FROM user_project WHERE user_project.project_id = projects.id) < tasks.max_members'))
                            ->where('projects.is_close', false)
                            : $q->where(function ($subQ) {
                                $subQ->whereHas('task', fn($q2) => $q2->whereRaw('(SELECT COUNT(*) FROM user_project WHERE user_project.project_id = projects.id) >= tasks.max_members'))
                                    ->orWhere('projects.is_close', true);
                            })
                    )
                    ->paginate($perPage)
                    ->withQueryString();
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить проекты: {$e->getMessage()}", 0, $e);
        }
    }

    public function setMentor(int $projectId, string $mentorId): void
    {
        try {
            DB::transaction(function () use ($projectId, $mentorId) {
                $project = Project::findOrFail($projectId);
                $project->update(['mentor_id' => $mentorId]);
            });
            Cache::tags(['projects', 'user_projects'])->flush();
            Cache::tags(['projects'])->forget("project:{$projectId}");
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось установить ментора: {$e->getMessage()}", 0, $e);
        }
    }

    public function removeMentor(int $projectId): void
    {
        try {
            DB::transaction(function () use ($projectId) {
                $project = Project::findOrFail($projectId);
                $project->update(['mentor_id' => null]);
            });
            Cache::tags(['projects', 'user_projects'])->flush();
            Cache::tags(['projects'])->forget("project:{$projectId}");
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось удалить ментора: {$e->getMessage()}", 0, $e);
        }
    }

    protected function buildProjectQuery(array $filters, bool $forUser): Builder
    {
        $query = Project::query()->with([
            'task.complexity',
            'task.tags',
            'status',
            'mentor',
            'users',
            'vacancies',
        ]);

        if ($forUser) {
            $userId = Auth::id();
            $query->where(function ($q) use ($userId) {
                $q->whereHas('users', fn($q2) => $q2->where('users.id', $userId))
                    ->orWhere('mentor_id', $userId);
            });
        }

        $this->applyFilters($query, $filters);

        return $query;
    }

    protected function applyFilters(Builder $query, array $filters): void
    {
        $query->when(
            isset($filters['search']) && !empty($filters['search']),
            fn($q) => $q->where(function ($subQ) use ($filters) {
                $subQ->where('name', 'LIKE', '%' . $filters['search'] . '%')
                    ->orWhere('annotation', 'LIKE', '%' . $filters['search'] . '%');
            })
        )
            ->when(
                isset($filters['status']) && is_array($filters['status']) && count($filters['status']) > 0,
                fn($q) => $q->whereIn('status_id', $filters['status'])
            )
            ->when(
                isset($filters['complexity']) && is_array($filters['complexity']) && count($filters['complexity']) > 0,
                fn($q) => $q->whereHas('task', fn($q2) => $q2->whereIn('complexity_id', $filters['complexity']))
            )
            ->when(
                isset($filters['tags']) && is_array($filters['tags']) && count($filters['tags']) > 0,
                fn($q) => $q->whereHas('task.tags', fn($q2) => $q2->whereIn('tags.id', $filters['tags']))
            )
            ->when(
                isset($filters['isHiring']),
                fn($q) => $filters['isHiring']
                    ? $q->whereHas('task', fn($q2) => $q2->whereRaw('(SELECT COUNT(*) FROM user_project WHERE user_project.project_id = projects.id) < tasks.max_members'))
                    ->where('projects.is_close', false)
                    : $q->where(function ($subQ) {
                        $subQ->whereHas('task', fn($q2) => $q2->whereRaw('(SELECT COUNT(*) FROM user_project WHERE user_project.project_id = projects.id) >= tasks.max_members'))
                            ->orWhere('projects.is_close', true);
                    })
            );
    }
}
