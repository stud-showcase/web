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
            $mentor = User::inRandomOrder()->first();

            $project = Project::factory()->create([
                'task_id' => $task->id,
                'status_id' => fn() => ProjectStatus::inRandomOrder()->first()->id,
                'mentor_id' => $mentor->id,
                'name' => fake()->sentence(3),
            ]);

            $maxMembers = $task->max_members;
            $participantsCount = rand(1, $maxMembers);
            $participants = User::query()
                ->where('id', '!=', $mentor->id)
                ->inRandomOrder()
                ->limit($participantsCount)
                ->get();

            $creatorAssigned = false;
            foreach ($participants as $participant) {
                $isCreator = !$creatorAssigned;
                $project->users()->attach($participant->id, [
                    'position' => fake()->jobTitle(),
                    'is_creator' => $isCreator,
                ]);
                $creatorAssigned = true;
            }

            $task->projects_count++;
        }
    }
}
