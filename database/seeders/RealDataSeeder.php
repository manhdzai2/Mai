<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Student;
use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\Enrollment;
use App\Models\Score;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class RealDataSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('vi_VN');
        $classes = SchoolClass::all();
        $subjects = Subject::all();
        $teachers = Teacher::all();

        if ($classes->isEmpty() || $subjects->isEmpty() || $teachers->isEmpty()) {
            $this->command->error('Vui lòng chạy DatabaseSeeder trước để có dữ liệu cơ sở (Classes, Subjects, Teachers).');
            return;
        }

        $surnames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Phan', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];
        $middleNamesMale = ['Văn', 'Hữu', 'Đức', 'Minh', 'Quang', 'Anh', 'Mạnh', 'Tuấn', 'Tùng'];
        $middleNamesFemale = ['Thị', 'Ngọc', 'Bích', 'Thu', 'Hồng', 'Minh', 'Thanh', 'Diệu'];
        $firstNamesMale = ['An', 'Bình', 'Cường', 'Dũng', 'Đông', 'Giang', 'Hùng', 'Huy', 'Khải', 'Long', 'Minh', 'Nam', 'Phúc', 'Quân', 'Sơn', 'Thắng', 'Tiến', 'Trung', 'Tuấn', 'Việt'];
        $firstNamesFemale = ['Anh', 'Bích', 'Chi', 'Diệp', 'Đào', 'Hà', 'Hoa', 'Hương', 'Lan', 'Linh', 'Mai', 'Ngọc', 'Nhi', 'Oanh', 'Phương', 'Quỳnh', 'Thảo', 'Trang', 'Vân', 'Yến'];

        $countCreated = 0;
        $studentCodeIndex = 100; // Bắt đầu từ 100 để tránh trùng với seeder cũ

        foreach ($classes as $class) {
            $currentCount = Student::where('class_id', $class->id)->count();
            $needed = 30 - $currentCount;

            if ($needed <= 0) {
                $this->command->info("Lớp {$class->name} đã có đủ {$currentCount} sinh viên.");
                continue;
            }

            $this->command->info("Đang tạo thêm {$needed} sinh viên cho lớp {$class->name}...");

            for ($i = 0; $i < $needed; $i++) {
                $isMale = $faker->boolean(60); // 60% nam
                $surname = $faker->randomElement($surnames);
                $middleName = $isMale ? $faker->randomElement($middleNamesMale) : $faker->randomElement($middleNamesFemale);
                $firstName = $isMale ? $faker->randomElement($firstNamesMale) : $faker->randomElement($firstNamesFemale);
                
                $fullName = "{$surname} {$middleName} {$firstName}";
                $emailName = Str::slug($firstName . '.' . $surname . '.' . rand(100, 999));
                $email = "{$emailName}@sv.fbu.edu.vn";

                // 1. Tạo User
                $user = User::create([
                    'name' => $fullName,
                    'email' => $email,
                    'password' => Hash::make('password'),
                    'role_id' => 3, // Student
                ]);

                // 2. Tạo Student
                $studentCode = "SV2024" . str_pad($studentCodeIndex++, 3, '0', STR_PAD_LEFT);
                $student = Student::create([
                    'user_id' => $user->id,
                    'student_code' => $studentCode,
                    'class_id' => $class->id,
                    'dob' => $faker->date('Y-m-d', '2006-12-31'),
                    'gender' => $isMale ? 'male' : 'female',
                    'phone' => '09' . rand(10000000, 99999999),
                    'address' => $faker->address,
                ]);

                // 3. Đăng ký 4-6 môn học ngẫu nhiên
                $randomSubjects = $subjects->random(rand(4, 6));
                foreach ($randomSubjects as $subject) {
                    $teacher = $teachers->random();
                    
                    $enrollment = Enrollment::create([
                        'student_id' => $student->id,
                        'subject_id' => $subject->id,
                        'teacher_id' => $teacher->id,
                    ]);

                    // 4. Tạo điểm số ngẫu nhiên
                    $attendance = round(mt_rand(70, 100) / 10, 1);
                    $regular = round(mt_rand(50, 95) / 10, 1);
                    $test = round(mt_rand(50, 95) / 10, 1);
                    $midterm = round(mt_rand(40, 95) / 10, 1);
                    $final = round(mt_rand(30, 98) / 10, 1);

                    // CC(10%) + TX(10%) + KT(10%) + GK(20%) + CK(50%)
                    $total = round($attendance * 0.1 + $regular * 0.1 + $test * 0.1 + $midterm * 0.2 + $final * 0.5, 2);
                    $grade = $total >= 8.5 ? 'Giỏi' : ($total >= 7.0 ? 'Khá' : ($total >= 5.0 ? 'Trung bình' : 'Yếu'));

                    Score::create([
                        'enrollment_id' => $enrollment->id,
                        'attendance_score' => $attendance,
                        'regular_score' => $regular,
                        'test_score' => $test,
                        'midterm_score' => $midterm,
                        'final_score' => $final,
                        'total_score' => $total,
                        'grade' => $grade,
                    ]);
                }
                $countCreated++;
            }
        }

        $this->command->info("Hoàn tất! Đã tạo thêm {$countCreated} sinh viên và hàng ngàn bản ghi điểm số.");
    }
}
