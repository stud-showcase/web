<?php

namespace App\Interfaces\Services;

use App\Models\Vacancy;

interface VacancyServiceInterface
{
    public function getAvailableFilters(array $filters): array;
    public function getFormattedVacancies(array $filters = []): array;
    public function createVacancy(int $projectId, array $data): Vacancy;
    public function updateVacancy(int $vacancyId, array $data): Vacancy;
    public function deleteVacancy(int $vacancyId): void;
}
