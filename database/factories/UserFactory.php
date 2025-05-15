<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'id' => (string) Str::uuid(),
            'first_name' => $this->faker->firstName(),
            'second_name' => $this->faker->lastName(),
            'last_name' => $this->faker->optional()->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'group' => strtoupper($this->faker->bothify('??-##')),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
