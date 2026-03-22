import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, usePage } from '@inertiajs/react';

export default function TeacherLayout({ children }) {
    const { auth, url } = usePage().props;
    const user = auth?.user;

    const navItems = [
        { title: 'Lớp học được giao', href: '/teacher/enrollments', icon: 'menu_book' }
    ];

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.theme = isDark ? 'dark' : 'light';
    };

    return (
        <div className="bg-gray-50 dark:bg-[#0b1326] text-gray-900 dark:text-gray-100 min-h-screen font-body antialiased transition-colors duration-300">
            {/* TopNavBar */}
            <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm dark:shadow-none h-20 transition-colors">
                <div className="flex justify-between items-center px-6 md:px-8 h-full w-full max-w-screen-2xl mx-auto">
                    <div className="flex items-center gap-8">
                        <span className="text-2xl font-black text-indigo-700 dark:text-indigo-300 font-headline tracking-tight">Fluid Academy</span>
                        <div className="hidden md:flex items-center gap-6">
                            {navItems.map(item => {
                                const isActive = url?.startsWith(item.href);
                                return (
                                    <Link 
                                        key={item.href} 
                                        href={item.href} 
                                        className={`font-headline text-sm tracking-tight transition-all ease-in-out duration-200 ${isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 pb-1' : 'text-slate-600 dark:text-slate-400 font-medium hover:text-indigo-500 dark:hover:text-indigo-300'}`}
                                    >
                                        {item.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-all">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-all">
                            <span className="material-symbols-outlined">dark_mode</span>
                        </button>
                        <Link href={route('logout')} method="post" as="button" className="text-error font-headline font-bold text-sm bg-error/10 hover:bg-error/20 px-4 py-2 rounded-xl transition-all mr-2">
                            Đăng xuất
                        </Link>
                        <div className="w-10 h-10 rounded-full font-bold bg-primary text-white flex items-center justify-center shadow-md border-2 border-primary/20">{user?.name?.charAt(0) || 'U'}</div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-28 pb-32 px-4 md:px-8 max-w-screen-2xl mx-auto min-h-screen">
                {children}
            </main>

            {/* BottomNavBar (Mobile Only) */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-t-3xl shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
                {navItems.map(item => (
                    <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200 rounded-2xl px-5 py-2 transition-transform active:scale-90">
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Lớp Học</span>
                    </Link>
                ))}
            </nav>
            <Toaster position="bottom-right" />
        </div>
    );
}
