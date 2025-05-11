<?php

namespace App\Repositories;

use App\Models\Task;
use App\Models\TaskRequest;
use App\Models\TaskRequestFile;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

class TaskRepository
{
    public function getFilteredTasks(array $filters): LengthAwarePaginator
    {
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
                isset($filters['search']) && !empty($filters['search']),
                fn($q) => $q->where('title', 'LIKE', '%' . $filters['search'] . '%')
            )
            ->paginate(10)
            ->withQueryString();
    }

    public function getByIdWithRelations(int $id): Task
    {
        return Task::with([
            'complexity',
            'tags',
            'groups',
            'files',
            'projects' => function ($query) {
                $query->with([
                    'status',
                    'users' => fn($q) => $q->select('users.id'),
                ]);
            },
        ])->findOrFail($id);
    }

    public function getFilteredTaskRequests(array $filters): LengthAwarePaginator
    {
        return TaskRequest::query()
            ->when(
                isset($filters['search']) && !empty($filters['search']),
                fn($q) => $q->where('title', 'LIKE', '%' . $filters['search'] . '%')
                    ->orWhere('customer', 'LIKE', '%' . $filters['search'] . '%')
                    ->orWhere('customer_email', 'LIKE', '%' . $filters['search'] . '%')
            )
            ->paginate(10)
            ->withQueryString();
    }

    public function getAdminTasks(array $filters): LengthAwarePaginator
    {
        return Task::query()
            ->with(['complexity'])
            ->when(
                isset($filters['search']) && !empty($filters['search']),
                fn($q) => $q->where('name', 'LIKE', '%' . $filters['search'] . '%')
                    ->orWhere('description', 'LIKE', '%' . $filters['search'] . '%')
            )
            ->paginate(10)
            ->withQueryString();
    }

    public function createRequest(array $data, array $files): void
    {
        try {
            DB::transaction(function () use ($data, $files) {
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

                foreach ($files as $file) {
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

                Log::info("Заявка [$taskRequest->id] создана.", ['files' => count($files)]);
            });
        } catch (Throwable $e) {
            Log::error("Ошибка создания заявки: " . $e->getMessage(), ['data' => $data]);
            throw $e;
        }
    }
}
