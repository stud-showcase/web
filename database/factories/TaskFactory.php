<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->realText(200),
            'customer' => $this->faker->name(),
            'max_projects' => $this->faker->numberBetween(1, 5),
            'max_members' => $this->faker->numberBetween(1, 10),
            'customer_email' => $this->faker->safeEmail(),
            'customer_phone' => $this->faker->optional()->phoneNumber(),
            'deadline' => $this->faker->dateTimeBetween('now', '+1 month'),
            'complexity_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
