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
        'group',
    ];

    private const ROLE_ACCESS_MAP = [
        'mentor'  => ['student'],
        'admin'   => ['student', 'mentor'],
    ];

    public const PRIVILEGED_ROLES = ['admin', 'mentor'];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_role', 'user_id', 'role_id');
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

    public function hasPrivilegedRole(): bool
    {
        return $this->roles->pluck('name')->intersect(self::PRIVILEGED_ROLES)->isNotEmpty();
    }

    public function hasAnyRole($roles): bool
    {
        $roles = is_array($roles) ? $roles : explode(',', $roles);
        $userRoles = $this->roles()->pluck('name')->toArray();

        foreach ($roles as $role) {
            if ($this->hasRole($role, $userRoles)) {
                return true;
            }
        }

        return false;
    }

    private function hasRole(string $role, array $userRoles): bool
    {
        foreach ($userRoles as $userRole) {
            if ($userRole === $role) {
                return true;
            }

            if (isset(self::ROLE_ACCESS_MAP[$userRole]) && in_array($role, self::ROLE_ACCESS_MAP[$userRole])) {
                return true;
            }
        }

        return false;
    }
}
