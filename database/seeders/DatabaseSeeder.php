<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            ComplexitySeeder::class,
            UserSeeder::class,
            TaskSeeder::class,
            ProjectStatusSeeder::class,
            ProjectSeeder::class,
            VacancySeeder::class,
            TagSeeder::class,
            SettingsSeeder::class,
            TaskRequestSeeder::class,
        ]);
    }
}
