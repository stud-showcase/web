<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->firstOrFail();
        User::factory()
            ->count(10)
            ->create()
            ->each(function ($user) use ($adminRole) {
                $user->roles()->attach($adminRole->id);
            });

        $mentorRole = Role::where('name', 'mentor')->firstOrFail();
        User::factory()
            ->count(30)
            ->create()
            ->each(function ($user) use ($mentorRole) {
                $user->roles()->attach($mentorRole->id);
            });

        $studentRole = Role::where('name', 'student')->firstOrFail();
        User::factory()
            ->count(60)
            ->create()
            ->each(function ($user) use ($studentRole) {
                $user->roles()->attach($studentRole->id);
            });
    }
}
