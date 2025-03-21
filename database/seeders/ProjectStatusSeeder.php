<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProjectStatus;

class ProjectStatusSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['В ожидании', 'В работе', 'Завершен'];
        foreach ($statuses as $name) {
            ProjectStatus::create(['name' => $name]);
        }
    }
}
