<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = \App\Models\Project::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('ru_RU');

        return [
            'task_id' => null,
            'status_id' => null,
            'name' => $faker->sentence(3),
            'annotation' => $faker->optional()->text(100),
            'is_close' => $faker->boolean(20),
            'mentor_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
