<?php

namespace App\Services;

use App\Dto\VacancyDto;
use App\Models\Vacancy;
use App\Repositories\VacancyRepository;
use App\Traits\PaginatesCollections;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Throwable;

class VacancyService
{
    use PaginatesCollections;

    public function __construct(
        private VacancyRepository $vacancyRepository
    ) {}

    public function getFormattedVacancies(array $filters = []): array
    {
        $paginator = $this->vacancyRepository->getFilteredVacancies($filters);
        return $this->formatPaginatedData($paginator, fn($vacancy) => VacancyDto::fromModel($vacancy)->toArray());
    }

    public function createVacancy(int $projectId, array $data): Vacancy
    {
        try {
            $filteredData = Arr::only($data, ['name', 'description']);
            return $this->vacancyRepository->create($projectId, $filteredData);
        } catch (Throwable $e) {
            Log::error("Ошибка создания вакансии для проекта [$projectId]: " . $e->getMessage(), ['data' => $data]);
            throw new \Exception("Не удалось создать вакансию: {$e->getMessage()}", 0, $e);
        }
    }

    public function updateVacancy(int $vacancyId, array $data): Vacancy
    {
        try {
            $filteredData = Arr::only($data, ['name', 'description']);
            return $this->vacancyRepository->update($vacancyId, $filteredData);
        } catch (Throwable $e) {
            Log::error("Ошибка обновления вакансии [$vacancyId]: " . $e->getMessage(), ['data' => $data]);
            throw new \Exception("Не удалось обновить вакансию: {$e->getMessage()}", 0, $e);
        }
    }

    public function deleteVacancy(int $vacancyId): void
    {
        try {
            $this->vacancyRepository->delete($vacancyId);
        } catch (Throwable $e) {
            Log::error("Ошибка удаления вакансии [$vacancyId]: " . $e->getMessage());
            throw new \Exception("Не удалось удалить вакансию: {$e->getMessage()}", 0, $e);
        }
    }

    public function getAdminVacancies(array $filters = []): array
    {
        $paginator = $this->vacancyRepository->getAdminVacancies($filters);
        return $this->formatPaginatedData($paginator, fn($vacancy) => VacancyDto::fromModel($vacancy)->toArrayForAdmin());
    }
}
