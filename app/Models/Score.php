<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Score extends Model
{
    protected $fillable = [
        'enrollment_id',
        'attendance_score',
        'midterm_score',
        'final_score',
        'total_score',
        'grade',
    ];

    protected $casts = [
        'attendance_score' => 'float',
        'midterm_score'    => 'float',
        'final_score'      => 'float',
        'total_score'      => 'float',
    ];

    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }
}