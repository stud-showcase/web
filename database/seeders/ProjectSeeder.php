<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\ProjectStatus;
use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $tasks = Task::withCount('projects')->get();
        $faker = \Faker\Factory::create('ru_RU');

        $projectTypes = [
            'Разработка CRM-системы',
            'Создание интернет-магазина',
            'Мобильное приложение',
            'Веб-портал',
            'Интеграция API',
            'Редизайн сайта',
            'Автоматизация процессов',
            'Разработка корпоративного сайта',
            'E-commerce платформа',
            'Личный кабинет',
            'Чат-бот для Telegram',
            'Система управления заказами',
            'Платформа для обучения',
            'Разработка ERP-системы',
            'Создание маркетплейса',
            'Система аналитики данных',
            'Веб-приложение для логистики',
            'Платформа для мероприятий',
            'Система бронирования',
            'Разработка дашборда',
            'Интеграция с 1С',
            'Создание блога',
            'Платформа для стриминга',
            'Разработка API для финтеха',
            'Система управления складом'
        ];
        $industries = [
            'ритейла',
            'финтеха',
            'медицины',
            'образования',
            'логистики',
            'туризма',
            'недвижимости',
            'автобизнеса',
            'производства',
            'маркетинга',
            'гейминга',
            'страхования',
            'энергетики',
            'строительства',
            'агропрома',
            'госсектора',
            'телекоммуникаций',
            'медиа',
            'HoReCa',
            'электронной коммерции',
            'фитнес-индустрии',
            'юридических услуг',
            'банковского сектора',
            'ИТ-услуг'
        ];

        $positions = [
            'Frontend разработчик',
            'Backend разработчик',
            'DevOps инженер',
            'Project Manager',
            'UI/UX дизайнер',
            'QA инженер',
            'Бизнес-аналитик',
            'Fullstack разработчик',
            'Системный администратор',
            'Мобильный разработчик',
            'Аналитик данных',
            'Product Manager',
            'Scrum Master',
            'Администратор баз данных',
            'Специалист по безопасности',
            'Cloud инженер',
            'Технический архитектор',
            'Инженер поддержки',
            'Team Lead',
            'ML инженер',
            'Data инженер',
            'Разработчик игр',
            'Контент-менеджер',
            'SEO-специалист'
        ];

        $mentorRoleIds = Role::whereIn('name', ['mentor', 'admin'])->pluck('id');
        $mentorUsers = User::whereHas('roles', function ($query) use ($mentorRoleIds) {
            $query->whereIn('roles.id', $mentorRoleIds);
        })->get();

        $studentRole = Role::where('name', 'student')->firstOrFail();
        $studentUsers = User::whereHas('roles', function ($query) use ($studentRole) {
            $query->where('roles.id', $studentRole->id);
        })->get();

        for ($i = 0; $i < 100; $i++) {
            $availableTasks = $tasks->filter(function ($task) {
                return $task->projects_count < $task->max_projects;
            });

            if ($availableTasks->isEmpty()) {
                break;
            }

            $task = $availableTasks->random();
            $mentor = $mentorUsers->random();

            $project = Project::factory()->create([
                'task_id' => $task->id,
                'status_id' => ProjectStatus::inRandomOrder()->first()->id,
                'mentor_id' => $mentor->id,
                'name' => $faker->randomElement($projectTypes) . ' для ' . $faker->randomElement($industries),
            ]);

            $maxMembers = $task->max_members;
            $participantsCount = rand(1, min($maxMembers, $studentUsers->count()));
            $participants = $studentUsers->random($participantsCount);

            $creatorAssigned = false;
            foreach ($participants as $participant) {
                $isCreator = !$creatorAssigned;
                $project->users()->attach($participant->id, [
                    'position' => $faker->randomElement($positions),
                    'is_creator' => $isCreator,
                ]);
                $creatorAssigned = true;
            }

            $task->projects_count++;
        }
    }
}
