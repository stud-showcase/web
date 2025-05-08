<?php

namespace App\Http\Controllers;

use App\Http\Requests\AcceptInviteRequest;
use App\Http\Requests\CreateProjectRequest;
use App\Http\Requests\InviteRequestRequest;
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
            'userProjects',
        ]);

        $projects = $this->projectService->getFilteredProjects($filters);

        return Inertia::render('user/Projects', [
            'projects' => $projects['projects'],
            'userProjects' => $projects['userProjects'],
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

    public function store(CreateProjectRequest $request)
    {
        try {
            $project = $this->projectService->createProject(
                $request->input('taskId'),
                $request->input('projectName'),
                Auth::user()
            );

            return to_route('projects.show', $project->id);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function inviteRequest(InviteRequestRequest $request)
    {
        $validated = $request->validated();

        try {
            $this->projectService->createInvite(
                Auth::id(),
                $validated['project_id'],
                $validated['vacancy_id'] ?? null
            );

            return to_route('projects.show', $validated['project_id']);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function acceptInvite(AcceptInviteRequest $request)
    {
        $validated = $request->validated();

        try {
            $projectId = $this->projectService->acceptInvite($validated['invite_id']);
            return to_route('projects.show', $projectId);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
