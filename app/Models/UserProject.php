<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProject extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'user_project';

    protected $fillable = [
        'user_id',
        'project_id',
        'position',
        'is_creator',
    ];
}
