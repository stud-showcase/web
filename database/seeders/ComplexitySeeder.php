<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Complexity;

class ComplexitySeeder extends Seeder
{
    public function run(): void
    {
        $complexities = ['Легкий', 'Средний', 'Тяжелый'];
        foreach ($complexities as $name) {
            Complexity::create(['name' => $name]);
        }
    }
}
