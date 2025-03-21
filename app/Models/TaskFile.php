<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskFile extends Model
{
    use HasFactory;

    protected $table = 'task_files';

    protected $fillable = [
        'task_id',
        'path'
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
