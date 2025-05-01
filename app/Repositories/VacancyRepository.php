<?php

namespace App\Repositories;

use App\Models\Vacancy;

class VacancyRepository
{
    public function getAllWithRelations()
    {
        return Vacancy::with(['project.task'])->get();
    }
}
