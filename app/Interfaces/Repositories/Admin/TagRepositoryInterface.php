<?php

namespace App\Interfaces\Repositories\Admin;

use App\Models\Tag;
use Illuminate\Support\Collection;

interface TagRepositoryInterface
{
    public function getTagsForFilters(): Collection;
    public function createTag(string $name): Tag;
    public function updateTag(int $id, string $name): void;
    public function deleteTag(int $id): void;
}
