<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Subject;
use App\Models\Score;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user || $user->role_id !== 2 || !$user->teacher) {
            abort(403, 'Truy cập bị từ chối. Không tìm thấy hồ sơ giảng viên.');
        }

        $teacherId = $user->teacher->id;

        // CHỈ gom nhóm theo subject_id, KHÔNG dính dáng đến semester nữa
        $courses = Enrollment::with('subject')
            ->where('teacher_id', $teacherId)
            ->selectRaw('subject_id, COUNT(student_id) as total_students')
            ->groupBy('subject_id')
            ->get()
            ->map(function ($enrollment) {
                return [
                    'subject_id'     => $enrollment->subject_id,
                    'subject_name'   => $enrollment->subject ? $enrollment->subject->name : 'Môn học không xác định',
                    'credit'         => $enrollment->subject ? $enrollment->subject->credit : 0,
                    // Giả lập kỳ 1 để Front-end React không bị lỗi hiển thị
                    'semester'       => 1, 
                    'total_students' => $enrollment->total_students,
                ];
            });

        return Inertia::render('Teacher/Enrollments/Index', [
            'courses' => $courses
        ]);
    }

    public function show($subject_id, $semester = 1)
    {
        $teacherId = Auth::user()->teacher->id;
        $subject = Subject::findOrFail($subject_id);

        // Chỉ tìm theo teacher_id và subject_id
        $enrollments = Enrollment::with(['student.user', 'score'])
            ->where('teacher_id', $teacherId)
            ->where('subject_id', $subject_id)
            ->get();

        return Inertia::render('Teacher/Enrollments/Show', [
            'subject' => $subject,
            'semester' => $semester, // Trả về giao diện số 1 giả lập ở trên
            'enrollments' => $enrollments
        ]);
    }

    public function updateScore(Request $request)
    {
        $request->validate([
            'enrollment_id' => 'required|exists:enrollments,id',
            'attendance_score' => 'nullable|numeric|min:0|max:10',
            'midterm_score' => 'nullable|numeric|min:0|max:10',
            'final_score' => 'nullable|numeric|min:0|max:10',
        ]);

        $enrollment = Enrollment::findOrFail($request->enrollment_id);

        if ($enrollment->teacher_id !== Auth::user()->teacher->id) {
            abort(403, 'Bạn không có quyền chấm điểm lớp này.');
        }

        $score = Score::firstOrNew(['enrollment_id' => $enrollment->id]);

        if ($request->has('attendance_score')) $score->attendance_score = $request->attendance_score;
        if ($request->has('midterm_score')) $score->midterm_score = $request->midterm_score;
        if ($request->has('final_score')) $score->final_score = $request->final_score;

        $score->save(); 

        return back();
    }
}