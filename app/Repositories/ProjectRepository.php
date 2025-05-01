<?php

namespace App\Repositories;

use App\Models\Project;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class ProjectRepository
{
    public function getProjects(array $filters, bool $applyFilters): LengthAwarePaginator
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

        if ($applyFilters) {
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
                        : $q->whereRaw('(SELECT COUNT(*) FROM user_project WHERE user_project.project_id = projects.id) >= tasks.max_members')
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
        }

        return $query->select('projects.*')
            ->paginate(10)
            ->withQueryString();
    }

    public function getUserProjects(array $filters, bool $applyFilters): LengthAwarePaginator
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

        if ($applyFilters) {
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
                        : $q->whereRaw('(SELECT COUNT(*) FROM user_project WHERE user_project.project_id = projects.id) >= tasks.max_members')
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
        }

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
}
