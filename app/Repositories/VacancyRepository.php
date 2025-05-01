<?php

namespace App\Repositories;

use App\Models\Vacancy;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class VacancyRepository
{
    public function getFilteredVacancies(array $filters): LengthAwarePaginator
    {
        return Vacancy::query()
            ->with(['project.task.tags'])
            ->when(
                isset($filters['tags']) && is_array($filters['tags']) && count($filters['tags']) > 0,
                fn($q) => $q->whereHas(
                    'project.task.tags',
                    fn($q2) => $q2->whereIn('tags.id', $filters['tags'])
                )
            )
            ->when(
                isset($filters['search']) && !empty($filters['search']),
                fn($q) => $q->where('name', 'LIKE', '%' . $filters['search'] . '%')
            )
            ->paginate(10)
            ->withQueryString();
    }
}
