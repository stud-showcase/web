<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VacancyFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->jobTitle(),
            'description' => $this->faker->sentence(),
            'project_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
