<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('group_task', function (Blueprint $table) {
            $table->foreignId('group_id')->constrained('groups')->cascadeOnDelete();
            $table->foreignId('task_id')->constrained('tasks')->cascadeOnDelete();
            $table->primary(['group_id', 'task_id']);
        });

        Schema::create('user_project', function (Blueprint $table) {
            $table->foreignId('project_id')->constrained('projects');
            $table->uuid('user_id');
            $table->string('position')->nullable();
            $table->boolean('is_creator')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->primary(['user_id', 'project_id']);
            $table->timestamps();
        });

        Schema::create('user_role', function (Blueprint $table) {
            $table->uuid('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreignId('role_id')->constrained('roles');
            $table->primary(['user_id', 'role_id']);
        });

        Schema::create('project_invites', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreignId('project_id')->constrained('projects');
            $table->foreignId('vacancy_id')->nullable()->constrained('vacancies')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('task_requests', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description')->nullable();
            $table->string('customer');
            $table->string('customer_email');
            $table->string('customer_phone')->nullable();
            $table->boolean('with_project')->default(false);
            $table->string('project_name');
            $table->uuid('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });

        Schema::create('task_request_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_request_id')->constrained('task_requests');
            $table->string('path');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('task_request_files');
        Schema::dropIfExists('task_requests');
        Schema::dropIfExists('project_invites');
        Schema::dropIfExists('user_role');
        Schema::dropIfExists('user_project');
        Schema::dropIfExists('group_task');
    }
};
