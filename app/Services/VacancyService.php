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
            'currentPage' => $paginator->currentPage(),
            'lastPage' => $paginator->lastPage(),
            'perPage' => $paginator->perPage(),
            'total' => $paginator->total(),
            'links' => $paginator->links()->elements[0] ?? [],
        ];

        return $vacanciesData;
    }
}
