<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Subject;
use App\Http\Requests\StoreEnrollmentRequest;

class EnrollmentController extends Controller
{
    public function index(): Response
    {
        $teacherId = Auth::user()->teacher->id ?? null;

        $enrollments = Enrollment::query()
            ->when($teacherId, fn($q) => $q->where('teacher_id', $teacherId))
            ->with(['student.user', 'subject', 'score'])
            ->latest('id')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Teacher/Enrollments/Index', [
            'enrollments' => $enrollments,
            'students'    => Student::with('user')->select('id', 'user_id', 'student_code')->get(),
            'subjects'    => Subject::select('id', 'name')->get(),
        ]);
    }

    public function store(StoreEnrollmentRequest $request): RedirectResponse
    {
        $data = $request->validated();
        if (!isset($data['teacher_id'])) {
            $data['teacher_id'] = Auth::user()->teacher->id ?? null;
        }
        Enrollment::create($data);

        return back()->with('success', 'Đã tạo đăng ký học phần.');
    }

    public function destroy(Enrollment $enrollment): RedirectResponse
    {
        $this->authorizeTeacher($enrollment->teacher_id);
        $enrollment->delete();

        return back()->with('success', 'Đã xóa đăng ký.');
    }

    private function authorizeTeacher(?int $teacherId): void
    {
        $current = auth()->user()->teacher->id ?? null;
        if (!$current || $current !== $teacherId) {
            abort(403, 'Bạn không có quyền với học phần này.');
        }
    }
}
