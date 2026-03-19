<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Subject;
use App\Models\Score;
use App\Models\Schedule;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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

        // Lịch thi sắp tới — lấy từ schedules trong DB
        $upcomingExams = Schedule::with('subject')
            ->orderBy('study_date')
            ->orderBy('start_time')
            ->limit(5)
            ->get()
            ->map(function ($sched) {
                // Đếm số sinh viên đăng ký môn này
                $studentCount = \App\Models\Enrollment::where('subject_id', $sched->subject_id)->count();
                return [
                    'subject_id' => $sched->subject_id,
                    'subject' => $sched->subject->name ?? 'Chưa rõ',
                    'code' => $sched->subject->code ?? '',
                    'date' => Carbon::parse($sched->study_date)->format('d/m/Y'),
                    'time' => Carbon::parse($sched->start_time)->format('H:i'),
                    'room' => $sched->room,
                    'student_count' => $studentCount,
                ];
            });

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
            'upcomingExams' => $upcomingExams,
        ]);
    }
}
