import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, usePage } from '@inertiajs/react';

export default function StudentLayout({ children }) {
    const { auth, url } = usePage().props;
    const user = auth?.user;

    const navItems = [
        { title: 'Hồ sơ cá nhân', href: '/student/profile', icon: 'person_2' },
        { title: 'Lịch & Bảng điểm', href: '/student/schedule', icon: 'assignment_turned_in' },
        { title: 'Hỗ trợ (AI)', href: '/student/support', icon: 'support_agent' }
    ];

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.theme = isDark ? 'dark' : 'light';
    };

    return (
        <div className="bg-gray-50 dark:bg-[#0b1326] text-gray-900 dark:text-gray-100 font-body min-h-screen antialiased transition-colors duration-300">
            {/* TopNavBar */}
            <header className="sticky top-0 w-full z-40 flex justify-between items-center px-6 h-20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm transition-colors">
                <div className="flex items-center gap-4">
                    <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight font-headline">Lumina Học vụ</span>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map(item => {
                        const isActive = url?.startsWith(item.href);
                        return (
                            <Link 
                                key={item.href} 
                                href={item.href} 
                                className={`font-medium font-label text-sm tracking-tight transition-all ease-in-out duration-200 ${isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 pb-1' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500'}`}
                            >
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
                <div className="flex items-center gap-4">
                    <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors p-2 rounded-full hover:bg-surface-container-low flex items-center justify-center">
                        <span className="material-symbols-outlined">dark_mode</span>
                    </button>
                    <Link href={route('logout')} method="post" as="button" className="text-on-surface-variant font-bold text-sm bg-surface-container-low hover:bg-surface-container px-4 py-2 rounded-xl transition-all">
                        Đăng xuất
                    </Link>
                    <div className="h-10 w-10 rounded-full font-bold bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32">
                {children}
            </main>

            {/* BottomNavBar (Mobile Only) */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg flex justify-around items-center p-4 pb-8 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] rounded-t-3xl">
                {navItems.map(item => {
                    const isActive = url?.startsWith(item.href);
                    return (
                        <Link 
                            key={item.href} 
                            href={item.href} 
                            className={`flex flex-col items-center justify-center px-6 py-2 rounded-xl active:scale-90 transition-transform ${isActive ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' : 'text-slate-400'}`}
                        >
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
                            <span className="font-headline text-[10px] uppercase tracking-wider mt-1">{item.title}</span>
                        </Link>
                    );
                })}
            </nav>
            <Toaster position="bottom-right" />
        </div>
    );
}
