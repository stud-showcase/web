<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateVacancyRequest;
use App\Http\Requests\DeleteVacancyRequest;
use App\Http\Requests\UpdateVacancyRequest;
use App\Models\Tag;
use App\Services\VacancyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

    public function store(CreateVacancyRequest $request): RedirectResponse
    {
        try {
            $this->vacancyService->createVacancy($request->route('id'), $request->validated());
            return redirect()->route('projects.controlPanel.show', $request->route('id'))->with('success', 'Вакансия создана.');
        } catch (Throwable $e) {
            Log::error("Ошибка создания вакансии для проекта [{$request->route('id')}]: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function update(UpdateVacancyRequest $request, int|string $projectId, int|string $vacancyId): RedirectResponse
    {
        try {
            $this->vacancyService->updateVacancy($vacancyId, $request->validated());
            return redirect()->route('projects.show', $projectId)->with('success', 'Вакансия обновлена.');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления вакансии [$vacancyId] для проекта [$projectId]: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function delete(DeleteVacancyRequest $request, int|string $projectId, int|string $vacancyId): RedirectResponse
    {
        try {
            $this->vacancyService->deleteVacancy($vacancyId);
            return redirect()->route('projects.controlPanel.show', $projectId)->with('success', 'Вакансия удалена.');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления вакансии [$vacancyId] для проекта [$projectId]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
