<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Subject;
use App\Models\Score;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(): Response
    {
        // Số liệu tổng quan
        $totalStudents = Student::count();
        $totalTeachers = Teacher::count();
        $totalSubjects = Subject::count();

        // Phổ điểm theo grade
        $gradeStats = Score::select('grade', DB::raw('COUNT(*) as count'))
            ->groupBy('grade')
            ->pluck('count', 'grade');

        // Điểm trung bình theo môn
        $subjectAverages = Score::query()
            ->join('enrollments', 'scores.enrollment_id', '=', 'enrollments.id')
            ->join('subjects', 'enrollments.subject_id', '=', 'subjects.id')
            ->select('subjects.name as subject', DB::raw('ROUND(AVG(scores.total_score),2) as avg_score'))
            ->groupBy('subjects.name')
            ->orderByDesc('avg_score')
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'cards' => [
                'students' => $totalStudents,
                'teachers' => $totalTeachers,
                'subjects' => $totalSubjects,
            ],
            'gradeStats' => [
                'Gioi' => (int) ($gradeStats['Giỏi'] ?? 0),
                'Kha'  => (int) ($gradeStats['Khá'] ?? 0),
                'TB'   => (int) ($gradeStats['Trung bình'] ?? 0),
                'Yeu'  => (int) ($gradeStats['Yếu'] ?? 0),
            ],
            'subjectAverages' => $subjectAverages,
        ]);
    }
}
