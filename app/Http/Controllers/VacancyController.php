<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateVacancyRequest;
use App\Http\Requests\UpdateVacancyRequest;
use App\Models\Project;
use App\Models\Tag;
use App\Models\Vacancy;
use App\Services\VacancyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Throwable;

class VacancyController extends Controller
{
    public function __construct(
        private VacancyService $vacancyService
    ) {}

    public function index(Request $request): \Inertia\Response
    {
        $filters = $request->only(['tags', 'search']);
        $vacancies = $this->vacancyService->getFormattedVacancies($filters);
        return Inertia::render('user/Vacancies', [
            'vacancies' => $vacancies,
            'filters' => $filters,
            'availableFilters' => [
                'tags' => Tag::select('id', 'name')->get()->toArray(),
            ]
        ]);
    }

    public function store(CreateVacancyRequest $request)
    {
        try {
            $this->vacancyService->createVacancy(
                $request->route('id'),
                $request->validated()
            );

            return to_route('projects.show', $request->route('id'));
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(UpdateVacancyRequest $request)
    {
        try {
            $this->vacancyService->updateVacancy(
                $request->route('vacancyId'),
                $request->validated()
            );

            return to_route('projects.show', $request->route('projectId'));
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function delete(Request $request)
    {
        try {
            $projectId = $request->route('projectId');
            $vacancyId = $request->route('vacancyId');

            $project = Project::find($projectId);
            $vacancy = Vacancy::find($vacancyId);

            if (!$project || !$vacancy) {
                throw new \Exception('Проект или вакансия не найдены');
            }

            if ($vacancy->project_id != $project->id) {
                throw new \Exception('Вакансия не относится к указанному проекту');
            }

            $isMentor = $project->mentor_id == Auth::id();
            $isTeamCreator = $project->users()
                ->where('user_id', Auth::id())
                ->wherePivot('is_creator', true)
                ->exists();

            if (!$isMentor && !$isTeamCreator) {
                throw new \Exception('У вас нет прав для удаления вакансии');
            }

            $this->vacancyService->deleteVacancy($request->route('vacancyId'));

            return to_route('projects.show', $projectId);
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
