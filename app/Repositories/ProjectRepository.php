<?php

namespace App\Repositories;

use App\Models\Project;
use Illuminate\Support\Collection;

class ProjectRepository
{
    public function getAllWithRelations(): Collection
    {
        return Project::with([
            'task.complexity',
            'status',
            'mentor',
            'users' => fn($q) => $q->select('users.id', 'users.first_name', 'users.second_name', 'last_name'),
            'files'
        ])->get();
    }

    public function getByIdWithDetails(int $id): Project
    {
        return Project::with([
            'task.complexity',
            'task.tags',
            'status',
            'mentor',
            'users' => fn($q) => $q->select('users.id', 'users.first_name', 'users.second_name', 'users.last_name'),
            'files',
            'vacancies',
        ])->findOrFail($id);
    }
}
