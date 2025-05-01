<?php

namespace App\Repositories;

use App\Models\Project;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProjectRepository
{
    public function getFilteredWithRelations(array $filters): LengthAwarePaginator
    {
        return Project::query()
            ->with(['users', 'mentor', 'files', 'status', 'task.complexity', 'task.tags', 'vacancies'])
            ->when($filters['status'] ?? null, fn($q, $statusId) => $q->where('status_id', $statusId))
            ->when($filters['complexity'] ?? null, function ($q, $complexityId) {
                $q->whereHas('task', fn($q) => $q->where('complexity_id', $complexityId));
            })
            ->when(!empty($filters['tags']), function ($q) use ($filters) {
                $q->whereHas('task.tags', function ($q) use ($filters) {
                    $q->whereIn('tags.id', $filters['tags']);
                });
            })
            ->when(isset($filters['isHiring']), function ($q) use ($filters) {
                if ($filters['isHiring']) {
                    $q->whereRaw('(SELECT COUNT(*) FROM user_project WHERE project_id = projects.id) < tasks.max_members');
                } else {
                    $q->whereRaw('(SELECT COUNT(*) FROM user_project WHERE project_id = projects.id) >= tasks.max_members');
                }
            })
            ->join('tasks', 'projects.task_id', '=', 'tasks.id')
            ->select('projects.*')
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
        ])->findOrFail($id);
    }
}
