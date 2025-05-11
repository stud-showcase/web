<?php

namespace App\Http\Controllers;

use App\Http\Requests\AcceptInviteRequest;
use App\Http\Requests\CreateProjectRequest;
use App\Http\Requests\CreateInviteRequest;
use App\Http\Requests\DeleteProjectFileRequest;
use App\Http\Requests\DeleteProjectMemberRequest;
use App\Http\Requests\ShowControlPanelRequest;
use App\Http\Requests\UpdateProjectMemberRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Requests\UploadProjectFileRequest;
use App\Models\Tag;
use App\Services\ProjectService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            'members',
            'search',
        ]);

        $projects = $this->projectService->getFilteredProjects($filters);

        return Inertia::render('user/Projects', [
            'projects' => $projects,
            'filters' => $filters,
            'availableFilters' => [
                'tags' => Tag::select('id', 'name')->get()->toArray(),
            ]
        ]);
    }

    public function getUserProjects(Request $request): \Inertia\Response
    {
        $filters = $request->only([
            'status',
            'complexity',
            'tags',
            'isHiring',
            'members',
            'search',
        ]);

        $projects = $this->projectService->getFilteredUserProjects($filters);

        return Inertia::render('user/Projects', [
            'projects' => $projects,
            'filters' => $filters,
            'availableFilters' => [
                'tags' => Tag::select('id', 'name')->get()->toArray(),
            ]
        ]);
    }

    public function show(int|string $id): \Inertia\Response
    {
        $project = $this->projectService->getFormattedProjectById($id);
        return Inertia::render('user/Project', [
            'project' => $project,
        ]);
    }

    public function showControlPanel(ShowControlPanelRequest $request, int|string $id): \Inertia\Response
    {
        $project = $this->projectService->getFormattedProjectById($id);
        return Inertia::render('user/ProjectControlPanel', [
            'project' => $project,
        ]);
    }

    public function store(CreateProjectRequest $request)
    {
        $validated = $request->validated();

        try {
            $project = $this->projectService->createProject(
                $validated['taskId'],
                $validated['projectName'],
                Auth::user()
            );

            return to_route('projects.show', $project->id);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(UpdateProjectRequest $request, int|string $id)
    {
        try {
            $project = $this->projectService->updateProject(
                $id,
                $request->validated()
            );

            return to_route('projects.show', $project->id);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function createInvite(CreateInviteRequest $request, int|string $id)
    {
        $validated = $request->validated();

        try {
            $this->projectService->createInvite(
                Auth::id(),
                $id,
                $validated['vacancyId'] ?? null
            );

            return to_route('projects.show', $id);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function acceptInvite(AcceptInviteRequest $request, int|string $id)
    {
        $validated = $request->validated();

        try {
            $this->projectService->acceptInvite($validated['inviteId']);
            return to_route('projects.show', $id);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function uploadFiles(UploadProjectFileRequest $request, int|string $id)
    {
        try {
            $this->projectService->uploadFiles(
                $id,
                $request->file('files')
            );

            return to_route('projects.show', $id);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function deleteFile(DeleteProjectFileRequest $request, int|string $projectId, int|string $fileId)
    {
        try {
            $this->projectService->deleteFile($projectId, $fileId);
            return to_route('projects.show', $projectId);
        } catch (Throwable $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function updateMember(UpdateProjectMemberRequest $request, int $projectId, string $memberId)
    {
        $validated = $request->validated();

        try {
            $this->projectService->updateMember($projectId, $memberId, $validated);
            return to_route('projects.show', $projectId);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function deleteMember(DeleteProjectMemberRequest $request, int $projectId, string $memberId)
    {
        try {
            $this->projectService->deleteMember($projectId, $memberId);
            return to_route('projects.show', $projectId);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
