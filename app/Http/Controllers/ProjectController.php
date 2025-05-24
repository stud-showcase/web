<?php

namespace App\Http\Controllers;

use App\Http\Requests\AcceptInviteRequest;
use App\Http\Requests\CreateProjectRequest;
use App\Http\Requests\CreateInviteRequest;
use App\Http\Requests\DeleteProjectFileRequest;
use App\Http\Requests\DeleteProjectMemberRequest;
use App\Http\Requests\RejectInviteRequest;
use App\Http\Requests\ShowControlPanelRequest;
use App\Http\Requests\UpdateProjectMemberRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Requests\UploadProjectFileRequest;
use App\Services\ProjectService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class ProjectController extends Controller
{
    public function __construct(
        private ProjectService $projectService
    ) {}

    public function index(Request $request): \Inertia\Response
    {
        $filters = $request->only([
            'status',
            'complexity',
            'tags',
            'isHiring',
            'search',
        ]);

        $projects = $this->projectService->getProjects($filters);

        return Inertia::render('user/Projects', [
            'projects' => $projects,
            'filters' => $filters,
            'availableFilters' => $this->projectService->getAvailableFilters(['tags']),
        ]);
    }

    public function getUserProjects(Request $request): \Inertia\Response
    {
        $filters = $request->only([
            'status',
            'complexity',
            'tags',
            'isHiring',
            'search',
        ]);

        $projects = $this->projectService->getUserProjects($filters);

        return Inertia::render('user/Projects', [
            'projects' => $projects,
            'filters' => $filters,
            'availableFilters' => $this->projectService->getAvailableFilters(['tags'], true),
        ]);
    }

    public function show(int|string $id): \Inertia\Response
    {
        $project = $this->projectService->getProjectById($id);
        return Inertia::render('user/Project', [
            'project' => $project,
        ]);
    }

    public function showControlPanel(ShowControlPanelRequest $request, int|string $id): \Inertia\Response
    {
        $project = $this->projectService->getProjectById($id);
        return Inertia::render('user/ProjectControlPanel', [
            'project' => $project,
        ]);
    }

    public function store(CreateProjectRequest $request): RedirectResponse
    {
        try {
            $data = $request->validated();
            $project = $this->projectService->createProject($data['taskId'], $data['projectName'], auth()->user());
            return redirect()->route('projects.show', $project->id)->with('success', 'Проект успешно создан.');
        } catch (Throwable $e) {
            Log::error("Ошибка создания проекта: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function update(UpdateProjectRequest $request, int|string $id): RedirectResponse
    {
        try {
            $project = $this->projectService->updateProject($id, $request->validated());
            return redirect()->route('projects.controlPanel.show', $project->id)->with('success', 'Проект успешно обновлён.');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления проекта [$id]: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function createInvite(CreateInviteRequest $request, int|string $id): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->projectService->createInvite(auth()->id(), $id, $data['vacancyId'] ?? null);
            return redirect()->route('projects.show', $id)->with('success', 'Приглашение создано.');
        } catch (Throwable $e) {
            Log::error("Ошибка создания приглашения для проекта [$id]: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function acceptInvite(AcceptInviteRequest $request, int|string $id): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->projectService->acceptInvite($data['inviteId']);
            return redirect()->route('projects.show', $id)->with('success', 'Приглашение принято.');
        } catch (Throwable $e) {
            Log::error("Ошибка принятия приглашения для проекта [$id]: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function rejectInvite(RejectInviteRequest $request, int|string $id): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->projectService->rejectInvite($data['inviteId']);
            return redirect()->route('projects.show', $id)->with('success', 'Приглашение отклонено.');
        } catch (Throwable $e) {
            Log::error("Ошибка отклонения приглашения для проекта [$id]: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function uploadFiles(UploadProjectFileRequest $request, int|string $id): RedirectResponse
    {
        try {
            $this->projectService->uploadFiles($id, $request->file('files'));
            return redirect()->route('projects.controlPanel.show', $id)->with('success', 'Файлы успешно загружены.');
        } catch (Throwable $e) {
            Log::error("Ошибка загрузки файлов для проекта [$id]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Не удалось загрузить файлы.']);
        }
    }

    public function deleteFile(DeleteProjectFileRequest $request, int|string $projectId, int|string $fileId): RedirectResponse
    {
        try {
            $this->projectService->deleteFile($projectId, $fileId);
            return redirect()->route('projects.controlPanel.show', $projectId)->with('success', 'Файл удалён.');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления файла [$fileId] для проекта [$projectId]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function updateMember(UpdateProjectMemberRequest $request, int $projectId, string $memberId): RedirectResponse
    {
        try {
            $this->projectService->updateMember($projectId, $memberId, $request->validated());
            return redirect()->route('projects.controlPanel.show', $projectId)->with('success', 'Участник обновлён.');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления участника [$memberId] для проекта [$projectId]: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function deleteMember(DeleteProjectMemberRequest $request, int $projectId, string $memberId): RedirectResponse
    {
        try {
            $this->projectService->deleteMember($projectId, $memberId);
            return redirect()->route('projects.controlPanel.show', $projectId)->with('success', 'Участник удалён.');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления участника [$memberId] для проекта [$projectId]: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
