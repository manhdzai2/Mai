import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ courses }) {
    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <Head title="Cổng Giảng Viên - Lớp Của Tôi" />

            <div className="flex justify-between items-end mb-6">
                <div>
                    <span className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-indigo-600 dark:text-primary mb-1 block">Không Gian Huấn Luyện</span>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Khóa Học Đang Truyền Đạt</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses && courses.length > 0 ? (
                    courses.map((course, index) => (
                        <div key={index} className="glass-card bg-white dark:bg-transparent rounded-2xl border border-gray-200 dark:border-outline-variant/10 hover:border-indigo-400 dark:hover:border-primary/30 transition-all duration-300 group overflow-hidden flex flex-col relative focus-within:ring-2 focus-within:ring-indigo-500 dark:focus-within:ring-primary shadow-sm hover:shadow-lg dark:shadow-none">
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 to-indigo-400 dark:from-primary dark:to-primary-container scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            
                            <div className="p-8 flex-1 flex flex-col z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-indigo-50 dark:bg-primary/10 rounded-xl border border-indigo-100 dark:border-primary/20 flex items-center justify-center text-indigo-600 dark:text-primary shadow-[0_0_15px_rgba(195,192,255,0.1)] group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-2xl">menu_book</span>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 dark:bg-secondary/10 text-[10px] font-bold text-emerald-600 dark:text-secondary uppercase tracking-widest border border-emerald-100 dark:border-secondary/20 shadow-inner">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-secondary animate-pulse"></span>
                                        {course.total_students} Ghi Danh
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-primary transition-colors leading-tight">
                                    {course.subject_name}
                                </h3>
                                
                                <div className="flex items-center gap-3 mt-2 text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline">
                                    <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-surface-container-highest border border-gray-200 dark:border-outline-variant/20 shadow-inner font-mono text-gray-600 dark:text-outline-variant">
                                        {course.subject_id}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-outline-variant/50"></span>
                                    <span>{course.credit} Tín Chỉ</span>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-outline-variant/10 flex justify-between items-center">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-on-surface-variant group-hover:text-indigo-600 dark:group-hover:text-primary transition-colors">
                                        Học Kỳ {course.semester}
                                    </div>
                                    <Link
                                        href={route('teacher.enrollments.show', [course.subject_id, course.semester])}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white dark:bg-primary dark:text-on-primary font-bold text-xs uppercase tracking-widest rounded-lg hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-indigo-500/20 dark:shadow-primary/20"
                                    >
                                        Chấm Nhập
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                            
                            {/* Decorative background element */}
                            <div className="absolute -bottom-8 -right-8 opacity-5 dark:opacity-[0.03] scale-150 rotate-12 group-hover:opacity-10 dark:group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                                <span className="material-symbols-outlined text-[120px] text-indigo-600 dark:text-primary">auto_stories</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-24 glass-card bg-white dark:bg-transparent rounded-2xl border border-gray-200 dark:border-outline-variant/10 flex flex-col items-center justify-center text-center px-4 shadow-sm">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-surface-container-highest rounded-full flex items-center justify-center mb-6 shadow-inner">
                            <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-outline-variant">event_busy</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Chưa Có Khóa Huấn Luyện Nào</h3>
                        <p className="text-sm text-gray-500 dark:text-outline max-w-sm">Có vẻ như hệ thống chưa phân công bạn vào lịch giảng dạy cụ thể của học kỳ này. Vui lòng phản hồi Ban Quản Lý.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

Index.layout = page => <AppLayout children={page} />;