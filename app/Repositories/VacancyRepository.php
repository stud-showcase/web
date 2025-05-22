<?php

namespace App\Repositories;

use App\Models\Vacancy;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Throwable;

class VacancyRepository
{
    public function getFilteredVacancies(array $filters): LengthAwarePaginator
    {
        $cacheKey = 'vacancies:filtered:' . md5(json_encode($filters)) . ':page_' . request()->query('page', 1);
        try {
            return Cache::tags(['vacancies'])->remember($cacheKey, 300, function () use ($filters) {
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
                        !empty($filters['search']),
                        fn($q) => $q->where('name', 'LIKE', '%' . $filters['search'] . '%')
                    )
                    ->paginate(10)
                    ->withQueryString();
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить вакансии: {$e->getMessage()}", 0, $e);
        }
    }

    public function create(int $projectId, array $data): Vacancy
    {
        try {
            $vacancy = DB::transaction(function () use ($projectId, $data) {
                return Vacancy::create([
                    'project_id' => $projectId,
                    'name' => $data['name'],
                    'description' => $data['description'] ?? null,
                ]);
            });
            Cache::tags(['vacancies'])->flush();
            Cache::tags(['projects'])->forget("project:{$projectId}");
            return $vacancy;
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось создать вакансию: {$e->getMessage()}", 0, $e);
        }
    }

    public function update(int $vacancyId, array $data): Vacancy
    {
        try {
            $vacancy = DB::transaction(function () use ($vacancyId, $data) {
                $vacancy = Vacancy::findOrFail($vacancyId);
                $vacancy->update($data);
                return $vacancy->fresh();
            });
            Cache::tags(['vacancies'])->flush();
            Cache::tags(['projects'])->forget("project:{$vacancy->project_id}");
            return $vacancy;
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось обновить вакансию: {$e->getMessage()}", 0, $e);
        }
    }

    public function delete(int $vacancyId): void
    {
        try {
            DB::transaction(function () use ($vacancyId) {
                $vacancy = Vacancy::findOrFail($vacancyId);
                $projectId = $vacancy->project_id;
                $vacancy->delete();
                Cache::tags(['vacancies'])->flush();
                Cache::tags(['projects'])->forget("project:{$projectId}");
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось удалить вакансию: {$e->getMessage()}", 0, $e);
        }
    }

    public function getAdminVacancies(array $filters): LengthAwarePaginator
    {
        $cacheKey = 'admin_vacancies:filtered:' . md5(json_encode($filters)) . ':page_' . request()->query('page', 1);
        try {
            return Cache::tags(['vacancies'])->remember($cacheKey, 300, function () use ($filters) {
                return Vacancy::query()
                    ->with(['project'])
                    ->when(
                        !empty($filters['search']),
                        fn($q) => $q->where('name', 'LIKE', '%' . $filters['search'] . '%')
                            ->orWhere('description', 'LIKE', '%' . $filters['search'] . '%')
                    )
                    ->paginate(20)
                    ->withQueryString();
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить вакансии: {$e->getMessage()}", 0, $e);
        }
    }
}
