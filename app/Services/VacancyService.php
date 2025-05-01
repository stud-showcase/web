<?php

namespace App\Services;

use App\Repositories\VacancyRepository;
use App\Dto\VacancyDto;
use Illuminate\Support\Collection;

class VacancyService
{
    public function __construct(
        private VacancyRepository $vacancyRepository
    ) {}

    public function getFormattedVacancies(): Collection
    {
        return $this->vacancyRepository->getAllWithRelations()
            ->map(fn($vacancy) => VacancyDto::fromModel($vacancy)->toArray());
    }
}
