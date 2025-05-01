<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Services\VacancyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VacancyController extends Controller
{
    public function __construct(
        private VacancyService $vacancyService
    ) {}

    public function index(Request $request): \Inertia\Response
    {
        $filters = $request->only(['tags', 'search']);
        $vacancies = $this->vacancyService->getFormattedVacancies($filters);
        return Inertia::render('user/Vacancies', [
            'vacancies' => $vacancies,
            'filters' => $filters,
            'availableFilters' => [
                'tags' => Tag::select('id', 'name')->get()->toArray(),
            ]
        ]);
    }
}
