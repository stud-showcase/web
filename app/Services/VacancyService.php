<?php

namespace App\Services;

use App\Repositories\VacancyRepository;
use App\Dto\VacancyDto;
use App\Models\Vacancy;
use Throwable;

class VacancyService
{
    public function __construct(
        private VacancyRepository $vacancyRepository
    ) {}

    public function getFormattedVacancies(array $filters = []): array
    {
        $paginator = $this->vacancyRepository->getFilteredVacancies($filters);

        $paginator->setCollection(
            $paginator->getCollection()->map(fn($vacancy) => VacancyDto::fromModel($vacancy)->toArray())
        );

        $vacanciesData = [
            'data' => $paginator->items(),
            'currentPage' => $paginator->currentPage(),
            'lastPage' => $paginator->lastPage(),
            'perPage' => $paginator->perPage(),
            'total' => $paginator->total(),
            'links' => $paginator->links()->elements[0] ?? [],
        ];

        return $vacanciesData;
    }

    public function createVacancy(int $projectId, array $data): Vacancy
    {
        try {
            $filteredData = array_filter($data, fn($key) => in_array($key, ['name', 'description']), ARRAY_FILTER_USE_KEY);
            return $this->vacancyRepository->create($projectId, $filteredData);
        } catch (Throwable $e) {
            throw new \Exception("Не удалось создать вакансию: {$e->getMessage()}", 0, $e);
        }
    }

    public function updateVacancy(int $vacancyId, array $data): Vacancy
    {
        try {
            $filteredData = array_filter($data, fn($key) => in_array($key, ['name', 'description']), ARRAY_FILTER_USE_KEY);
            return $this->vacancyRepository->update($vacancyId, $filteredData);
        } catch (Throwable $e) {
            throw new \Exception("Не удалось обновить вакансию: {$e->getMessage()}", 0, $e);
        }
    }

    public function deleteVacancy(int $vacancyId): void
    {
        try {
            $this->vacancyRepository->delete($vacancyId);
        } catch (Throwable $e) {
            throw new \Exception("Не удалось удалить вакансию: {$e->getMessage()}", 0, $e);
        }
    }

    public function getAdminVacancies(array $filters = []): array
    {
        $paginator = $this->vacancyRepository->getAdminVacancies($filters);
        $paginator->setCollection(
            $paginator->getCollection()->map(fn($vacancy) => VacancyDto::fromModel($vacancy)->toArrayForAdmin())
        );

        return [
            'data' => $paginator->items(),
            'currentPage' => $paginator->currentPage(),
            'lastPage' => $paginator->lastPage(),
            'perPage' => $paginator->perPage(),
            'total' => $paginator->total(),
            'links' => $paginator->links()->elements[0] ?? [],
        ];
    }
}
