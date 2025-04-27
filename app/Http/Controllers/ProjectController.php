<?php

namespace App\Http\Controllers;

use App\Services\ProjectService;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function __construct(
        private ProjectService $projectService
    ) {}

    public function index(): \Inertia\Response
    {
        $projects = $this->projectService->getFormattedProjects();
        return Inertia::render('user/Projects', [
            'projects' => $projects
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
