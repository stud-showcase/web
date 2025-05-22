<?php

namespace App\Repositories;

use App\Models\Project;
use App\Models\ProjectStatus;
use App\Models\Task;
use App\Models\TaskRequest;
use App\Models\UserProject;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

class TaskRepository
{
    public function __construct(
        private FileRepository $fileRepository
    ) {}

    public function getFilteredTasks(array $filters): LengthAwarePaginator
    {
        $cacheKey = 'tasks:filtered:' . md5(json_encode($filters)) . ':page_' . request()->query('page', 1);
        try {
            return Cache::tags(['tasks'])->remember($cacheKey, 300, function () use ($filters) {
                return Task::query()
                    ->with([
                        'complexity',
                        'tags',
                        'projects.users' => fn($q) => $q->select('users.id'),
                        'files',
                    ])
                    ->when(
                        isset($filters['complexity']) && is_array($filters['complexity']) && count($filters['complexity']) > 0,
                        fn($q) => $q->whereIn('complexity_id', $filters['complexity'])
                    )
                    ->when(
                        isset($filters['tags']) && is_array($filters['tags']) && count($filters['tags']) > 0,
                        fn($q) => $q->whereHas('tags', fn($q2) => $q2->whereIn('tags.id', $filters['tags']))
                    )
                    ->when(
                        isset($filters['members']),
                        fn($q) => $q->where('max_members', '<=', (int)$filters['members'])
                    )
                    ->when(
                        isset($filters['customers']) && is_array($filters['customers']) && count($filters['customers']) > 0,
                        fn($q) => $q->whereIn('customer', $filters['customers'])
                    )
                    ->when(
                        isset($filters['deadline']),
                        fn($q) => $q->where('deadline', '>=', $filters['deadline'])
                    )
                    ->when(
                        !empty($filters['search']),
                        fn($q) => $q->where('title', 'LIKE', '%' . $filters['search'] . '%')
                    )
                    ->paginate(10)
                    ->withQueryString();
            });
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить задания: {$e->getMessage()}", 0, $e);
        }
    }

    public function getByIdWithRelations(int $id): Task
    {
        $cacheKey = "task:{$id}";
        try {
            return Cache::tags(['tasks'])->remember($cacheKey, 3600, function () use ($id) {
                return Task::with([
                    'complexity',
                    'tags',
                    'files',
                    'projects' => fn($query) => $query->with([
                        'status',
                        'users' => fn($q) => $q->select('users.id'),
                    ]),
                ])->findOrFail($id);
            });
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить задание: {$e->getMessage()}", 0, $e);
        }
    }

    public function getTaskRequestById(int|string $id): TaskRequest
    {
        $cacheKey = "task_request:{$id}";
        try {
            return Cache::tags(['task_requests'])->remember($cacheKey, 3600, function () use ($id) {
                return TaskRequest::with(['user', 'responsibleUser', 'files'])
                    ->findOrFail($id);
            });
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить заявку: {$e->getMessage()}", 0, $e);
        }
    }

    public function getFilteredTaskRequests(array $filters, bool $forUser = false): LengthAwarePaginator
    {
        $cacheKey = 'task_requests:filtered:' . md5(json_encode($filters) . ':' . ($forUser ? 'user:' . Auth::id() : 'all')) . ':page_' . request()->query('page', 1);
        try {
            return Cache::tags(['task_requests'])->remember($cacheKey, 300, function () use ($filters, $forUser) {
                $perPage = isset($filters['perPage']) && is_numeric($filters['perPage']) && $filters['perPage'] > 0
                    ? (int)$filters['perPage']
                    : 20;
                return TaskRequest::query()
                    ->with(['user', 'responsibleUser'])
                    ->when(
                        !empty($filters['search']),
                        fn($q) => $q->where('title', 'LIKE', '%' . $filters['search'] . '%')
                            ->orWhere('customer', 'LIKE', '%' . $filters['search'] . '%')
                            ->orWhere('customer_email', 'LIKE', '%' . $filters['search'] . '%')
                    )
                    ->when(
                        $forUser,
                        fn($q) => $q->whereNotNull('responsible_user_id')
                            ->where('responsible_user_id', Auth::id())
                    )
                    ->when(
                        isset($filters['customers']) && is_array($filters['customers']) && count($filters['customers']) > 0,
                        fn($q) => $q->whereIn('customer', $filters['customers'])
                    )
                    ->when(
                        !empty($filters['withProject']),
                        fn($q) => $q->where('with_project', 1)
                    )
                    ->paginate($perPage)
                    ->withQueryString();
            });
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить заявки: {$e->getMessage()}", 0, $e);
        }
    }

    public function getAdminTasks(array $filters): LengthAwarePaginator
    {
        $cacheKey = 'admin_tasks:filtered:' . md5(json_encode($filters)) . ':page_' . request()->query('page', 1);
        try {
            return Cache::tags(['tasks'])->remember($cacheKey, 300, function () use ($filters) {
                $perPage = isset($filters['perPage']) && is_numeric($filters['perPage']) && $filters['perPage'] > 0
                    ? (int)$filters['perPage']
                    : 20;
                return Task::query()
                    ->with(['complexity'])
                    ->when(
                        !empty($filters['search']),
                        fn($q) => $q->where('name', 'LIKE', '%' . $filters['search'] . '%')
                            ->orWhere('description', 'LIKE', '%' . $filters['search'] . '%')
                    )
                    ->when(
                        isset($filters['complexity']) && is_array($filters['complexity']) && count($filters['complexity']) > 0,
                        fn($q) => $q->whereIn('complexity_id', $filters['complexity'])
                    )
                    ->when(
                        isset($filters['customers']) && is_array($filters['customers']) && count($filters['customers']) > 0,
                        fn($q) => $q->whereIn('customer', $filters['customers'])
                    )
                    ->paginate($perPage)
                    ->withQueryString();
            });
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить задания: {$e->getMessage()}", 0, $e);
        }
    }

