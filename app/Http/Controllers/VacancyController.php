<?php

namespace App\Http\Controllers;

use App\Services\VacancyService;
use Inertia\Inertia;

class VacancyController extends Controller
{
    public function __construct(
        private VacancyService $vacancyService
    ) {}

    public function index()
    {
        $vacancies = $this->vacancyService->getFormattedVacancies();
        return Inertia::render('user/Vacancies', [
            'vacancies' => $vacancies
        ]);
    }
}
