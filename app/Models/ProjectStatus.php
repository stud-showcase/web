<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectStatus extends Model
{
    use HasFactory;

    public const STATUS_WAITING = 1;
    public const STATUS_PROGRESS = 2;
    public const STATUS_COMPLETED = 3;

    protected $table = 'project_status';

    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class, 'status_id');
    }
}
