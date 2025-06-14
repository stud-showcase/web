<?php

namespace App\Interfaces\Repositories\Admin;

use App\Models\Setting;

interface SettingRepositoryInterface
{
    public function getSettings(): ?Setting;
    public function updateSettings(array $data): void;
}
