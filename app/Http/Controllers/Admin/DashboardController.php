<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Subject;
use App\Models\SchoolClass;
use App\Models\Score;
use App\Models\Schedule;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(): Response
    {
        // 1. Số liệu tổng quan
        $totalStudents = Student::count();
        $totalTeachers = Teacher::count();
        $totalSubjects = Subject::count();
        $totalClasses  = SchoolClass::count();

        // 1.1 Tính số lượng Lớp học phần (Dựa trên nhóm Enrollment)
        $totalCourseUnits = \App\Models\Enrollment::join('students', 'enrollments.student_id', '=', 'students.id')
            ->select('enrollments.subject_id', 'enrollments.teacher_id', 'students.class_id')
            ->groupBy('enrollments.subject_id', 'enrollments.teacher_id', 'students.class_id')
            ->get()
            ->count();


        // 2. Phổ điểm theo grade
        $gradeStats = Score::select('grade', DB::raw('COUNT(*) as count'))
            ->groupBy('grade')
            ->pluck('count', 'grade');

        // 3. Phân bổ sinh viên theo lớp (Dữ liệu cho biểu đồ cột mới)
        $classDistribution = SchoolClass::withCount('students')->get()->map(function($c) {
            return ['name' => $c->name, 'students' => $c->students_count];
        });

        // 4. Điểm trung cộng tốt nhất (Top 5 Sinh viên)
        $topStudents = Student::query()
            ->join('users', 'students.user_id', '=', 'users.id')
            ->join('enrollments', 'students.id', '=', 'enrollments.student_id')
            ->join('scores', 'enrollments.id', '=', 'scores.enrollment_id')
            ->select('students.id', 'users.name', 'students.student_code', DB::raw('ROUND(AVG(scores.total_score), 2) as avg_score'))
            ->groupBy('students.id', 'users.name', 'students.student_code')
            ->orderByDesc('avg_score')
            ->limit(5)
            ->get();

        // 5. Tổng quan tài chính (Tạm tính)
        $financial = [
            'total_tuition' => \App\Models\TuitionFee::sum('total_amount'),
            'total_paid'    => \App\Models\TuitionFee::sum('paid_amount'),
        ];

        // 6. Hoạt động gần đây (Lấy dữ liệu thực tế từ Enrollments mới nhất)
        $recentActivities = \App\Models\Enrollment::with(['subject', 'teacher.user', 'student.class'])
            ->latest()
            ->limit(10)
            ->get()
            ->unique(function ($item) {
                return $item->subject_id . '-' . $item->teacher_id . '-' . ($item->student->class_id ?? '0');
            })
            ->take(6)
            ->map(function ($act) {
                $className = $act->student->class->name ?? 'N/A';
                return [
                    'id' => $act->id,
                    'description' => "Phân công dạy môn {$act->subject->name} cho lớp {$className}",
                    'causer' => $act->teacher->user->name ?? 'Hệ thống',
                    'time' => $act->created_at->diffForHumans(),
                ];
            });

        // Nếu vẫn trống hoàn toàn (dự án mới), mới hiện thông báo trống thay vì mockup
        if ($recentActivities->isEmpty()) {
            $recentActivities = collect([
                ['id' => 0, 'description' => 'Chưa có hoạt động phân công nào gần đây.', 'causer' => 'Hệ thống', 'time' => 'Nội bộ'],
            ]);
        }


        return Inertia::render('Admin/Dashboard', [
            'cards' => [
                'students' => $totalStudents,
                'teachers' => $totalTeachers,
                'subjects' => $totalSubjects,
                'classes'  => $totalClasses,
                'courseUnits' => $totalCourseUnits,
            ],

            'financial' => $financial,
            'gradeStats' => [
                'Gioi' => (int) ($gradeStats['Giỏi'] ?? 0),
                'Kha'  => (int) ($gradeStats['Khá'] ?? 0),
                'TB'   => (int) ($gradeStats['Trung bình'] ?? 0),
                'Yeu'  => (int) ($gradeStats['Yếu'] ?? 0),
            ],
            'classDistribution' => $classDistribution,
            'topStudents' => $topStudents,
            'recentActivities' => $recentActivities,
        ]);
    }
}
