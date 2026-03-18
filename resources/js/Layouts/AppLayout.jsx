import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Link, usePage } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function AppLayout({ children }) {
    const { auth, flash } = usePage().props;

    const roleName = (auth?.user?.role?.name || '').toLowerCase();
    const roleId = auth?.user?.role_id;
    const _role = roleName || (roleId === 1 ? 'admin' : roleId === 2 ? 'teacher' : roleId === 3 ? 'student' : '');

    // --- CẤU HÌNH MENU CÓ KÈM ICON ---
    const navAdmin = [
        { title: 'Tổng quan', href: '/admin/dashboard', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
        { title: 'Môn học', href: '/admin/subjects', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
        { title: 'Lớp học', href: '/admin/classrooms', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-5 8H8a2 2 0 00-2-2V7a2 2 0 002-2h8a2 2 0 002 2v12a2 2 0 00-2 2h-4z" /></svg> }, { title: 'Sinh viên', href: '/admin/students', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
        { title: 'Bảng điểm', href: '/admin/scores', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    ];

    const navTeacher = [
        { title: 'Lớp học của tôi', href: '/teacher/enrollments', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> }
    ];

    // ĐÃ THÊM LỊCH HỌC VÀO ĐÂY CHO SINH VIÊN
    const navStudent = [
        {
            title: 'Bảng điểm',
            href: '/student/profile',
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        },
        {
            title: 'Lịch học',
            href: '/student/schedule',
            icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        }
    ];

    const nav = _role === 'admin' ? navAdmin : _role === 'teacher' ? navTeacher : navStudent;

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
            <Topbar user={auth?.user} role={_role} />
            <div className="flex flex-1 overflow-hidden max-w-[1600px] mx-auto w-full">
                <Sidebar nav={nav} />
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {flash?.success && <Banner type="success" message={flash.success} />}
                        {flash?.error && <Banner type="error" message={flash.error} />}

                        <div className="animate-fade-in-up">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}

// ---------------- CÁC COMPONENT CON ---------------- //

function Topbar({ user, role }) {
    return (
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl">
                        <Logo />
                    </div>
                    <div>
                        <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">
                            UniCore
                        </span>
                        <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest -mt-1">
                            Student Management
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <ThemeToggle />

                    <div className="hidden md:flex items-center gap-3 border-l border-gray-200 dark:border-gray-700 pl-5">
                        <div className="text-right">
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-none">
                                {user?.name || 'Khách'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mt-1">
                                {role === 'teacher' ? 'Giảng viên' : role === 'admin' ? 'Quản trị viên' : 'Sinh viên'}
                            </p>
                        </div>
                        <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-700">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                    </div>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-full transition"
                        title="Đăng xuất"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    </Link>
                </div>

            </div>
        </header>
    );
}

function Sidebar({ nav }) {
    const { url } = usePage();

    return (
        <aside className="w-64 shrink-0 bg-transparent hidden md:block border-r border-gray-100 dark:border-gray-800 transition-colors duration-300 py-6 px-4">
            <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 px-3">
                Menu chính
            </div>

            <nav className="space-y-1.5">
                {nav.map(item => {
                    const isActive = url.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm border border-indigo-100 dark:border-indigo-500/20'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 hover:shadow-sm'
                                }`}
                        >
                            <span className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}>
                                {item.icon}
                            </span>
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
    return (
        <div className={`mb-6 p-4 rounded-2xl flex items-center gap-4 border shadow-sm ${isSuccess
                ? 'bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/50'
                : 'bg-rose-50/50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/50'
            }`}>
            <div className={`p-2 rounded-full ${isSuccess ? 'bg-emerald-100 dark:bg-emerald-800/50' : 'bg-rose-100 dark:bg-rose-800/50'}`}>
                {isSuccess ? (
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                ) : (
                    <svg className="w-5 h-5 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                )}
            </div>
            <span className="font-medium text-sm">{message}</span>
        </div>
    );
}

function Logo() {
    return (
        <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
    );
}