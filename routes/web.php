<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Khai báo các Controllers của Admin
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Admin\ClassController;

// Khai báo Controller của Teacher
use App\Http\Controllers\Teacher\EnrollmentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// 1. TRANG CHỦ
Route::get('/', function () {
    return redirect()->route('login');
});

// 2. DASHBOARD CHUNG (Dành cho Sinh viên/Giảng viên)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 3. NHÓM ROUTE YÊU CẦU ĐĂNG NHẬP
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// 4. NHÓM ROUTE DÀNH RIÊNG CHO ADMIN
Route::middleware(['auth', 'ensure.admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('subjects', SubjectController::class);
        Route::resource('classes', ClassController::class);
    });

// 5. CÁC ROUTE AUTH (Breeze)
require __DIR__.'/auth.php';

// 6. NHÓM ROUTE DÀNH CHO TEACHER
Route::middleware(['auth'])->prefix('teacher')->name('teacher.')->group(function () {
    
    // Trang danh sách học phần đang dạy (Hiển thị dạng Grid)
    Route::get('/enrollments', [EnrollmentController::class, 'index'])->name('enrollments.index');
    
    // Trang chi tiết lớp học (Xem danh sách SV & Nhập điểm)
    Route::get('/enrollments/{subject_id}/{semester}', [EnrollmentController::class, 'show'])->name('enrollments.show');
    
    // Route xử lý lưu điểm tự động (Khi giảng viên nhập điểm)
    Route::post('/scores/update', [EnrollmentController::class, 'updateScore'])->name('scores.update');
});