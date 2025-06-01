<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complexity extends Model
{
    use HasFactory;

    public $timestamps = false;

    public const COMPLEXITY_EASY = 1;
    public const COMPLEXITY_MEDIUM = 2;
    public const COMPLEXITY_HARD = 3;

    protected $table = 'complexities';


    protected $fillable = [
        'id',
        'name'
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
