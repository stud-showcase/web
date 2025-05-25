<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('name');
        });

        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description', 1000);
            $table->tinyInteger('max_projects')->nullable();
            $table->tinyInteger('max_members');
            $table->dateTime('deadline');
            $table->foreignId('complexity_id')->nullable()->constrained('complexities')->nullOnDelete();
            $table->foreignId('customer_id')->nullable()->constrained('customers')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index('max_members');
            $table->index('deadline');
        });

        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('task_tags', function (Blueprint $table) {
            $table->foreignId('task_id')->constrained('tasks')->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained('tags')->cascadeOnDelete();
            $table->primary(['task_id', 'tag_id']);
        });

        Schema::create('task_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained('tasks');
            $table->string('name');
            $table->string('path');
            $table->timestamps();
            $table->index('path');
        });
    }

    public function down()
    {
        Schema::dropIfExists('task_tags');
        Schema::dropIfExists('task_files');
        Schema::dropIfExists('tags');
        Schema::dropIfExists('tasks');
        Schema::dropIfExists('customers');
    }
};
