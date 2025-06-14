<?php

namespace App\Interfaces\Services;

use Symfony\Component\HttpFoundation\BinaryFileResponse;

interface FileServiceInterface
{
    public function download(string $path): BinaryFileResponse;
}
