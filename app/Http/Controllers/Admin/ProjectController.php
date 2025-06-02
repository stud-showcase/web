<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateProjectRequest as AdminCreateProjectRequest;
use App\Http\Requests\Admin\DeleteProjectFileRequest as AdminDeleteProjectFileRequest;
use App\Http\Requests\Admin\DeleteProjectMemberRequest as AdminDeleteProjectMemberRequest;
use App\Http\Requests\Admin\DeleteProjectRequest as AdminDeleteProjectRequest;
use App\Http\Requests\Admin\RemoveProjectMentorRequest as AdminRemoveProjectMentorRequest;
use App\Http\Requests\Admin\SetProjectMentorRequest as AdminSetProjectMentorRequest;
use App\Http\Requests\Admin\UpdateProjectMemberRequest as AdminUpdateProjectMemberRequest;
use App\Http\Requests\Admin\UpdateProjectRequest as AdminUpdateProjectRequest;
use App\Http\Requests\Admin\UpdateSettingsRequest as AdminUpdateSettingsRequest;
use App\Http\Requests\Admin\UploadProjectFileRequest as AdminUploadProjectFileRequest;
use App\Services\ProjectService;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ProjectController extends Controller
{
    public function __construct(
        private ProjectService $projectService,
        private UserService $userService,
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
        $users = $this->userService->getPrivilegedUsers();
        return Inertia::render('admin/Project', [
            'project' => $project,
            'users' => $users,
        ]);
    }

    public function store(AdminCreateProjectRequest $request): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->projectService->createProject($data['taskId'], $data['projectName'], auth()->user());
            return redirect()->route('admin.projects.index')->with('success', 'Проект успешно создан.');
        } catch (Throwable $e) {
            Log::error("Ошибка создания проекта: " . $e->getMessage(), ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
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

    public function setMentor(AdminSetProjectMentorRequest $request, int $id): RedirectResponse
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

    public function removeMentor(AdminRemoveProjectMentorRequest $request, int $id): RedirectResponse
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

    public function updateSettings(AdminUpdateSettingsRequest $request)
    {
        try {
            $this->projectService->updateSettings($request->validated());
            return redirect()->route('admin.projects.settings')->with('success', 'Настройки успешно обновлены');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления настроек: {$e->getMessage()}");
            return redirect()->back()->withErrors(['error' => 'Не удалось обновить настройки']);
        }
    }

    public function uploadFiles(AdminUploadProjectFileRequest $request, int $id): RedirectResponse
    {
        try {
            $this->projectService->uploadFiles($id, $request->file('files'));
            return redirect()->route('admin.projects.show', $id)->with('success', 'Файлы успешно загружены');
        } catch (Throwable $e) {
            Log::error("Ошибка загрузки файлов для проекта [$id]: {$e->getMessage()}");
            return redirect()->back()->withErrors(['error' => 'Не удалось загрузить файлы']);
        }
    }

    public function deleteFile(AdminDeleteProjectFileRequest $request, int $projectId, int $fileId): RedirectResponse
    {
        try {
            $this->projectService->deleteFile($projectId, $fileId);
            return redirect()->route('admin.projects.show', $projectId)->with('success', 'Файл удалён');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления файла [$fileId] для проекта [$projectId]: {$e->getMessage()}");
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function updateMember(AdminUpdateProjectMemberRequest $request, int $projectId, string $memberId): RedirectResponse
    {
        try {
            $this->projectService->updateMember($projectId, $memberId, $request->validated());
            return redirect()->route('admin.projects.show', $projectId)->with('success', 'Участник обновлён');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления участника [$memberId] для проекта [$projectId]: {$e->getMessage()}", ['data' => $request->validated()]);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function deleteMember(AdminDeleteProjectMemberRequest $request, int $projectId, string $memberId): RedirectResponse
    {
        try {
            $this->projectService->deleteMember($projectId, $memberId);
            return redirect()->route('admin.projects.show', $projectId)->with('success', 'Участник удалён');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления участника [$memberId] из проекта [$projectId]: {$e->getMessage()}");
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
