<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'id',
        'task_id',
        'status_id',
        'name',
        'annotation',
        'is_close',
        'mentor_id',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function status()
    {
        return $this->belongsTo(ProjectStatus::class, 'status_id');
    }

    public function mentor()
    {
        return $this->belongsTo(User::class, 'mentor_id');
    }

    public function files()
    {
        return $this->hasMany(ProjectFile::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_project')
            ->withPivot('position', 'is_creator')
            ->withTimestamps();
    }

    public function invites()
    {
        return $this->hasMany(ProjectInvite::class);
    }

    public function vacancies()
    {
        return $this->hasMany(Vacancy::class, 'project_id');
    }
}
