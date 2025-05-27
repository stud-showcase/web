<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateTagRequest as AdminCreateTagRequest;
use App\Http\Requests\Admin\UpdateTagRequest as AdminUpdateTagRequest;
use App\Services\TaskService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Throwable;

class TagController extends Controller
{
    public function __construct(
        private TaskService $taskService
    ) {}

    public function store(AdminCreateTagRequest $request): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->taskService->createTag($data['name']);
            return redirect()->route('admin.tasks.settings')->with('success', 'Тег успешно создан');
        } catch (Throwable $e) {
            Log::error("Ошибка создания тега: {$e->getMessage()}");
            return redirect()->back()->withErrors(['error' => 'Не удалось создать тег']);
        }
    }

    public function update(AdminUpdateTagRequest $request, int $id): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->taskService->updateTag($id, $data['name']);
            return redirect()->route('admin.tasks.settings')->with('success', 'Тег успешно обновлен');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления тега [$id]: {$e->getMessage()}");
            return redirect()->back()->withErrors(['error' => 'Не удалось обновить тег']);
        }
    }

    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->taskService->deleteTag($id);
            return redirect()->route('admin.tasks.settings')->with('success', 'Тег успешно удален');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления тега [$id]: {$e->getMessage()}");
            return redirect()->back()->withErrors(['error' => 'Не удалось удалить тег']);
        }
    }
}
