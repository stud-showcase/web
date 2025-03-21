<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Task;
use App\Models\ProjectStatus;
use App\Models\User;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $tasks = Task::withCount('projects')->get();

        for ($i = 0; $i < 100; $i++) {
            $availableTasks = $tasks->filter(function ($task) {
                return $task->projects_count < $task->max_projects;
            });

            if ($availableTasks->isEmpty()) {
                break;
            }

            $task = $availableTasks->random();

            Project::factory()->create([
                'task_id' => $task->id,
                'status_id' => fn() => ProjectStatus::inRandomOrder()->first()->id,
                'mentor_id' => fn() => User::inRandomOrder()->first()->id,
            ]);

            $task->projects_count++;
        }
    }
}
