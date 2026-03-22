<?php

use App\Http\Controllers\ProfileController; // Của Breeze (đổi mật khẩu, xóa tài khoản...)
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Khai báo các Controllers của Admin
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Admin\ClassController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\ClassroomController;
use App\Http\Controllers\Admin\ScoreController;

// Khai báo Controller của Teacher
use App\Http\Controllers\Teacher\EnrollmentController;

// Khai báo Controller của Student (Dùng alias để không bị trùng tên với ProfileController của Breeze)
use App\Http\Controllers\Student\ProfileController as StudentProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// 1. TRANG CHỦ
Route::get('/', function () {
    return redirect()->route('login');
});

// 2. DASHBOARD CHUNG (Người điều phối giao thông)
Route::get('/dashboard', function () {
    $user = auth()->user();

    // Phân luồng dựa theo role_id (Giả sử 1: Admin, 2: Teacher, 3: Student)
    if ($user->role_id == 1) {
        return redirect()->route('admin.dashboard');
    } elseif ($user->role_id == 2) {
        return redirect()->route('teacher.enrollments.index');
    } elseif ($user->role_id == 3) {
        return redirect()->route('student.profile');
    }

    // Nếu không thuộc role nào ở trên thì cho vào trang mặc định
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 3. NHÓM ROUTE YÊU CẦU ĐĂNG NHẬP (Cài đặt tài khoản chung)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Global Search API
    Route::get('/search', [\App\Http\Controllers\SearchController::class, 'search'])->name('global.search');
});

// 4. NHÓM ROUTE DÀNH RIÊNG CHO ADMIN
Route::middleware(['auth', 'ensure.admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('subjects', SubjectController::class);
        Route::resource('classes', ClassController::class);
        Route::resource('students', StudentController::class);
        Route::resource('teachers', TeacherController::class);
        Route::resource('classrooms', ClassroomController::class);
        Route::resource('scores', ScoreController::class)->only(['index']);
    });

// 5. NHÓM ROUTE DÀNH CHO TEACHER
Route::middleware(['auth'])->prefix('teacher')->name('teacher.')->group(function () {
    // Trang danh sách học phần đang dạy
    Route::get('/enrollments', [EnrollmentController::class, 'index'])->name('enrollments.index');
    
    // Trang chi tiết lớp học (Xem danh sách SV & Nhập điểm)
    Route::get('/enrollments/{subject_id}/{semester}', [EnrollmentController::class, 'show'])->name('enrollments.show');
    
    // Route xử lý lưu điểm tự động (Khớp với React gọi lên)
    Route::post('/enrollments/update-score', [EnrollmentController::class, 'updateScore'])->name('enrollments.update-score');
});

// 6. NHÓM ROUTE DÀNH CHO STUDENT
Route::middleware(['auth'])->prefix('student')->name('student.')->group(function () {
    // Trang xem bảng điểm (127.0.0.1:8000/student/profile)
    Route::get('/profile', [StudentProfileController::class, 'index'])->name('profile');
    
    // Trang lịch học (Bỏ chữ student ở đây vì đã có prefix ở trên)
    // Đường dẫn thực tế sẽ là: 127.0.0.1:8000/student/schedule
    Route::get('/schedule', [StudentProfileController::class, 'schedule'])->name('schedule');
    
    // Trang Hỗ trợ sinh viên AI
    Route::get('/support', [StudentProfileController::class, 'support'])->name('support');
});

// 7. CÁC ROUTE AUTH (Breeze)
require __DIR__.'/auth.php';

