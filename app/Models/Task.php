<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'max_projects',
        'max_members',
        'deadline',
        'complexity_id',
        'customer_id',
        'created_at',
    ];

    public function complexity()
    {
        return $this->belongsTo(Complexity::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
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

    public function canTake(?User $user): bool
    {
        if (!$user) {
            return false;
        }

        if (!$user->hasPrivilegedRole()) {
            $hasProjectWithTask = $this->projects()
                ->whereHas('users', fn($q) => $q->where('users.id', $user->id))
                ->exists();

            if ($hasProjectWithTask) {
                return false;
            }

            if ($this->projects()->count() >= $this->max_projects) {
                return false;
            }

            $settings = Setting::first();
            $now = now();

            if (
                (!is_null($settings?->start_date) && $now->lt($settings->start_date)) ||
                (!is_null($settings?->end_date) && $now->gt($settings->end_date))
            ) {
                return false;
            }
        }

        return true;
    }
}
