<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ComplexitySeeder::class,
            GroupSeeder::class,
            UserSeeder::class,
            RoleSeeder::class,
            TaskSeeder::class,
            ProjectStatusSeeder::class,
            ProjectSeeder::class,
            VacancySeeder::class,
            TagSeeder::class,
            SettingsSeeder::class,
        ]);
    }
}
