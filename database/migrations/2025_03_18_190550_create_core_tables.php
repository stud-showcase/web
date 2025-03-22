<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('complexity', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('first_name');
            $table->string('second_name');
            $table->string('last_name')->nullable();
            $table->string('email')->unique();
            $table->foreignId('group_id')->nullable()->constrained('groups')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('groups');
        Schema::dropIfExists('complexity');
        Schema::dropIfExists('roles');
    }
};
