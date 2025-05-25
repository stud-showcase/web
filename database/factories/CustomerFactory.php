<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    protected $model = \App\Models\Customer::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('ru_RU');

        $orgTypes = ['ООО', 'ЗАО', 'АО', 'ОАО', 'ПАО', 'ИП'];
        $orgType = $faker->randomElement($orgTypes);
        $companyName = $faker->company;

        return [
            'name' => $orgType . ' "' . $companyName . '"',
            'email' => $faker->companyEmail,
            'phone' => $faker->optional()->phoneNumber,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
