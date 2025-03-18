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
}