    public function createRequest(array $data): int
    {
        try {
            return DB::transaction(function () use ($data) {
                $taskRequest = TaskRequest::create([
                    'title' => $data['title'],
                    'description' => $data['description'],
                    'customer' => $data['customer'],
                    'customer_email' => $data['customerEmail'],
                    'customer_phone' => $data['customerPhone'] ?? null,
                    'with_project' => $data['withProject'] ?? false,
                    'project_name' => $data['projectName'] ?? null,
                    'user_id' => Auth::check() ? Auth::id() : null,
                ]);

                Cache::tags(['task_requests'])->flush();

                return $taskRequest->id;
            });
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось создать заявку: {$e->getMessage()}", 0, $e);
        }
    }

    public function uploadFiles(int $taskRequestId, array $files): void
    {
        try {
            DB::transaction(function () use ($taskRequestId, $files) {
                $fileData = [];
                foreach ($files as $file) {
                    if (!$file instanceof UploadedFile) {
                        throw new \InvalidArgumentException('Недопустимый тип файла');
                    }

                    $extension = $file->getClientOriginalExtension();
                    $uniqueName = Str::uuid() . '.' . $extension;
                    $directory = 'task_request_files/' . $taskRequestId;
                    $path = $file->storeAs($directory, $uniqueName, 'public');

                    $fileData[] = [
                        'name' => $file->getClientOriginalName(),
                        'path' => str_replace('public/', '', $path),
                    ];
                }

                foreach ($fileData as $file) {
                    $this->fileRepository->saveFile($file, 'task_request', $taskRequestId);
                }
            });

            Cache::tags(['task_requests'])->forget("task_request:{$taskRequestId}");
            Cache::tags(['task_requests'])->forget('task_requests:list');
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось загрузить файлы: {$e->getMessage()}", 0, $e);
        }
    }

    public function deleteTaskRequest(int $id): void
    {
        try {
            DB::transaction(function () use ($id) {
                $taskRequest = TaskRequest::findOrFail($id);
                $files = $taskRequest->files;

                foreach ($files as $file) {
                    Storage::disk('public')->delete($file->path);
                    $file->delete();
                }

                $taskRequest->delete();

                Cache::tags(['task_requests'])->flush();
            });
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось удалить заявку: {$e->getMessage()}", 0, $e);
        }
    }

    public function approveTaskRequest(int $id, array $data, array $files = []): int
    {
        try {
            return DB::transaction(function () use ($id, $data, $files) {
                $taskRequest = TaskRequest::with('files')->findOrFail($id);

                $task = Task::create([
                    'title' => $data['title'] ?? $taskRequest->title,
                    'description' => $data['description'] ?? $taskRequest->description,
                    'customer' => $data['customer'] ?? $taskRequest->customer,
                    'customer_email' => $data['customerEmail'] ?? $taskRequest->customer_email,
                    'customer_phone' => $data['customerPhone'] ?? $taskRequest->customer_phone,
                    'max_projects' => $data['maxProjects'],
                    'max_members' => $data['maxMembers'],
                    'deadline' => $data['deadline'],
                    'complexity_id' => $data['complexityId'],
                ]);

                foreach ($taskRequest->files as $file) {
                    $newPath = 'task_files/' . $task->id . '/' . basename($file->path);
                    Storage::disk('public')->move($file->path, $newPath);
                    $this->fileRepository->saveFile([
                        'name' => $file->name,
                        'path' => $newPath,
                    ], 'task', $task->id);
                }

                foreach ($files as $file) {
                    if (!$file instanceof UploadedFile) {
                        throw new \InvalidArgumentException('Недопустимый тип файла');
                    }
                    $extension = $file->getClientOriginalExtension();
                    $uniqueName = Str::uuid() . '.' . $extension;
                    $directory = 'task_files/' . $task->id;
                    $path = $file->storeAs($directory, $uniqueName, 'public');
                    $this->fileRepository->saveFile([
                        'name' => $file->getClientOriginalName(),
                        'path' => str_replace('public/', '', $path),
                    ], 'task', $task->id);
                }

                if ($taskRequest->with_project || ($data['withProject'] ?? false)) {
                    $project = Project::create([
                        'task_id' => $task->id,
                        'status_id' => ProjectStatus::STATUS_WAITING,
                        'name' => $data['projectName'] ?? $taskRequest->project_name,
                    ]);

                    UserProject::create([
                        'user_id' => $taskRequest->user_id,
                        'project_id' => $project->id,
                        'is_creator' => true,
                    ]);
                }

                foreach ($taskRequest->files as $file) {
                    Storage::disk('public')->delete($file->path);
                    $file->delete();
                }

                $taskRequest->delete();

                Cache::tags(['task_requests', 'tasks'])->flush();

                return $task->id;
            });
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось одобрить заявку: {$e->getMessage()}", 0, $e);
        }
    }

    public function updateTaskRequestResponsibleUser(int $id, int $responsibleUserId): void
    {
        try {
            DB::transaction(function () use ($id, $responsibleUserId) {
                $taskRequest = TaskRequest::findOrFail($id);
                $taskRequest->update(['responsible_user_id' => $responsibleUserId]);

                Cache::tags(['task_requests'])->flush();
            });
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось обновить ответственного: {$e->getMessage()}", 0, $e);
        }
    }
}
