<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateVacancyRequest;
use App\Http\Requests\DeleteVacancyRequest;
use App\Http\Requests\UpdateVacancyRequest;
use App\Models\Tag;
use App\Services\VacancyService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

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

    public function store(CreateVacancyRequest $request)
    {
        try {
            $this->vacancyService->createVacancy(
                $request->route('id'),
                $request->validated()
            );

            return to_route('projects.show', $request->route('id'));
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(UpdateVacancyRequest $request, int|string $projectId, int|string $vacancyId)
    {
        try {
            $this->vacancyService->updateVacancy(
                $vacancyId,
                $request->validated()
            );

            return to_route('projects.show', $projectId);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function delete(DeleteVacancyRequest $request, int|string $projectId, int|string $vacancyId)
    {
        try {
            $this->vacancyService->deleteVacancy($vacancyId);
            return to_route('projects.show', $projectId);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
