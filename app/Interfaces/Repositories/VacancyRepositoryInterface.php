<?php

namespace App\Interfaces\Repositories;

use App\Models\Vacancy;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface VacancyRepositoryInterface
{
    public function getFilteredVacancies(array $filters): LengthAwarePaginator;
    public function create(int $projectId, array $data): Vacancy;
    public function update(int $vacancyId, array $data): Vacancy;
    public function delete(int $vacancyId): void;
}
