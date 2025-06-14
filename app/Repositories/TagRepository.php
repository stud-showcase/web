<?php

namespace App\Repositories;

use App\Interfaces\Repositories\Admin\TagRepositoryInterface;
use App\Models\Tag;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Throwable;

class TagRepository implements TagRepositoryInterface
{
    public function getTagsForFilters(): Collection
    {
        $cacheKey = 'tags:filters';
        return Cache::tags(['tags'])->remember($cacheKey, 3600, function () {
            return Tag::select('id', 'name')->get();
        });
    }

    public function createTag(string $name): Tag
    {
        try {
            return DB::transaction(function () use ($name) {
                $tag = Tag::create(['name' => $name]);
                Cache::tags(['tags'])->flush();
                return $tag;
            });
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось создать тег: {$e->getMessage()}", 0, $e);
        }
    }

    public function updateTag(int $id, string $name): void
    {
        try {
            DB::transaction(function () use ($id, $name) {
                $tag = Tag::findOrFail($id);
                $tag->update(['name' => $name]);
                Cache::tags(['tags'])->flush();
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось обновить тег: {$e->getMessage()}", 0, $e);
        }
    }

    public function deleteTag(int $id): void
    {
        try {
            DB::transaction(function () use ($id) {
                $tag = Tag::findOrFail($id);
                $tag->delete();
                Cache::tags(['tags'])->flush();
            });
        } catch (ModelNotFoundException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось удалить тег: {$e->getMessage()}", 0, $e);
        }
    }
}
