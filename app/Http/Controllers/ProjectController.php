<?php

namespace App\Http\Controllers;

use App\Services\ProjectService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function __construct(
        private ProjectService $projectService
    ) {}

    public function index(Request $request): \Inertia\Response
    {
        $filters = $request->only(['status', 'complexity', 'tags', 'isHiring']);
        $projects = $this->projectService->getFilteredProjects($filters);
        return Inertia::render('user/Projects', [
            'projects' => $projects,
            'filters' => $filters,
        ]);
    }

    public function show(int $id): \Inertia\Response
    {
        $project = $this->projectService->getFormattedProjectById($id);
        return Inertia::render('user/Project', [
            'project' => $project,
        ]);
    }
}
