<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['admin', 'mentor', 'student'];
        foreach ($roles as $name) {
            Role::create(['name' => $name]);
        }
    }
}
