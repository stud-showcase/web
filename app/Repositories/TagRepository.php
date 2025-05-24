<?php

namespace App\Repositories;

use App\Models\Tag;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Collection;

class TagRepository
{
    public function getTagsForFilters(): Collection
    {
        $cacheKey = 'tags:filters';
        return Cache::tags(['tags'])->remember($cacheKey, 3600, function () {
            return Tag::select('id', 'name')->get();
        });
    }
}
