import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle'; // <-- Import component nút bấm giao diện

export default function AppLayout({ children }) {
    // Lấy thông tin người dùng và thông báo flash từ server (thông qua Inertia)
    const { auth, flash } = usePage().props;
    
    // Xử lý an toàn để lấy role (vai trò) của user
    const roleName = (auth?.user?.role?.name || '').toLowerCase();
    const roleId = auth?.user?.role_id;
    const _role = roleName || (roleId === 1 ? 'admin' : roleId === 2 ? 'teacher' : roleId === 3 ? 'student' : '');

    // Khai báo menu cho từng nhóm quyền
    const navAdmin = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Môn học', href: '/admin/subjects' },
        { title: 'Lớp học', href: '/admin/classes' },
    ];
    
    const navTeacher = [
        { title: 'Học phần', href: '/teacher/enrollments' }
    ];
    
    const navStudent = [
        { title: 'Hồ sơ', href: '/student/profile' }
    ];
    
    // Quyết định dùng menu nào dựa vào role
    const nav = _role === 'admin' ? navAdmin : _role === 'teacher' ? navTeacher : navStudent;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
            <Topbar user={auth?.user} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar nav={nav} />
                <main className="flex-1 p-6 overflow-y-auto">
                    {/* Hiển thị Flash Message nếu có */}
                    {flash?.success && <Banner type="success" message={flash.success} />}
                    {flash?.error && <Banner type="error" message={flash.error} />}
                    
                    {/* Nội dung của từng trang (Index, Form, v.v.) sẽ được chèn vào đây */}
                    {children}
                </main>
            </div>
        </div>
    );
}

// ---------------- CÁC COMPONENT CON ---------------- //

function Topbar({ user }) {
    return (
        <header className="sticky top-0 z-30 bg-white/70 dark:bg-gray-900/80 backdrop-blur border-b dark:border-gray-800 transition-colors duration-300">
            <div className="mx-auto px-4 py-3 flex items-center justify-between">
                
                {/* Logo & Tên dự án */}
                <div className="flex items-center gap-3">
                    <Logo />
                    <span className="font-bold text-lg text-indigo-700 dark:text-indigo-400 transition-colors">
                        Student Management
                    </span>
                </div>
                
                {/* Thông tin user, Nút Đổi màu & Nút Logout */}
                <div className="flex items-center gap-4">
                    
                    {/* --- NÚT ĐỔI GIAO DIỆN SÁNG/TỐI (THEME TOGGLE) --- */}
                    <ThemeToggle />

                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                        Chào, {user?.name || 'Khách'}
                    </span>
                    
                    {/* Nút đăng xuất dùng thẻ Link của Inertia */}
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-sm px-4 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 transition shadow-sm"
                    >
                        Đăng xuất
                    </Link>
                </div>
                
            </div>
        </header>
    );
}

function Sidebar({ nav }) {
    // Lấy URL hiện tại để bôi đậm menu đang chọn
    const { url } = usePage();

    return (
        <aside className="w-64 shrink-0 border-r dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur hidden md:block overflow-y-auto transition-colors duration-300">
            <nav className="p-4 space-y-2">
                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-3">
                    Bảng điều khiển
                </div>
                
                {nav.map(item => {
                    // Kiểm tra xem URL hiện tại có bắt đầu bằng href của menu không (để active)
                    const isActive = url.startsWith(item.href);
                    
                    return (
                        <Link 
                            key={item.href} 
                            href={item.href} 
                            className={`block px-3 py-2.5 rounded-md text-sm transition-colors duration-150 ${
                                isActive 
                                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold' 
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            {item.title}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}

function Banner({ type = 'success', message }) {
    const isSuccess = type === 'success';
    const colorClass = isSuccess 
        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50' 
        : 'bg-rose-50 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/50';
        
    return (
        <div className={`mb-6 border ${colorClass} px-4 py-3 rounded-lg shadow-sm flex items-center gap-3 transition-colors duration-300`}>
            {/* Thêm icon cho đẹp */}
            {isSuccess ? (
                <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            ) : (
                <svg className="w-5 h-5 text-rose-500 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            )}
            <span className="font-medium">{message}</span>
        </div>
    );
}

function Logo() {
    return (
        <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400 drop-shadow-sm transition-colors" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l9 4.5v6c0 5-4 9-9 9s-9-4-9-9v-6L12 2z" />
        </svg>
    );
}