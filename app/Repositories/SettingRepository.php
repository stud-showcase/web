<?php

namespace App\Repositories;

use App\Interfaces\Repositories\Admin\SettingRepositoryInterface;
use App\Models\Setting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Throwable;

class SettingRepository implements SettingRepositoryInterface
{
    public function getSettings(): ?Setting
    {
        try {
            return Cache::tags(['settings'])->remember('settings', 3600, function () {
                return Setting::first();
            });
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось получить настройки: {$e->getMessage()}", 0, $e);
        }
    }

    public function updateSettings(array $data): void
    {
        try {
            DB::transaction(function () use ($data) {
                $setting = Setting::firstOrCreate([]);
                $setting->update([
                    'start_date' => $data['startDate'],
                    'end_date' => $data['endDate'],
                ]);
                Cache::tags(['settings', 'tasks'])->flush();
            });
        } catch (Throwable $e) {
            throw new \RuntimeException("Не удалось обновить настройки: {$e->getMessage()}", 0, $e);
        }
    }
}
