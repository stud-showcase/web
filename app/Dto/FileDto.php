<?php

namespace App\Dto;

use App\Models\ProjectFile;
use App\Models\TaskFile;
use App\Models\TaskRequestFile;

class FileDto
{
    public function __construct(
        public string $name,
        public string $path
    ) {}

    public static function fromModel(TaskFile|ProjectFile|TaskRequestFile $file): self
    {
        return new self(
            name: $file->name,
            path: asset("storage/{$file->path}")
        );
    }

    public function toArray(): array
    {
        return get_object_vars($this);
    }
}
