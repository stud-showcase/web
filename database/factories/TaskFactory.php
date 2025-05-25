<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    public function definition(): array
    {
        $customer = Customer::factory()->create();

        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->text(200),
            'customer_id' => $customer->id,
            'max_projects' => $this->faker->numberBetween(1, 5),
            'max_members' => $this->faker->numberBetween(1, 10),
            'deadline' => $this->faker->dateTimeBetween('now', '+1 month'),
            'complexity_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
