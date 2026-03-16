<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Teacher;
use App\Models\Student;
use App\Models\SchoolClass;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure roles exist
        $adminRole   = Role::firstOrCreate(['name' => 'admin']);
        $teacherRole = Role::firstOrCreate(['name' => 'teacher']);
        $studentRole = Role::firstOrCreate(['name' => 'student']);

        // Admin
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name'     => 'System Admin',
                'password' => Hash::make('Admin@12345'),
                'role_id'  => $adminRole->id,
            ]
        );

        // Teacher
        $teacherUser = User::updateOrCreate(
            ['email' => 'teacher@example.com'],
            [
                'name'     => 'Teacher Demo',
                'password' => Hash::make('Teacher@123'),
                'role_id'  => $teacherRole->id,
            ]
        );

        Teacher::updateOrCreate(
            ['user_id' => $teacherUser->id],
            ['phone' => '0123456789']
        );

        // Create class for student
        $class = SchoolClass::firstOrCreate(['name' => 'CTK45B']);

        // Student
        $studentUser = User::updateOrCreate(
            ['email' => 'student@example.com'],
            [
                'name'     => 'Student Demo',
                'password' => Hash::make('Student@123'),
                'role_id'  => $studentRole->id,
            ]
        );

        Student::updateOrCreate(
            ['user_id' => $studentUser->id],
            [
                'student_code' => 'SV001',
                'class_id'     => $class->id,
            ]
        );
    }
}
