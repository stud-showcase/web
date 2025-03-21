<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Group;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()
            ->count(50)
            ->create()
            ->each(function ($user) {
                $user->group_id = Group::inRandomOrder()->first()->id;
                $user->save();
            });
    }
}
