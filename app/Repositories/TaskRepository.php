<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Support\Collection;

class TaskRepository
{
    public function getAllWithRelations(): Collection
    {
        return Task::with(['complexity', 'tags'])->get();
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
