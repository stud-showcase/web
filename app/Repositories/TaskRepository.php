<?php

namespace App\Repositories;

use App\Models\Task;
use App\Models\TaskRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
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

    public function getFilteredTaskRequests(array $filters, bool $forUser = false): LengthAwarePaginator
    {
        $cacheKey = 'task_requests:filtered:' . md5(json_encode($filters) . ':' . ($forUser ? 'user:' . Auth::id() : 'all')) . ':page_' . request()->query('page', 1);
        try {
            return Cache::tags(['task_requests'])->remember($cacheKey, 300, function () use ($filters, $forUser) {
                return TaskRequest::query()
                    ->with(['user', 'mentor'])
                    ->when(
                        !empty($filters['search']),
                        fn($q) => $q->where('title', 'LIKE', '%' . $filters['search'] . '%')
                            ->orWhere('customer', 'LIKE', '%' . $filters['search'] . '%')
                            ->orWhere('customer_email', 'LIKE', '%' . $filters['search'] . '%')
                    )
                    ->when(
                        $forUser,
                        fn($q) => $q->whereNotNull('mentor_id')
                            ->where('mentor_id', Auth::id())
                    )
                    ->paginate(10)
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
                return Task::query()
                    ->with(['complexity'])
                    ->when(
                        !empty($filters['search']),
                        fn($q) => $q->where('name', 'LIKE', '%' . $filters['search'] . '%')
                            ->orWhere('description', 'LIKE', '%' . $filters['search'] . '%')
                    )
                    ->paginate(10)
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
}
