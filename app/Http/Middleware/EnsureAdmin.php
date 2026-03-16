<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Kiểm tra xem user có tồn tại và có phải là Admin không.
        // Dựa theo code cũ của bạn: role_id = 1 là Admin.
        // Tôi bổ sung thêm cả điều kiện role = 'admin' đề phòng DB của bạn dùng dạng chữ.
        if ($user && ($user->role_id == 1 || $user->role === 'admin')) {
            return $next($request);
        }
        
        // Nếu không thỏa mãn, đẩy ra lỗi 403
        abort(403, 'BẠN KHÔNG CÓ QUYỀN TRUY CẬP KHU VỰC NÀY.');
    }
}