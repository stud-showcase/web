<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequestCreateRequest;
use App\Models\Tag;
use App\Models\Task;
use App\Models\TaskRequest;
use App\Models\TaskRequestFile;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $taskService
    ) {}

    public function index(Request $request): \Inertia\Response
    {
        $filters = $request->only([
            'complexity',
            'tags',
            'members',
            'customers',
            'deadline',
            'search',
        ]);

        $tasks = $this->taskService->getFilteredTasks($filters);

        return Inertia::render('user/TaskBank', [
            'tasks' => $tasks,
            'filters' => $filters,
            'availableFilters' => [
                'tags' => Tag::select('id', 'name')->get()->toArray(),
                'customers' => Task::select('customer')->distinct()->pluck('customer')->toArray(),
            ]
        ]);
    }


    public function show(int $id): \Inertia\Response
    {
        $task = $this->taskService->getFormattedTaskById($id);
        return Inertia::render('user/Task', [
            'task' => $task,
        ]);
    }

    public function createRequest(TaskRequestCreateRequest $request)
    {
        if ($request->input('withProject') && !Auth::check()) {
            return response()->json([
                'message' => 'Для заявки с проектом необходимо авторизоваться',
            ], 403);
        }

        $validated = $request->validated();

        $userId = Auth::check() ? Auth::id() : null;

        $taskRequest = TaskRequest::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'customer' => $validated['customer'],
            'customer_email' => $validated['customerEmail'],
            'customer_phone' => $validated['customerPhone'],
            'with_project' => $validated['withProject'],
            'project_name' => $validated['projectName'],
            'user_id' => $userId,
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $extension = $file->getClientOriginalExtension();
                $uniqueName = Str::uuid() . '.' . $extension;
                $directory = 'task_requests/' . $taskRequest->id;
                $path = $file->storeAs($directory, $uniqueName, 'public');

                TaskRequestFile::create([
                    'task_request_id' => $taskRequest->id,
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                ]);
            }
        }

        return response()->json(['message' => 'Заявка успешно создана']);
    }
}
