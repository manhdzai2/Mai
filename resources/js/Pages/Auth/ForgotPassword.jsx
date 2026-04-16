import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);
    }, []);

    const toggleTheme = () => {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDarkMode(false);
        } else {
            html.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDarkMode(true);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0b1326] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
            <Head title="Quên mật khẩu | Cổng thông tin" />

            {/* Decorative Grid Array Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-indigo-100/50 to-transparent dark:from-[#31394d]/40 dark:to-transparent"></div>
                <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-bl from-indigo-500/10 to-transparent dark:from-[#4edea3]/5 dark:to-transparent rounded-full blur-[100px]"></div>
                <div className="w-full h-full opacity-[0.05] pattern-grid-lg"></div>
            </div>

            {/* Theme Toggle Button */}
            <div className="absolute top-6 right-6 z-20">
                <button
                    onClick={toggleTheme}
                    className="w-12 h-12 rounded-full glass-card hover:bg-white/20 dark:hover:bg-[#31394d] flex items-center justify-center text-gray-800 dark:text-[#dae2fd] transition-all border border-gray-200 dark:border-[#c7c4d8]/10 shadow-md group"
                    title={isDarkMode ? "Chuyển giao diện Sáng" : "Chuyển giao diện Tối"}
                >
                    <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">
                        {isDarkMode ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 animate-fade-in-up">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 dark:from-primary dark:to-primary-container flex items-center justify-center shadow-lg shadow-indigo-500/30 dark:shadow-primary/20 transition-transform hover:scale-105 duration-300">
                        <span className="material-symbols-outlined text-4xl text-white">lock_reset</span>
                    </div>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                    Khôi phục mật khẩu
                </h2>
                <p className="px-10 text-center text-sm font-medium text-gray-500 dark:text-[#c7c4d8]">
                    Đừng lo lắng. Hãy cung cấp địa chỉ email của bạn, chúng tôi sẽ gửi liên kết để bạn đặt lại mật khẩu mới.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[440px] z-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="bg-white/80 dark:bg-[#161f36]/80 backdrop-blur-xl py-8 px-8 sm:px-10 shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] sm:rounded-3xl border border-gray-200 dark:border-[#c7c4d8]/10 relative">
                    
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden rounded-tr-3xl">
                        <div className="absolute top-0 right-0 w-[200%] h-[200%] origin-bottom-left rotate-45 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent dark:via-primary/20"></div>
                    </div>

                    {status && (
                        <div className="mb-6 text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-500/20 flex items-start gap-3">
                            <span className="material-symbols-outlined text-xl">check_circle</span>
                            {status}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={submit}>
                        <div>
                            <label htmlFor="email" className="block text-xs font-bold text-gray-700 dark:text-outline uppercase tracking-widest mb-1">
                                Địa chỉ Email đăng ký
                            </label>
                            <div className="mt-1 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 dark:text-outline-variant text-lg">mail</span>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoFocus
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-[#31394d]/50 border border-gray-200 dark:border-[#c7c4d8]/20 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-primary focus:border-indigo-500 dark:focus:border-primary sm:text-sm placeholder-gray-400 dark:placeholder-outline/50 transition-all outline-none"
                                    placeholder="your-email@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-xs text-red-600 dark:text-rose-400">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-primary dark:text-[#002113] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-primary transition-all active:scale-[0.98] ${
                                    processing ? 'opacity-75 cursor-not-allowed' : 'dark:hover:bg-primary-container'
                                }`}
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-[#002113]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang xử lý...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Gửi liên kết khôi phục
                                        <span className="material-symbols-outlined text-[18px]">send</span>
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className="text-center pt-2">
                            <Link
                                href={route('login')}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 dark:text-[#c7c4d8] dark:hover:text-primary transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">arrow_back</span>
                                Quay lại trang đăng nhập
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            
            <div className="fixed bottom-6 w-full text-center z-10 pointer-events-none">
                <p className="text-xs text-gray-400 dark:text-outline/70 font-medium">
                    &copy; {new Date().getFullYear()} Đại Học Lumina. Bảo mật & Tin cậy.
                </p>
            </div>
        </div>
    );
}
