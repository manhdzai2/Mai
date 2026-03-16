<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Khai báo các Controllers của Admin
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Admin\ClassController;

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
// Đã fix lỗi 404 và lỗi PUT bằng cách dùng Resource chuẩn
Route::middleware(['auth', 'ensure.admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        
        // Dashboard Admin
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // CRUD Môn học (Gồm index, create, store, edit, update, destroy)
        Route::resource('subjects', SubjectController::class);

        // CRUD Lớp học (Gồm index, create, store, edit, update, destroy)
        // Lưu ý: Không thêm Route::put riêng lẻ ở đây để tránh xung đột
        Route::resource('classes', ClassController::class);
    });

// 5. CÁC ROUTE AUTH (Breeze)
require __DIR__.'/auth.php';