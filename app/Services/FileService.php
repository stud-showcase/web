<?php

namespace App\Services;

use App\Repositories\FileRepository;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Throwable;

class FileService
{
    public function __construct(
        private FileRepository $fileRepository
    ) {}

    public function download(string $path): BinaryFileResponse
    {
        try {
            $file = $this->fileRepository->findFileByPath($path);

            if (!$file) {
                Log::warning("Файл не найден по пути: [$path]");
                abort(404, 'Файл не найден');
            }

            return $this->fileRepository->getDownloadResponse($file);
        } catch (Throwable $e) {
            Log::error("Ошибка скачивания файла по пути [$path]: " . $e->getMessage());
            if ($e instanceof \InvalidArgumentException) {
                abort(403, $e->getMessage());
            }
            abort(500, 'Ошибка сервера');
        }
    }
}
