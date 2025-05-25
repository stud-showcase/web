<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskRequestFactory extends Factory
{
    protected $model = \App\Models\TaskRequest::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('ru_RU');

        $customer = Customer::factory()->create();
        $user = User::factory()->create();
        $responsibleUser = $faker->boolean(50) ? User::factory()->create() : null;

        return [
            'title' => $faker->sentence(3),
            'description' => $faker->text(200),
            'with_project' => $faker->boolean(30),
            'project_name' => $faker->optional(0.3)->sentence(3),
            'user_id' => $user->id,
            'responsible_user_id' => $responsibleUser?->id,
            'customer_id' => $customer->id,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
