import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
    // Kiểm tra trạng thái theme từ localStorage hoặc giao diện hệ thống
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            if (saved) return saved === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // Hàm xử lý khi bấm nút
    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    // Áp dụng class 'dark' vào thẻ <html> mỗi khi isDark thay đổi
    useEffect(() => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-hidden group"
            title={isDark ? "Chuyển sang chế độ Sáng" : "Chuyển sang chế độ Tối"}
        >
            {/* Icon Mặt Trời (hiện khi đang ở chế độ Tối) */}
            <svg 
                className={`w-5 h-5 absolute inset-0 m-auto transition-transform duration-500 ${isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>

            {/* Icon Mặt Trăng (hiện khi đang ở chế độ Sáng) */}
            <svg 
                className={`w-5 h-5 transition-transform duration-500 ${isDark ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        </button>
    );
}