<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('project_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->nullable()->constrained('tasks')->nullOnDelete();
            $table->foreignId('status_id')->nullable()->constrained('project_statuses')->nullOnDelete();
            $table->string('name');
            $table->string('annotation', 1000)->nullable();
            $table->boolean('is_close')->default(false);
            $table->uuid('mentor_id')->nullable();
            $table->foreign('mentor_id')->references('id')->on('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index('is_close');
        });

        Schema::create('project_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects');
            $table->string('name');
            $table->string('path');
            $table->timestamps();
            $table->index('path');
        });

        Schema::create('vacancies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description', 1000);
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('project_files');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('project_statuses');
        Schema::dropIfExists('vacancies');
    }
};
