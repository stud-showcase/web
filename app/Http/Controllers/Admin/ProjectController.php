<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminDeleteProjectRequest;
use App\Http\Requests\AdminUpdateProjectRequest;
use App\Http\Requests\RemoveProjectMentorRequest;
use App\Http\Requests\SetProjectMentorRequest;
use App\Http\Requests\UpdateSettingsRequest;
use App\Services\ProjectService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ProjectController extends Controller
{
    public function __construct(
        private ProjectService $projectService
    ) {}

    public function index(Request $request): \Inertia\Response
    {
        $filters = $request->only([
            'search',
            'status',
            'isHiring',
            'perPage',
        ]);
        $projects = $this->projectService->getAdminProjects($filters);
        return Inertia::render('admin/Projects', [
            'projects' => $projects,
            'filters' => $filters,
        ]);
    }

    public function show(int $id): Response
    {
        $project = $this->projectService->getProjectById($id);
        return Inertia::render('admin/Project', [
            'project' => $project,
            'availableFilters' => $this->projectService->getAvailableFilters(['tags']),
        ]);
    }

    public function update(AdminUpdateProjectRequest $request, int $id): RedirectResponse
    {
        try {
            $project = $this->projectService->updateProject($id, $request->validated());
            return redirect()->route('admin.projects.show', $project->id)->with('success', 'Проект успешно обновлён.');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления проекта [$id]: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy(AdminDeleteProjectRequest $request, int $id): RedirectResponse
    {
        try {
            $this->projectService->deleteProject($id);
            return redirect()->route('admin.projects.index')->with('success', 'Проект успешно удалён.');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления проекта [$id]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function setMentor(SetProjectMentorRequest $request, int $id): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->projectService->setMentor($id, $data['mentorId']);
            return redirect()->route('admin.projects.show', $id)->with('success', 'Ментор успешно назначен.');
        } catch (Throwable $e) {
            Log::error("Ошибка установки ментора для проекта [$id]: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function removeMentor(RemoveProjectMentorRequest $request, int $id): RedirectResponse
    {
        try {
            $this->projectService->removeMentor($id);
            return redirect()->route('admin.projects.show', $id)->with('success', 'Ментор успешно удалён.');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления ментора из проекта [$id]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function indexSettings(): \Inertia\Response
    {
        $settings = $this->projectService->getSettings();
        return Inertia::render('admin/ProjectsSettings', [
            'settings' => $settings,
        ]);
    }

    public function updateSettings(UpdateSettingsRequest $request)
    {
        try {
            $this->projectService->updateSettings($request->validated());
            redirect()->route('admin.projects.settings')->with('success', 'Настройки успешно обновлены');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления настроек: {$e->getMessage()}");
            return redirect()->back()->withErrors(['error' => 'Не удалось обновить настройки']);
        }
    }
}
