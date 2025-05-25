<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = \App\Models\User::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('ru_RU');

        return [
            'id' => (string) Str::uuid(),
            'first_name' => $faker->firstName,
            'second_name' => $faker->lastName,
            'last_name' => $faker->optional()->middleName,
            'email' => $faker->unique()->safeEmail,
            'group' => strtoupper($faker->bothify('??-###')),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
