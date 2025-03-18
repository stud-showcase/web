<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskTag extends Model
{
    use HasFactory;

    protected $table = 'task_tags';

    public $timestamps = false;

    protected $fillable = [
        'task_id',
        'tag_id',
    ];
}
