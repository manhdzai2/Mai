<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function index(): Response
    {
        $student = Auth::user()->student()->with([
            'class',
            'enrollments.subject',
            'enrollments.score'
        ])->first();

        return Inertia::render('Student/Profile', [
            'student'     => $student,
            'transcripts' => $student?->enrollments->map(function ($en) {
                return [
                    'subject' => $en->subject->name,
                    'term'    => $en->term,
                    'scores'  => [
                        'attendance' => $en->score->attendance_score ?? null,
                        'midterm'    => $en->score->midterm_score ?? null,
                        'final'      => $en->score->final_score ?? null,
                        'total'      => $en->score->total_score ?? null,
                        'grade'      => $en->score->grade ?? null,
                    ],
                ];
            }),
        ]);
    }
}