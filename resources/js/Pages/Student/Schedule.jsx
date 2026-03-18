import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, usePage } from '@inertiajs/react';

// Nhận biến "schedules" được truyền từ Controller
export default function Schedule({ schedules = [] }) {
    const { auth } = usePage().props;

    return (
        <AppLayout>
            <Head title="Lịch học trong tuần" />

            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Lịch học tuần này</h1>
                <p className="text-gray-500 mt-2">Dữ liệu được lấy trực tiếp từ hệ thống.</p>
            </div>

            {/* Nếu không có lịch học thì hiện thông báo */}
            {schedules.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500 font-medium">Bạn chưa có lịch học nào trong tuần này.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Duyệt qua mảng dữ liệu thật */}
                    {schedules.map((session, idx) => (
                        <div key={idx} className={`p-6 rounded-3xl border-2 ${session.color} shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1`}>
                            <div className="flex justify-between items-end border-b border-black/10 pb-4 mb-4">
                                <div>
                                    <div className="text-3xl font-black">{session.day}</div>
                                    <div className="text-sm font-bold opacity-75">{session.date}</div>
                                </div>
                                <div className="text-right">
                                    <div className="px-3 py-1 bg-white/60 rounded-lg text-sm font-bold shadow-sm">
                                        {session.time}
                                    </div>
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold mb-3 leading-snug">{session.subject}</h3>
                            
                            <div className="space-y-2 mt-4">
                                <div className="flex items-center gap-3 text-sm font-semibold opacity-90">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {session.room}
                                </div>
                                <div className="flex items-center gap-3 text-sm font-semibold opacity-90">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    {session.instructor}
                                </div>
                            </div>

                            <div className="mt-6">
                                <span className="inline-block px-3 py-1 bg-white/50 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
                                    {session.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}