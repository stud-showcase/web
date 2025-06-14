<?php

namespace App\Interfaces\Repositories;

use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface FileRepositoryInterface
{
    public function findFileByPath(string $path): ?object;
    public function getDownloadResponse(object $file): BinaryFileResponse;
    public function saveFile(array $file, string $entityType, int $entityId): void;
    public function deleteFile(object $file): void;
}
