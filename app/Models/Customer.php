<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function taskRequests()
    {
        return $this->hasMany(TaskRequest::class);
    }
}
