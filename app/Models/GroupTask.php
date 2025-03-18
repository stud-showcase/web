<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupTask extends Model
{
    use HasFactory;

    protected $table = 'group_task';

    public $timestamps = false;

    protected $fillable = [
        'group_id',
        'task_id'
    ];
}
