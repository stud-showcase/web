<?php

namespace App\Services;

use App\Repositories\VacancyRepository;
use App\Dto\VacancyDto;

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
            'current_page' => $paginator->currentPage(),
            'last_page' => $paginator->lastPage(),
            'per_page' => $paginator->perPage(),
            'total' => $paginator->total(),
            'links' => $paginator->links()->elements[0] ?? [],
        ];

        return $vacanciesData;
    }
}
