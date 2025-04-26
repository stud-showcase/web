<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vacancy;
use App\Models\Project;

class VacancySeeder extends Seeder
{
    public function run(): void
    {
        Project::all()->each(function ($project) {
            $vacancyCount = rand(0, 3);
            Vacancy::factory()->count($vacancyCount)->create([
                'project_id' => $project->id,
            ]);
        });
    }
}
