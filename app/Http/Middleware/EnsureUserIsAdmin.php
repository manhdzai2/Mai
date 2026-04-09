<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Enums\RoleEnum;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        // Sử dụng Enum để so sánh chắc chắn và chuyên nghiệp
        if (!Auth::check() || Auth::user()->role_id !== RoleEnum::ADMIN) {
            $currentRole = Auth::check() ? (Auth::user()->role_id->label() ?? 'N/A') : 'Chưa đăng nhập';
            abort(403, 'BẠN KHÔNG CÓ QUYỀN TRUY CẬP KHU VỰC NÀY. Quyền hiện tại: ' . $currentRole);
        }
        
        return $next($request);
    }
}