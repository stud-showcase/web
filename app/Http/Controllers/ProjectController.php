<?php

namespace App\Http\Controllers;

use App\Models\Tag;
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
}
