<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VacancyFactory extends Factory
{
    protected $model = \App\Models\Vacancy::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('ru_RU');

        return [
            'name' => $faker->jobTitle,
            'description' => $faker->sentence,
            'project_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
