<?php

namespace App\Enums;

enum RoleEnum: int
{
    case ADMIN = 1;
    case TEACHER = 2;
    case STUDENT = 3;

    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'Quản trị viên',
            self::TEACHER => 'Giảng viên',
            self::STUDENT => 'Sinh viên',
        };
    }
}
