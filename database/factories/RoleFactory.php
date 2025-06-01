<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory
{
    protected $model = Role::class;

    public function definition()
    {
        $roles = ['student', 'mentor', 'admin'];
        $index = $this->faker->unique()->numberBetween(0, 2);

        return [
            'name' => $roles[$index],
        ];
    }
}
