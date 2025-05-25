<?php

namespace Database\Seeders;

use App\Models\TaskRequest;
use Illuminate\Database\Seeder;

class TaskRequestSeeder extends Seeder
{
    public function run(): void
    {
        TaskRequest::factory()->count(20)->create();
    }
}
