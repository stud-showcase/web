<?php

namespace App\Http\Controllers;

use App\Models\ProjectFile;
use App\Models\TaskFile;
use App\Models\TaskRequestFile;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Illuminate\Support\Str;

class FileController extends Controller
{
    public function download(string $path): BinaryFileResponse
    {
        $path = ltrim($path, '/');

        if (!Str::startsWith($path, ['task_requests/', 'task_files/', 'project_files/'])) {
            abort(403, 'Недопустимый путь.');
        }

        $file = $this->findFileByPath($path);

        if (!$file) {
            abort(404, 'Файл не найден.');
        }

        $filePath = storage_path('app/public/' . $file->path);

        if (!file_exists($filePath)) {
            abort(404, 'Файл не найден на сервере.');
        }

        return response()->download($filePath, $file->name);
    }

    protected function findFileByPath(string $path): ?object
    {
        $file = TaskRequestFile::where('path', $path)->first();
        if ($file) {
            return $file;
        }

        $file = TaskFile::where('path', $path)->first();
        if ($file) {
            return $file;
        }

        $file = ProjectFile::where('path', $path)->first();
        if ($file) {
            return $file;
        }

        return null;
    }
}
