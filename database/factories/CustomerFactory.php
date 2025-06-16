<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    protected $model = \App\Models\Customer::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('ru_RU');

        $companyNames = [
            'ТехноСофт',
            'Инновация',
            'Цифровые Решения',
            'СмартСистемы',
            'ВебСтудия',
            'КодМастер',
            'ИТ-Прогресс',
            'Диджитал Групп',
            'СофтЛайн',
            'АйТи Лаб',
            'НоваТех',
            'Квантум Софт',
            'Системные Решения',
            'ВебТехнологии',
            'Прогресс Код',
            'Интеллект Софт',
            'ТехноПлатформа',
            'Цифровой Код',
            'СмартКод',
            'ИТ-Инновации',
            'БизнесТех',
            'СофтПро',
            'ВебДинамика',
            'ТехноЛидер',
            'Кодекс Групп'
        ];

        $companyPrefixes = ['ООО', 'АО', 'ЗАО', 'ИП', 'ПАО'];

        $domains = [
            'techsoft.ru',
            'innovate.ru',
            'digitalsolutions.ru',
            'smartsys.ru',
            'weblab.ru',
            'codemaestro.ru',
            'itprogress.ru',
            'digitalgroup.ru',
            'softline.ru',
            'itlab.ru',
            'novatech.ru',
            'quantumsoft.ru',
            'systemsltn.ru',
            'webtech.ru',
            'progresscode.ru',
            'intellectsoft.ru',
            'techplatform.ru',
            'digitalcode.ru',
            'smartcode.ru',
            'itinnovations.ru',
            'businesstech.ru',
            'softpro.ru',
            'webdynamics.ru',
            'techleader.ru',
            'codexgroup.ru'
        ];

        $company = $faker->randomElement($companyPrefixes) . ' ' . $faker->randomElement($companyNames);

        return [
            'name' => $company,
            'email' => $faker->firstName . '.' . $faker->lastName . '@' . $faker->randomElement($domains),
            'phone' => $faker->optional()->phoneNumber,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
