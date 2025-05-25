<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateVacancyRequest;
use App\Http\Requests\Admin\DeleteVacancyRequest;
use App\Http\Requests\Admin\UpdateVacancyRequest;
use App\Services\VacancyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Throwable;

class VacancyController extends Controller
{
    public function __construct(
        private VacancyService $vacancyService
    ) {}

    public function store(CreateVacancyRequest $request, int $id): RedirectResponse
    {
        try {
            $this->vacancyService->createVacancy($id, $request->validated());
            return redirect()->route('admin.projects.show', $id)->with('success', 'Вакансия создана');
        } catch (Throwable $e) {
            Log::error("Ошибка создания вакансии для проекта [{$request->route('id')}]: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function update(UpdateVacancyRequest $request, int $projectId, int $vacancyId): RedirectResponse
    {
        try {
            $this->vacancyService->updateVacancy($vacancyId, $request->validated());
            return redirect()->route('admin.projects.show', $projectId)->with('success', 'Вакансия обновлена');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления вакансии [$vacancyId] для проекта [$projectId]: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy(DeleteVacancyRequest $request, int $projectId, int $vacancyId): RedirectResponse
    {
        try {
            $this->vacancyService->deleteVacancy($vacancyId);
            return redirect()->route('admin.projects.show', $projectId)->with('success', 'Вакансия удалена');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления вакансии [$vacancyId] для проекта [$projectId]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
