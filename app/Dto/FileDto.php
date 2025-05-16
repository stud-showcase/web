<?php

namespace App\Dto;

use App\Models\ProjectFile;
use App\Models\TaskFile;
use App\Models\TaskRequestFile;

class FileDto
{
    public function __construct(
        public int $id,
        public string $name,
        public string $path
    ) {}

    public static function fromModel(TaskFile|ProjectFile|TaskRequestFile $file): self
    {
        return new self(
            id: $file->id,
            name: $file->name,
            path: $file->path
        );
    }

    public function toArray(): array
    {
        return get_object_vars($this);
    }
}
