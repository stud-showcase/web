<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectInvite extends Model
{
    use HasFactory;

    protected $table = 'project_invite';

    protected $fillable = [
        'user_id',
        'project_id',
    ];
}
