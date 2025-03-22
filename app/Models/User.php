<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasUuids;

    protected $fillable = [
        'id',
        'first_name',
        'second_name',
        'last_name',
        'email',
        'group_id',
    ];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_role');
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'user_project')
            ->withPivot('position', 'is_creator')
            ->withTimestamps();
    }

    public function mentoredProjects()
    {
        return $this->hasMany(Project::class, 'mentor_id');
    }

    public function invites()
    {
        return $this->hasMany(ProjectInvite::class);
    }

    public function taskRequests()
    {
        return $this->hasMany(TaskRequest::class);
    }
}
