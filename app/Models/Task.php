<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'description',
        'customer',
        'max_projects',
        'max_members',
        'customer_email',
        'customer_phone',
        'deadline',
        'complexity_id',
    ];

    public function complexity()
    {
        return $this->belongsTo(Complexity::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'task_tags');
    }

    public function files()
    {
        return $this->hasMany(TaskFile::class);
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class, 'group_task');
    }
}
