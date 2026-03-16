<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index(Request $request)
    {
        $subjects = Subject::query()
            ->when($request->search, fn($q, $search) => $q->where('name', 'like', "%{$search}%"))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Subjects/Index', [
            'subjects' => $subjects,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Subjects/Form', ['mode' => 'create', 'subjectData' => null]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'credit' => 'required|integer|min:1|max:10',
        ]);
        Subject::create($data);
        return redirect()->route('admin.subjects.index')->with('success', 'Thêm môn học thành công');
    }

    public function edit($id)
    {
        // Tìm môn học theo ID
        $subject = \App\Models\Subject::findOrFail($id);
        
        // Gửi dữ liệu môn học đó sang giao diện Form.jsx
        return Inertia::render('Admin/Subjects/Form', [
            'subject' => $subject
        ]);
    }

    public function show($id)
    {
        // 1. Lấy thông tin môn học
        $subject = \App\Models\Subject::findOrFail($id);

        // 2. Lấy danh sách sinh viên đã đăng ký môn này (từ bảng enrollments)
        // Kết hợp lấy luôn tên Giảng viên phụ trách (nếu có)
        $enrollments = \App\Models\Enrollment::where('subject_id', $id)
            ->join('students', 'enrollments.student_id', '=', 'students.id')
            ->join('users', 'students.user_id', '=', 'users.id')
            ->leftJoin('teachers', 'enrollments.teacher_id', '=', 'teachers.id')
            ->leftJoin('users as teacher_users', 'teachers.user_id', '=', 'teacher_users.id')
            ->select(
                'students.student_code',
                'users.name as student_name',
                'users.email as student_email',
                'teacher_users.name as teacher_name'
            )
            ->orderBy('users.name', 'asc')
            ->get();

        return \Inertia\Inertia::render('Admin/Subjects/Show', [
            'subjectData' => $subject,
            'enrollments' => $enrollments
        ]);
    }
    public function update(Request $request, $id)
    {
        // 1. Tìm lại môn học cần sửa
        $subject = \App\Models\Subject::findOrFail($id);
        
        // 2. Kiểm tra dữ liệu hợp lệ
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'credit' => 'required|integer|min:1|max:15',
        ]);

        // 3. Cập nhật vào Database (Tuyệt đối không dùng Subject::create ở đây)
        $subject->update($validated);

        // 4. Quay về trang danh sách
        return redirect()->route('admin.subjects.index');
    }

    public function destroy(Subject $subject)
    {
        $subject->delete();
        return back()->with('success', 'Đã xóa môn học');
    }
}