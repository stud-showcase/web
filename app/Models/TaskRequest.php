<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskRequest extends Model
{
    use HasFactory;

    protected $table = 'task_requests';

    protected $fillable = [
        'id',
        'title',
        'description',
        'customer',
        'customer_email',
        'customer_phone',
        'with_project',
        'project_name',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function files()
    {
        return $this->hasMany(TaskRequestFile::class);
    }
}
