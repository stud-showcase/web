<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complexity extends Model
{
    use HasFactory;

    protected $table = 'complexities';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'name'
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
