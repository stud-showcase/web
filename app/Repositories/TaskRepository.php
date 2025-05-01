<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TaskRepository
{
    public function getFilteredTasks(array $filters): LengthAwarePaginator
    {
        return Task::query()
            ->with([
                'complexity',
                'tags',
                'projects.users' => fn($q) => $q->select('users.id'),
                'files',
            ])
            ->when(
                isset($filters['complexity']) && is_array($filters['complexity']) && count($filters['complexity']) > 0,
                fn($q) => $q->whereIn('complexity_id', $filters['complexity'])
            )
            ->when(
                isset($filters['tags']) && is_array($filters['tags']) && count($filters['tags']) > 0,
                fn($q) => $q->whereHas('tags', fn($q2) => $q2->whereIn('tags.id', $filters['tags']))
            )
            ->when(
                isset($filters['members']),
                fn($q) => $q->where('max_members', '<=', (int)$filters['members'])
            )
            ->when(
                isset($filters['customers']) && is_array($filters['customers']) && count($filters['customers']) > 0,
                fn($q) => $q->whereIn('customer', $filters['customers'])
            )
            ->when(
                isset($filters['deadline']),
                fn($q) => $q->where('deadline', '>=', $filters['deadline'])
            )
            ->when(
                isset($filters['search']) && !empty($filters['search']),
                fn($q) => $q->where('title', 'LIKE', '%' . $filters['search'] . '%')
            )
            ->paginate(10)
            ->withQueryString();
    }

    public function getByIdWithRelations(int $id): Task
    {
        return Task::with([
            'complexity',
            'tags',
            'groups',
            'files',
            'projects' => function ($query) {
                $query->with([
                    'status',
                    'users' => fn($q) => $q->select('users.id'),
                ]);
            },
        ])->findOrFail($id);
    }
}
