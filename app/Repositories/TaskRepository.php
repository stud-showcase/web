<?php

namespace App\Repositories;

use App\Models\Task;

class TaskRepository
{
    public function getFilteredTasks(array $filters)
    {
        return Task::with(['complexity', 'tags', 'projects.users'])
            ->when(
                $filters['complexity'] ?? null,
                fn($q, $complexity) =>
                $q->where('complexity_id', $complexity)
            )
            ->when(
                !empty($filters['tags']),
                fn($q) =>
                $q->whereHas(
                    'tags',
                    fn($q2) =>
                    $q2->whereIn('id', $filters['tags'])
                )
            )
            ->when(
                $filters['min_members'] ?? null,
                fn($q, $min) =>
                $q->where('max_members', '>=', (int)$min)
            )
            ->when(
                $filters['max_members'] ?? null,
                fn($q, $max) =>
                $q->where('max_members', '<=', (int)$max)
            )
            ->when(
                isset($filters['customers']) && is_array($filters['customers']) && count($filters['customers']) > 0,
                fn($q) => $q->whereIn('customer', $filters['customers'])
            )

            ->paginate(10);
    }

    public function getByIdWithRelations(int $id): Task
    {
        return Task::with([
            'complexity',
            'tags',
            'groups',
            'files',
            'projects' => function ($query) {
                $query->with('status');
            }
        ])->findOrFail($id);
    }
}
