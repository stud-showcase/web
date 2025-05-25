<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\VacancyService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VacancyController extends Controller
{
    public function __construct(
        private VacancyService $vacancyService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search']);
        $vacancies = $this->vacancyService->getAdminVacancies($filters);
        return Inertia::render('admin/Vacancies', [
            'vacancies' => $vacancies,
            'filters' => $filters,
        ]);
    }
}
