<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    public function definition(): array
    {
        return [
            'task_id' => null,
            'status_id' => null,
            'name' => $this->faker->sentence(3),
            'annotation' => $this->faker->optional()->text(),
            'is_close' => $this->faker->boolean(20),
            'mentor_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
