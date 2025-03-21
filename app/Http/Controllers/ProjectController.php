<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(): \Inertia\Response
    {
        $projects = Project::with(['task', 'status', 'mentor'])->get();
        return Inertia::render('user/Projects', [
            'projects' => $projects,
        ]);
    }

    public function show(int $id): \Inertia\Response
    {
        $project = Project::with(['task', 'status', 'mentor', 'users'])->findOrFail($id);
        return Inertia::render('user/Project', [
            'project' => $project,
        ]);
    }
}
