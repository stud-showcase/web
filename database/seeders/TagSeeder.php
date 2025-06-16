<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tag;
use App\Models\Task;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            'Веб-разработка',
            'Мобильная разработка',
            'API',
            'Интеграция',
            'Frontend',
            'Backend',
            'DevOps',
            'UI/UX',
            'Тестирование',
            'Аналитика',
            'CRM',
            'E-commerce',
            'ERP',
            'Маркетплейс',
            'Чат-бот',
            'Облачные технологии',
            'Безопасность',
            'SEO',
            'Машинное обучение',
            'Базы данных',
            'Автоматизация',
            '1С',
            'Логистика',
            'Финтех',
            'Образование',
            'Медицина'
        ];

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
