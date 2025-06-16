<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\Complexity;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        Task::factory()
            ->count(50)
            ->create([
                'complexity_id' => fn() => Complexity::inRandomOrder()->first()->id,
                'max_projects' => fn() => rand(3, 15),
            ]);
    }
}
