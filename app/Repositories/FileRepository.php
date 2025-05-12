<?php

namespace App\Repositories;

use App\Models\ProjectFile;
use App\Models\TaskFile;
use App\Models\TaskRequestFile;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class FileRepository
{
    protected array $fileModels = [
        TaskRequestFile::class,
        TaskFile::class,
        ProjectFile::class,
    ];

    public function findFileByPath(string $path): ?object
    {
        $path = ltrim($path, '/');

        if (!$this->isValidPath($path)) {
            throw new \InvalidArgumentException('Недопустимый путь');
        }

        foreach ($this->fileModels as $model) {
            $file = $model::where('path', $path)->first();
            if ($file) {
                return $file;
            }
        }

        return null;
    }

    public function getDownloadResponse(object $file): BinaryFileResponse
    {
        $filePath = storage_path('app/public/' . $file->path);

        if (!file_exists($filePath)) {
            throw new \RuntimeException('Файл не найден на сервере');
        }

        return response()->download($filePath, $file->name);
    }

    public function saveFile(UploadedFile $file, string $directory, int $entityId, string $modelClass): void
    {
        try {
            $extension = $file->getClientOriginalExtension();
            $uniqueName = Str::uuid() . '.' . $extension;
            $path = $file->storeAs($directory . '/' . $entityId, $uniqueName, 'public');

            // FIXME: поменял $modelClass::getForeignKey() => $entityId на 'task_request_id' => $entityId
            $modelClass::create([
                'task_request_id' => $entityId,
                'name' => $file->getClientOriginalName(),
                'path' => $path,
            ]);
        } catch (\Throwable $e) {
            throw new \RuntimeException("Не удалось сохранить файл: {$e->getMessage()}", 0, $e);
        }
    }

    public function deleteFile(object $file): void
    {
        try {
            if (Storage::disk('public')->exists($file->path)) {
                Storage::disk('public')->delete($file->path);
            }
            $file->delete();
        } catch (\Throwable $e) {
            throw new \RuntimeException("Не удалось удалить файл: {$e->getMessage()}", 0, $e);
        }
    }

    protected function isValidPath(string $path): bool
    {
        return Str::startsWith($path, ['task_requests/', 'task_files/', 'project_files/']);
    }
}
