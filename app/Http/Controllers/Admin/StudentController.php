<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $students = Student::query()
            ->with('user') // Nạp sẵn thông tin user (name, email)
            ->when($request->search, function ($query, $search) {
                $query->where('student_code', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%");
                    });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Students/Form', ['student' => null]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'student_code' => 'required|string|max:50|unique:students',
        ]);

        // Dùng Transaction để đảm bảo tính toàn vẹn dữ liệu
        DB::transaction(function () use ($validated) {
            // 1. Tạo User trước
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role_id' => 3, // <--- BẠN BỔ SUNG THÊM DÒNG NÀY NHÉ
            ]);

            // 2. Tạo Student liên kết với User vừa tạo
            Student::create([
                'user_id' => $user->id,
                'student_code' => $validated['student_code'],
            ]);
        });

        return redirect()->route('admin.students.index')->with('success', 'Thêm sinh viên thành công');
    }

    public function edit($id)
    {
        $student = Student::with('user')->findOrFail($id);
        
        return Inertia::render('Admin/Students/Form', [
            'student' => $student
        ]);
    }

    public function show($id)
    {
        $student = Student::with([
            'user',
            'class',
            'enrollments.subject',
            'enrollments.score',
            'enrollments.teacher.user',
        ])->findOrFail($id);

        return Inertia::render('Admin/Students/Show', [
            'student' => $student,
        ]);
    }

    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);
        $user = User::findOrFail($student->user_id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'student_code' => 'required|string|max:50|unique:students,student_code,' . $student->id,
            'password' => 'nullable|string|min:8', // Cho phép không đổi mật khẩu
        ]);

        DB::transaction(function () use ($validated, $user, $student) {
            // Cập nhật User
            $userData = [
                'name' => $validated['name'],
                'email' => $validated['email'],
            ];
            if (!empty($validated['password'])) {
                $userData['password'] = Hash::make($validated['password']);
            }
            $user->update($userData);

            // Cập nhật Student
            $student->update([
                'student_code' => $validated['student_code'],
            ]);
        });

        return redirect()->route('admin.students.index')->with('success', 'Cập nhật thành công');
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        
        DB::transaction(function () use ($student) {
            $user_id = $student->user_id;
            $student->delete(); // Xóa student trước
            User::destroy($user_id); // Xóa luôn tài khoản user
        });

        return back()->with('success', 'Đã xóa sinh viên');
    }
}