<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\ProjectStatus;
use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $tasks = Task::withCount('projects')->get();
        $faker = \Faker\Factory::create('ru_RU');

        $mentorRoleIds = Role::whereIn('name', ['mentor', 'admin'])->pluck('id');
        $mentorUsers = User::whereHas('roles', function ($query) use ($mentorRoleIds) {
            $query->whereIn('roles.id', $mentorRoleIds);
        })->get();

        $studentRole = Role::where('name', 'student')->firstOrFail();
        $studentUsers = User::whereHas('roles', function ($query) use ($studentRole) {
            $query->where('roles.id', $studentRole->id);
        })->get();

        for ($i = 0; $i < 100; $i++) {
            $availableTasks = $tasks->filter(function ($task) {
                return $task->projects_count < $task->max_projects;
            });

            if ($availableTasks->isEmpty()) {
                break;
            }

            $task = $availableTasks->random();
            $mentor = $mentorUsers->random();

            $project = Project::factory()->create([
                'task_id' => $task->id,
                'status_id' => ProjectStatus::inRandomOrder()->first()->id,
                'mentor_id' => $mentor->id,
                'name' => $faker->sentence(3),
            ]);

            $maxMembers = $task->max_members;
            $participantsCount = rand(1, min($maxMembers, $studentUsers->count()));
            $participants = $studentUsers->random($participantsCount);

            $creatorAssigned = false;
            foreach ($participants as $participant) {
                $isCreator = !$creatorAssigned;
                $project->users()->attach($participant->id, [
                    'position' => $faker->jobTitle(),
                    'is_creator' => $isCreator,
                ]);
                $creatorAssigned = true;
            }

            $task->projects_count++;
        }
    }
}
