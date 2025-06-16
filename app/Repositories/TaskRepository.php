<?php

namespace App\Repositories;

use App\Interfaces\Repositories\TaskRepositoryInterface;
use App\Models\Customer;
use App\Models\Project;
use App\Models\ProjectStatus;
use App\Models\Task;
use App\Models\TaskFile;
use App\Models\TaskRequest;
use App\Models\UserProject;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

class TaskRepository implements TaskRepositoryInterface
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
                        'customer',
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
                        fn($q) => $q->whereHas('customer', fn($q2) => $q2->whereIn('customers.name', $filters['customers']))
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
        } catch (ModelNotFoundException $e) {
            throw $e;
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
                    'customer',
                    'projects' => fn($query) => $query->with([
                        'status',
                        'users' => fn($q) => $q->select('users.id'),
                    ]),
                ])->findOrFail($id);
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить задание: {$e->getMessage()}", 0, $e);
        }
    }

    public function getTaskForAdmin(int $id): Task
    {
        $cacheKey = "task_admin:{$id}";
        try {
            return Cache::tags(['tasks'])->remember($cacheKey, 3600, function () use ($id) {
                return Task::with([
                    'complexity',
                    'tags',
                    'files',
                    'customer',
                ])->findOrFail($id);
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить задание: {$e->getMessage()}", 0, $e);
        }
    }

    public function getTaskRequestById(int $id): TaskRequest
    {
        $cacheKey = "task_request:{$id}";
        try {
            return Cache::tags(['task_requests'])->remember($cacheKey, 3600, function () use ($id) {
                return TaskRequest::with(['user', 'responsibleUser', 'files', 'customer'])
                    ->findOrFail($id);
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
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
                    ->with(['user', 'responsibleUser', 'customer'])
                    ->when(
                        !empty($filters['search']),
                        fn($q) => $q->where('title', 'LIKE', '%' . $filters['search'] . '%')
                            ->orWhereHas('customer', fn($q2) => $q2->where('name', 'LIKE', '%' . $filters['search'] . '%')
                                ->orWhere('email', 'LIKE', '%' . $filters['search'] . '%'))
                    )
                    ->when(
                        $forUser,
                        fn($q) => $q->whereNotNull('responsible_user_id')
                            ->where('responsible_user_id', Auth::id())
                    )
                    ->when(
                        isset($filters['customers']) && is_array($filters['customers']) && count($filters['customers']) > 0,
                        fn($q) => $q->whereHas('customer', fn($q2) => $q2->whereIn('customers.name', $filters['customers']))
                    )
                    ->when(
                        isset($filters['withProject']),
                        fn($q) => $q->where('with_project', $filters['withProject'])
                    )
                    ->paginate($perPage)
                    ->withQueryString();
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
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
                    ->with(['complexity', 'customer'])
                    ->when(
                        !empty($filters['search']),
                        fn($q) => $q->where('title', 'LIKE', '%' . $filters['search'] . '%')
                            ->orWhere('description', 'LIKE', '%' . $filters['search'] . '%')
                    )
                    ->when(
                        isset($filters['complexity']) && is_array($filters['complexity']) && count($filters['complexity']) > 0,
                        fn($q) => $q->whereIn('complexity_id', $filters['complexity'])
                    )
                    ->when(
                        isset($filters['customers']) && is_array($filters['customers']) && count($filters['customers']) > 0,
                        fn($q) => $q->whereHas('customer', fn($q2) => $q2->whereIn('customers.name', $filters['customers']))
                    )
                    ->paginate($perPage)
                    ->withQueryString();
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить задания: {$e->getMessage()}", 0, $e);
        }
    }

    public function createApplication(array $data): int
    {
        try {
            return DB::transaction(function () use ($data) {
                $customer = Customer::firstOrCreate([
                    'name' => $data['customer'],
                    'email' => $data['customerEmail'],
                    'phone' => $data['customerPhone'] ?? null,
                ]);

                $taskRequest = TaskRequest::create([
                    'title' => $data['title'],
                    'description' => $data['description'],
                    'customer_id' => $customer->id,
                    'with_project' => $data['withProject'] ?? false,
                    'project_name' => $data['projectName'] ?? null,
                    'user_id' => Auth::check() ? Auth::id() : null,
                ]);

                Cache::tags(['task_requests', 'customers'])->flush();

                return $taskRequest->id;
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
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
                    $directory = 'task_requests_files/' . $taskRequestId;
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
        } catch (ModelNotFoundException $e) {
            throw $e;
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

                Cache::tags(['task_requests', 'customers'])->flush();
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось удалить заявку: {$e->getMessage()}", 0, $e);
        }
    }

    public function approveTaskRequest(int $id, array $data, array $files = []): int
    {
        try {
            return DB::transaction(function () use ($id, $data, $files) {
                $taskRequest = TaskRequest::with(['files', 'customer'])->findOrFail($id);

                $customer = Customer::firstOrCreate([
                    'name' => $data['customer'] ?? $taskRequest->customer->name,
                    'email' => $data['customerEmail'] ?? $taskRequest->customer->email,
                    'phone' => $data['customerPhone'] ?? $taskRequest->customer->phone,
                ]);

                $task = Task::create([
                    'title' => $data['title'] ?? $taskRequest->title,
                    'description' => $data['description'] ?? $taskRequest->description,
                    'customer_id' => $customer->id,
                    'max_projects' => $data['maxProjects'] ?? null,
                    'max_members' => $data['maxMembers'],
                    'deadline' => $data['deadline'],
                    'complexity_id' => $data['complexityId'],
                ]);

                if (!empty($data['tags'])) {
                    $task->tags()->sync($data['tags']);
                }

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
                    $hasUserPrivilegedRole = $taskRequest->user->hasPrivilegedRole();

                    $project = Project::create([
                        'task_id' => $task->id,
                        'status_id' => ProjectStatus::STATUS_WAITING,
                        'name' => $data['projectName'] ?? $taskRequest->project_name,
                        'mentor_id' => $hasUserPrivilegedRole ? Auth::id() : null,
                    ]);

                    if (!$hasUserPrivilegedRole) {
                        UserProject::create([
                            'user_id' => $taskRequest->user_id,
                            'project_id' => $project->id,
                            'is_creator' => true,
                        ]);
                    }
                }

                foreach ($taskRequest->files as $file) {
                    $this->fileRepository->deleteFile($file);
                }

                $taskRequest->delete();

                Cache::tags(['task_requests', 'tasks', 'customers'])->flush();

                return $task->id;
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось одобрить заявку: {$e->getMessage()}", 0, $e);
        }
    }

    public function updateTaskRequestResponsibleUser(int $id, string $responsibleUserId): void
    {
        try {
            DB::transaction(function () use ($id, $responsibleUserId) {
                $taskRequest = TaskRequest::findOrFail($id);
                $taskRequest->update(['responsible_user_id' => $responsibleUserId]);

                Cache::tags(['task_requests'])->flush();
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось обновить ответственного: {$e->getMessage()}", 0, $e);
        }
    }

    public function createTask(array $data, array $files = []): int
    {
        try {
            return DB::transaction(function () use ($data, $files) {
                $customer = Customer::firstOrCreate([
                    'name' => $data['customer'],
                    'email' => $data['customerEmail'] ?? null,
                    'phone' => $data['customerPhone'] ?? null,
                ]);

                $task = Task::create([
                    'title' => $data['title'],
                    'description' => $data['description'],
                    'customer_id' => $customer->id,
                    'max_projects' => $data['maxProjects'] ?? null,
                    'max_members' => $data['maxMembers'],
                    'deadline' => $data['deadline'],
                    'complexity_id' => $data['complexityId'],
                ]);

                if (!empty($data['tags'])) {
                    $task->tags()->attach($data['tags']);
                }

                if (!empty($files)) {
                    $fileData = [];
                    foreach ($files as $file) {
                        if (!$file instanceof UploadedFile) {
                            throw new \InvalidArgumentException('Недопустимый тип файла');
                        }
                        $extension = $file->getClientOriginalExtension();
                        $uniqueName = Str::uuid() . '.' . $extension;
                        $directory = 'task_files/' . $task->id;
                        $path = $file->storeAs($directory, $uniqueName, 'public');
                        $fileData[] = [
                            'name' => $file->getClientOriginalName(),
                            'path' => str_replace('public/', '', $path),
                        ];
                    }
                    foreach ($fileData as $file) {
                        $this->fileRepository->saveFile($file, 'task', $task->id);
                    }
                }

                Cache::tags(['tasks', 'customers'])->flush();

                return $task->id;
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось создать задачу: {$e->getMessage()}", 0, $e);
        }
    }

    public function updateTask(int $id, array $data): void
    {
        try {
            DB::transaction(function () use ($id, $data) {
                $customer = Customer::firstOrCreate([
                    'name' => $data['customer'],
                    'email' => $data['customerEmail'] ?? null,
                    'phone' => $data['customerPhone'] ?? null,
                ]);

                $task = Task::findOrFail($id);
                $task->update([
                    'title' => $data['title'],
                    'description' => $data['description'],
                    'max_projects' => $data['maxProjects'] ?? null,
                    'max_members' => $data['maxMembers'],
                    'customer_id' => $customer->id,
                    'deadline' => $data['deadline'],
                    'complexity_id' => $data['complexityId'],
                ]);

                $task->tags()->sync($data['tags'] ?? []);

                Cache::tags(['tasks', 'customers'])->flush();
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось обновить задачу: {$e->getMessage()}", 0, $e);
        }
    }

    public function createFiles(int $taskId, array $files): void
    {
        try {
            DB::transaction(function () use ($taskId, $files) {
                foreach ($files as $file) {
                    $this->fileRepository->saveFile($file, 'task', $taskId);
                }
            });
            Cache::tags(['tasks'])->forget("task:{$taskId}");
            Cache::tags(['tasks'])->forget("task_admin:{$taskId}");
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось создать файлы для задачи [$taskId]: {$e->getMessage()}", 0, $e);
        }
    }

    public function deleteTask(int $id): void
    {
        try {
            DB::transaction(function () use ($id) {
                $task = Task::findOrFail($id);
                $files = $task->files;

                foreach ($files as $file) {
                    $this->fileRepository->deleteFile($file);
                }

                $task->delete();

                foreach ($task->projects as $project) {
                    $project->delete();
                }

                Cache::tags(['tasks', 'customers', 'projects', 'vacancies'])->flush();
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось удалить задачу: {$e->getMessage()}", 0, $e);
        }
    }

    public function deleteFile(int $taskId, int $fileId): void
    {
        try {
            DB::transaction(function () use ($taskId, $fileId) {
                $file = TaskFile::where('task_id', $taskId)
                    ->where('id', $fileId)
                    ->firstOrFail();
                $this->fileRepository->deleteFile($file);
            });
            Cache::tags(['tasks'])->forget("task:{$taskId}");
            Cache::tags(['tasks'])->forget("task_admin:{$taskId}");
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось удалить файл: {$e->getMessage()}", 0, $e);
        }
    }

    public function getTaskCustomers(): Collection
    {
        $cacheKey = 'tasks:customers';
        return Cache::tags(['tasks', 'customers'])->remember($cacheKey, 3600, function () {
            return Customer::whereHas('tasks')->pluck('name');
        });
    }

    public function getTaskRequestCustomers(?string $responsibleUserId = null): Collection
    {
        $cacheKey = 'task_requests:customers:' . ($responsibleUserId ?: 'all');
        return Cache::tags(['task_requests', 'customers'])->remember($cacheKey, 3600, function () use ($responsibleUserId) {
            $query = Customer::whereHas('taskRequests', function ($q) use ($responsibleUserId) {
                if ($responsibleUserId) {
                    $q->where('task_requests.responsible_user_id', $responsibleUserId);
                }
            });
            return $query->pluck('name');
        });
    }
}
