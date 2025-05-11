<?php

namespace App\Http\Controllers;

use App\Services\FileService;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class FileController extends Controller
{
    public function __construct(
        private FileService $fileService
    ) {}

    public function download(string $path): BinaryFileResponse
    {
        return $this->fileService->download($path);
    }
}
