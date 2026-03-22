<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Score extends Model
{
    protected $fillable = [
        'enrollment_id',
        'attendance_score',
        'regular_score',
        'test_score',
        'midterm_score',
        'final_score',
        'total_score',
        'grade',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($score) {
            // Formula: ATT*0.1 + REG*0.1 + TEST*0.1 + MID*0.2 + FIN*0.5
            $total = ($score->attendance_score * 0.1) + 
                     ($score->regular_score * 0.1) + 
                     ($score->test_score * 0.1) + 
                     ($score->midterm_score * 0.2) + 
                     ($score->final_score * 0.5);
            
            $score->total_score = round($total, 2);

            // Grade mapping
            if ($total >= 8.5) {
                $score->grade = 'Giỏi';
            } elseif ($total >= 7.0) {
                $score->grade = 'Khá';
            } elseif ($total >= 5.0) {
                $score->grade = 'Trung bình';
            } elseif ($total >= 4.0) {
                $score->grade = 'Yếu';
            } else {
                $score->grade = 'Kém';
            }
        });
    }

    protected $casts = [
        'attendance_score' => 'float',
        'regular_score'    => 'float',
        'test_score'       => 'float',
        'midterm_score'    => 'float',
        'final_score'      => 'float',
        'total_score'      => 'float',
    ];

    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }
}