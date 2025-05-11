<?php

namespace App\Repositories;

use App\Models\Project;
use App\Models\ProjectFile;
use App\Models\ProjectInvite;
use App\Models\ProjectStatus;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Throwable;

class ProjectRepository
{
    public function getProjects(array $filters): LengthAwarePaginator
    {
        $query = Project::query()
            ->with([
                'users',
                'mentor',
                'files',
                'status',
                'task.complexity',
                'task.tags',
                'vacancies',
            ])
            ->join('tasks', 'projects.task_id', '=', 'tasks.id');

        $query
            ->when(
                isset($filters['status']) && is_array($filters['status']) && count($filters['status']) > 0,
                fn($q) => $q->whereIn('projects.status_id', $filters['status'])
            )
            ->when(
                isset($filters['complexity']) && is_array($filters['complexity']) && count($filters['complexity']) > 0,
                fn($q) => $q->whereIn('tasks.complexity_id', $filters['complexity'])
            )
            ->when(
                isset($filters['tags']) && is_array($filters['tags']) && count($filters['tags']) > 0,
                fn($q) => $q->whereHas('task.tags', fn($q2) => $q2->whereIn('tags.id', $filters['tags']))
            )
            ->when(
                isset($filters['isHiring']),
                fn($q) => $filters['isHiring']
                    ? $q->whereRaw('(SELECT COUNT(*) FROM user_project WHERE user_project.project_id = projects.id) < tasks.max_members')
                    ->where('projects.is_close', false)
                    : $q->where(function ($subQ) {
                        $subQ->whereRaw('(SELECT COUNT(*) FROM user_project WHERE user_project.project_id = projects.id) >= tasks.max_members')
                            ->orWhere('projects.is_close', true);
                    })
            )
            ->when(
                isset($filters['members']),
                fn($q) => $q->where('tasks.max_members', '>=', (int)$filters['members'])
            )
            ->when(
                isset($filters['customers']) && is_array($filters['customers']) && count($filters['customers']) > 0,
                fn($q) => $q->whereIn('tasks.customer', $filters['customers'])
            )
            ->when(
                !empty($filters['search']),
                fn($q) => $q->where('projects.name', 'LIKE', '%' . $filters['search'] . '%')
            );

        return $query->select('projects.*')
            ->paginate(10)
            ->withQueryString();
    }

    public function getUserProjects(array $filters): LengthAwarePaginator
    {
        $query = Project::query()
            ->with([
                'users',
                'mentor',
                'files',
                'status',
                'task.complexity',
                'task.tags',
                'vacancies',
            ])
            ->join('tasks', 'projects.task_id', '=', 'tasks.id')
            ->whereHas('users', fn($q) => $q->where('users.id', Auth::id()));

        $query->when(
            isset($filters['status']) && is_array($filters['status']) && count($filters['status']) > 0,
            fn($q) => $q->whereIn('projects.status_id', $filters['status'])
        )
            ->when(
                isset($filters['complexity']) && is_array($filters['complexity']) && count($filters['complexity']) > 0,
                fn($q) => $q->whereIn('tasks.complexity_id', $filters['complexity'])
            )
            ->when(
                isset($filters['tags']) && is_array($filters['tags']) && count($filters['tags']) > 0,
                fn($q) => $q->whereHas('task.tags', fn($q2) => $q2->whereIn('tags.id', $filters['tags']))
            )
            ->when(
                isset($filters['isHiring']),
                fn($q) => $filters['isHiring']
                    ? $q->whereRaw('(SELECT COUNT(*) FROM user_project WHERE user_project.project_id = projects.id) < tasks.max_members')
                    ->where('projects.is_close', false)
                    : $q->where(function ($subQ) {
                        $subQ->whereRaw('(SELECT COUNT(*) FROM user_project WHERE user_project.project_id = projects.id) >= tasks.max_members')
                            ->orWhere('projects.is_close', true);
                    })
            )
            ->when(
                isset($filters['members']),
                fn($q) => $q->where('tasks.max_members', '>=', (int)$filters['members'])
            )
            ->when(
                isset($filters['customers']) && is_array($filters['customers']) && count($filters['customers']) > 0,
                fn($q) => $q->whereIn('tasks.customer', $filters['customers'])
            )
            ->when(
                isset($filters['search']) && !empty($filters['search']),
                fn($q) => $q->where('projects.name', 'LIKE', '%' . $filters['search'] . '%')
            );

        return $query->select('projects.*')
            ->paginate(10)
            ->withQueryString();
    }

    public function getByIdWithRelations(int $id): Project
    {
        return Project::with([
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
    }

    public function create(int $taskId, string $name, User $user): Project
    {
        try {
            $project = DB::transaction(function () use ($taskId, $name, $user) {
                $isPrivileged = $user->hasPrivilegedRole();

                $project = Project::create([
                    'task_id' => $taskId,
                    'status_id' => ProjectStatus::STATUS_WAITING,
                    'name' => $name,
                    'mentor_id' => $isPrivileged ? $user->id : null,
                ]);

                if (!$isPrivileged) {
                    $project->users()->attach($user->id, ['is_creator' => true]);
                }

                return $project;
            });

            return $project;
        } catch (Throwable $e) {
            Log::error("Ошибка создания проекта. Задача - [$taskId]. Пользователь - [$user->id]: " . $e->getMessage());
            throw $e;
        }
    }

    public function update(int $projectId, array $data): Project
    {
        try {
            return DB::transaction(function () use ($projectId, $data) {
                $project = Project::findOrFail($projectId);

                $project->update($data);

                if (isset($data['isClose']) && $data['isClose'] == true) {
                    $deleted = ProjectInvite::where('project_id', $projectId)->delete();
                    Log::info("Удалено {$deleted} приглашений для проекта [$projectId] при закрытии.");
                }

                return $project->fresh();
            });
        } catch (Throwable $e) {
            Log::error("Ошибка обновления проекта [$projectId]: " . $e->getMessage());
            throw $e;
        }
    }

    public function createFiles(int $projectId, array $fileData): void
    {
        try {
            DB::transaction(function () use ($projectId, $fileData) {
                foreach ($fileData as $data) {
                    ProjectFile::create([
                        'project_id' => $projectId,
                        'name' => $data['name'],
                        'path' => $data['path'],
                    ]);
                }
            });
        } catch (Throwable $e) {
            Log::error("Ошибка создания файлов для проекта [$projectId]: " . $e->getMessage());
            throw $e;
        }
    }

    public function deleteFile(int $projectId, int $fileId): void
    {
        try {
            DB::transaction(function () use ($projectId, $fileId) {
                $file = ProjectFile::where('project_id', $projectId)
                    ->where('id', $fileId)
                    ->firstOrFail();

                if (Storage::disk('public')->exists($file->path)) {
                    Storage::disk('public')->delete($file->path);
                }

                $file->delete();
            });
        } catch (Throwable $e) {
            Log::error("Ошибка удаления файла [$fileId] для проекта [$projectId]: " . $e->getMessage());
            throw $e;
        }
    }

    public function getAdminProjects(array $filters): LengthAwarePaginator
    {
        return Project::query()
            ->with([
                'mentor' => fn($q) => $q->select('users.id', 'first_name', 'second_name', 'last_name', 'email'),
                'status'
            ])
            ->when(
                isset($filters['search']) && !empty($filters['search']),
                fn($q) => $q->where('name', 'LIKE', '%' . $filters['search'] . '%')
                    ->orWhere('annotation', 'LIKE', '%' . $filters['search'] . '%')
            )
            ->paginate(10)
            ->withQueryString();
    }
}
