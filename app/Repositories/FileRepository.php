<?php

namespace App\Repositories;

use App\Models\ProjectFile;
use App\Models\TaskFile;
use App\Models\TaskRequestFile;
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

    public function saveFile(array $file, string $entityType, int $entityId): void
    {
        try {
            $data = [
                'name' => $file['name'],
                'path' => $file['path'],
            ];

            switch ($entityType) {
                case 'project':
                    $data['project_id'] = $entityId;
                    ProjectFile::create($data);
                    break;
                case 'task':
                    $data['task_id'] = $entityId;
                    TaskFile::create($data);
                    break;
                case 'task_request':
                    $data['task_request_id'] = $entityId;
                    TaskRequestFile::create($data);
                    break;
                default:
                    throw new \InvalidArgumentException("Неподдерживаемый тип сущности: {$entityType}");
            }
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
