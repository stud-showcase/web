<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Services\TaskService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class TagController extends Controller
{
    public function __construct(
        private TaskService $taskService
    ) {}

    public function index(): Response
    {
        return Inertia::render('admin/TaskBankSettings', [
            ...$this->taskService->getAvailableFilters(['tags']),
        ]);
    }

    public function store(CreateTagRequest $request): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->taskService->createTag($data['name']);
            return redirect()->route('admin.tags.index')->with('success', 'Тег успешно создан');
        } catch (Throwable $e) {
            Log::error("Ошибка создания тега: {$e->getMessage()}");
            return redirect()->back()->withErrors(['error' => 'Не удалось создать тег']);
        }
    }

    public function update(UpdateTagRequest $request, int $id): RedirectResponse
    {
        try {
            $data = $request->validated();
            $this->taskService->updateTag($id, $data['name']);
            return redirect()->route('admin.tags.index')->with('success', 'Тег успешно обновлен');
        } catch (Throwable $e) {
            Log::error("Ошибка обновления тега [$id]: {$e->getMessage()}");
            return redirect()->back()->withErrors(['error' => 'Не удалось обновить тег']);
        }
    }

    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->taskService->deleteTag($id);
            return redirect()->route('admin.tags.index')->with('success', 'Тег успешно удален');
        } catch (Throwable $e) {
            Log::error("Ошибка удаления тега [$id]: {$e->getMessage()}");
            return redirect()->back()->withErrors(['error' => 'Не удалось удалить тег']);
        }
    }
}
