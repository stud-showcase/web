<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateVacancyRequest;
use App\Http\Requests\DeleteVacancyRequest;
use App\Http\Requests\UpdateVacancyRequest;
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
            'availableFilters' => $this->vacancyService->getAvailableFilters(['tags']),
        ]);
    }

    public function store(CreateVacancyRequest $request, int $id): RedirectResponse
    {
        try {
            $this->vacancyService->createVacancy($id, $request->validated());
            return redirect()->route('projects.controlPanel.show', $id)->with('success', 'Вакансия создана.');
        } catch (Throwable $e) {
            Log::error("Ошибка создания вакансии для проекта [$id]: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function update(UpdateVacancyRequest $request, int $projectId, int $vacancyId): RedirectResponse
    {
        try {
            $this->vacancyService->updateVacancy($vacancyId, $request->validated());
            return redirect()->route('projects.controlPanel.show', $projectId)->with('success', 'Вакансия обновлена.');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления вакансии [$vacancyId] для проекта [$projectId]: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy(DeleteVacancyRequest $request, int $projectId, int $vacancyId): RedirectResponse
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
