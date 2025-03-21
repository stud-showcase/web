<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskRequestFile extends Model
{
    use HasFactory;

    protected $table = 'task_request_files';

    protected $fillable = [
        'task_request_id',
        'path',
    ];

    public function taskRequest()
    {
        return $this->belongsTo(TaskRequest::class);
    }
}
