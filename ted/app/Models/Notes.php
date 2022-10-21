<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    use HasFactory;
    protected $table = 'notes';
    protected $fillable = [
        'id',
        'tckno',
        'quiz1',
        'quiz2',
        'quiz3',
        'perform1',
        'perform2',
        'project'
    ];
}
