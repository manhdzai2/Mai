<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\SchoolClass;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CourseAssignmentController extends Controller
{
    /**
     * Display a listing of course assignments (grouped enrollments).
     */
    public function index()
    {
        // Nhóm các enrollment theo Môn học, Giáo viên, Lớp, Học kỳ và Năm học
        $assignments = Enrollment::join('students', 'enrollments.student_id', '=', 'students.id')
            ->join('classes', 'students.class_id', '=', 'classes.id')
            ->join('subjects', 'enrollments.subject_id', '=', 'subjects.id')
            ->join('teachers', 'enrollments.teacher_id', '=', 'teachers.id')
            ->join('users', 'teachers.user_id', '=', 'users.id')
            ->select(
                'enrollments.subject_id',
                'enrollments.teacher_id',
                'students.class_id',
                'enrollments.semester',
                'enrollments.academic_year',
                'subjects.name as subject_name',
                'users.name as teacher_name',
                'classes.name as class_name',
                DB::raw('count(enrollments.student_id) as student_count')
            )
            ->groupBy(
                'enrollments.subject_id', 
                'enrollments.teacher_id', 
                'students.class_id', 
                'enrollments.semester', 
                'enrollments.academic_year', 
                'subjects.name', 
                'users.name', 
                'classes.name'
            )
            ->get();

        return Inertia::render('Admin/CourseAssignments/Index', [
            'assignments' => $assignments
        ]);
    }

    /**
     * Show the form for creating a new course assignment.
     */
    public function create()
    {
        return Inertia::render('Admin/CourseAssignments/Form', [
            'subjects' => Subject::all(),
            'teachers' => Teacher::with('user')->get()->map(fn($t) => [
                'id' => $t->id,
                'name' => $t->user->name
            ]),
            'classes' => SchoolClass::all(),
            'students' => Student::with('user', 'class')->get()->map(fn($s) => [
                'id' => $s->id,
                'name' => $s->user->name,
                'code' => $s->student_code,
                'class_name' => $s->class->name ?? 'N/A'
            ]),
        ]);
    }

    /**
     * Store a newly created course assignment (Bulk Enrollment).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject_id'    => 'required|exists:subjects,id',
            'teacher_id'    => 'required|exists:teachers,id',
            'semester'      => 'required|integer|min:1|max:3',
            'academic_year' => 'required|string|max:20',
            'class_id'      => 'nullable|exists:classes,id',
            'student_ids'   => 'nullable|array',
            'student_ids.*' => 'exists:students,id',
        ]);

        $studentIds = [];

        if (!empty($validated['student_ids'])) {
            $studentIds = $validated['student_ids'];
        } elseif (!empty($validated['class_id'])) {
            $studentIds = Student::where('class_id', $validated['class_id'])->pluck('id')->toArray();
        }

        if (empty($studentIds)) {
            return back()->with('error', 'Vui lòng chọn ít nhất một sinh viên hoặc một lớp.');
        }

        DB::transaction(function () use ($validated, $studentIds) {
            foreach ($studentIds as $id) {
                Enrollment::updateOrCreate(
                    [
                        'student_id' => $id,
                        'subject_id' => $validated['subject_id'],
                        'semester'   => $validated['semester'],
                        'academic_year' => $validated['academic_year'],
                    ],
                    [
                        'teacher_id' => $validated['teacher_id'],
                    ]
                );
            }
        });

        // Log một hoạt động thật vào activity log (nếu muốn)
        activity()
            ->causedBy(auth()->user())
            ->log("Đã phân công giảng dạy môn học cho " . count($studentIds) . " sinh viên.");


        return redirect()->route('admin.course-assignments.index')
            ->with('success', "Đã phân công giảng dạy thành công cho " . count($studentIds) . " sinh viên.");
    }


    /**
     * Remove the specified course assignment (Bulk Unenroll).
     */
    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'subject_id' => 'required',
            'teacher_id' => 'required',
            'class_id'   => 'required',
        ]);

        $studentIds = Student::where('class_id', $validated['class_id'])->pluck('id');

        Enrollment::whereIn('student_id', $studentIds)
            ->where('subject_id', $validated['subject_id'])
            ->where('teacher_id', $validated['teacher_id'])
            ->delete();

        return back()->with('success', 'Đã xóa phân công giảng dạy thành công.');
    }
}
