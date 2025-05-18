<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectInvite extends Model
{
    use HasFactory;

    protected $table = 'project_invites';

    protected $fillable = [
        'user_id',
        'project_id',
        'vacancy_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function vacancy()
    {
        return $this->belongsTo(Vacancy::class);
    }
}
