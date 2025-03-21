<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tag;
use App\Models\Task;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = ['Веб', 'Научная деятельность', 'API', 'Тестовый'];
        foreach ($tags as $name) {
            Tag::create(['name' => $name]);
        }

        Task::all()->each(function ($task) {
            $task->tags()->attach(
                Tag::inRandomOrder()->limit(rand(1, 3))->pluck('id')
            );
        });
    }
}
