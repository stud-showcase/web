<?php

namespace App\Repositories;

use App\Models\Vacancy;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

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

    public function create(int $projectId, array $data): Vacancy
    {
        try {
            return DB::transaction(function () use ($projectId, $data) {
                return Vacancy::create([
                    'project_id' => $projectId,
                    'name' => $data['name'],
                    'description' => $data['description'],
                ]);
            });
        } catch (Throwable $e) {
            Log::error("Ошибка создания вакансии для проекта [$projectId]: " . $e->getMessage());
            throw $e;
        }
    }

    public function update(int $vacancyId, array $data): Vacancy
    {
        try {
            return DB::transaction(function () use ($vacancyId, $data) {
                $vacancy = Vacancy::findOrFail($vacancyId);
                $vacancy->update($data);
                return $vacancy->fresh();
            });
        } catch (Throwable $e) {
            Log::error("Ошибка обновления вакансии [$vacancyId]: " . $e->getMessage());
            throw $e;
        }
    }

    public function delete(int $vacancyId): void
    {
        try {
            DB::transaction(function () use ($vacancyId) {
                $vacancy = Vacancy::findOrFail($vacancyId);
                $vacancy->delete();
            });
        } catch (Throwable $e) {
            Log::error("Ошибка удаления вакансии [$vacancyId]: " . $e->getMessage());
            throw $e;
        }
    }
}
