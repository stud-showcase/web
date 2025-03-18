<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('project_status', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained('tasks');
            $table->foreignId('status_id')->constrained('project_status');
            $table->text('annotation')->nullable();
            $table->boolean('is_close')->default(false);
            $table->foreignId('mentor_id')->nullable()->constrained('users');
            $table->timestamps();
        });

        Schema::create('project_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects');
            $table->string('path');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('project_files');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('project_status');
    }
};
