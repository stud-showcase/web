<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectInviteFactory extends Factory
{
    protected $model = \App\Models\ProjectInvite::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'project_id' => Project::factory(),
            'vacancy_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
