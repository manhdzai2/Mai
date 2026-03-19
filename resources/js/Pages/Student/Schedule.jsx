import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function Schedule({ schedules }) {
    // Nhóm lịch học theo thứ trong tuần
    const groupedSchedules = schedules.reduce((acc, curr) => {
        if (!acc[curr.day]) {
            acc[curr.day] = [];
        }
        acc[curr.day].push(curr);
        return acc;
    }, {});

    const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <Head title="Thời Khóa Biểu" />

            <div className="flex justify-between items-end mb-6">
                <div>
                    <span className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-indigo-600 dark:text-primary mb-1 block">Lịch Trình Học Tập</span>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Thời Khóa Biểu Tuần</h2>
                </div>
                <Link
                    href={route('student.profile')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-transparent glass-card text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline hover:text-indigo-600 dark:hover:text-white rounded-lg transition-all border border-gray-200 dark:border-outline-variant/10 shadow-inner group"
                >
                    <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">badge</span>
                    Hồ Sơ Cá Nhân
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {daysOfWeek.map((dayName) => {
                    const daySchedules = groupedSchedules[dayName];
                    const hasClasses = daySchedules && daySchedules.length > 0;

                    return (
                        <div key={dayName} className={`bg-white dark:bg-transparent glass-card rounded-2xl border ${hasClasses ? 'border-indigo-200 dark:border-primary/20 shadow-lg dark:shadow-[0_0_20px_rgba(195,192,255,0.05)]' : 'border-gray-200 dark:border-outline-variant/5 bg-gray-50 dark:bg-surface-container-low/20 opacity-60 grayscale-[50%]'} overflow-hidden flex flex-col transition-all relative`}>
                            
                            {hasClasses && (
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 dark:from-primary to-transparent opacity-50"></div>
                            )}

                            <div className={`px-6 py-5 border-b ${hasClasses ? 'bg-indigo-50 dark:bg-primary/5 border-indigo-100 dark:border-primary/10' : 'bg-gray-50 dark:bg-transparent border-gray-200 dark:border-outline-variant/5'} flex items-center justify-between`}>
                                <h3 className={`font-bold font-['Inter'] tracking-widest uppercase text-sm ${hasClasses ? 'text-indigo-700 dark:text-primary' : 'text-gray-400 dark:text-outline-variant'}`}>
                                    {dayName}
                                </h3>
                                {hasClasses && (
                                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 dark:bg-surface-container-highest border border-indigo-200 dark:border-primary/20 text-xs font-bold font-mono text-indigo-700 dark:text-white shadow-inner">
                                        {daySchedules.length}
                                    </span>
                                )}
                            </div>

                            <div className="p-4 flex-1 flex flex-col gap-4">
                                {hasClasses ? (
                                    daySchedules.map((schedule, idx) => (
                                        <div key={idx} className="relative bg-gray-50 dark:bg-surface-container-highest/50 rounded-xl border border-gray-200 dark:border-outline-variant/10 p-5 shadow-sm dark:shadow-inner hover:border-indigo-300 dark:hover:border-primary/30 hover:bg-white dark:hover:bg-surface-container-highest transition-all duration-300 group">
                                            
                                            <div className="absolute top-4 right-4 group-hover:animate-pulse transition-opacity">
                                                <div className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.8)]"></div>
                                            </div>
                                            
                                            <div className="text-sm font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 pr-4 leading-tight group-hover:text-indigo-600 dark:group-hover:text-primary transition-colors">
                                                {schedule.subject}
                                            </div>
                                            
                                            <div className="flex items-center gap-2 mb-2 text-xs font-bold font-mono text-gray-500 dark:text-outline group-hover:text-gray-700 dark:group-hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-[14px] text-emerald-600 dark:text-secondary">schedule</span>
                                                {schedule.time}
                                            </div>
                                            
                                            <div className="flex items-center gap-2 text-xs font-bold font-mono text-gray-500 dark:text-outline group-hover:text-gray-700 dark:group-hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-[14px] text-indigo-500 dark:text-[#c3c0ff]">meeting_room</span>
                                                {schedule.room || 'Chưa xếp phòng'}
                                            </div>

                                            <div className="flex items-center justify-between border-t border-gray-200 dark:border-outline-variant/10 mt-4 pt-3">
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-outline-variant truncate pr-2" title={schedule.instructor}>
                                                    <span className="text-gray-500 dark:text-outline mr-1">GV:</span> {schedule.instructor || 'Chưa phân công'}
                                                </div>
                                                <span className="shrink-0 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded bg-gray-100 dark:bg-surface-container border border-gray-200 dark:border-outline-variant/20 text-gray-600 dark:text-on-surface-variant shadow-inner">
                                                    {schedule.type || 'LT'}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center py-10 opacity-50">
                                        <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-outline-variant mb-2">grid_off</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline">Nghỉ Học</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

Schedule.layout = page => <AppLayout children={page} />;