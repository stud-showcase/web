<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = \App\Models\Task::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('ru_RU');
        $customer = Customer::factory()->create();

        return [
            'title' => $faker->sentence(3),
            'description' => $faker->text(200),
            'customer_id' => $customer->id,
            'max_projects' => $faker->numberBetween(1, 5),
            'max_members' => $faker->numberBetween(1, 10),
            'deadline' => $faker->dateTimeBetween('now', '+1 month'),
            'complexity_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
