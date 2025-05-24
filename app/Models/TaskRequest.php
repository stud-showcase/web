<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaskRequest extends Model
{
    use HasFactory, SoftDeletes;

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
        'responsible_user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function responsibleUser()
    {
        return $this->belongsTo(User::class, 'responsible_user_id');
    }

    public function files()
    {
        return $this->hasMany(TaskRequestFile::class);
    }
}
