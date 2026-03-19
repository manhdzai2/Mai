import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ cards = {}, gradeStats = {}, subjectAverages = [], upcomingExams = [] }) {
    const stats = {
        students: cards?.students || 0,
        teachers: cards?.teachers || 0,
        subjects: cards?.subjects || 0
    };

    const exams = Array.isArray(upcomingExams) ? upcomingExams : [];

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <Head title="Bảng Điều Khiển" />

            <div className="flex justify-between items-end mb-2">
                <div>
                    <span className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-indigo-500 dark:text-primary mb-1 block">Hệ Thống Quản Trị Trung Tâm</span>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Tổng Quan Học Thuật</h2>
                </div>
            </div>

            {/* Thống kê nhanh */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-outline-variant/10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline mb-2">Tổng Sinh Viên</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.students.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-outline-variant/10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline mb-2">Tổng Giảng Viên</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.teachers.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-outline-variant/10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline mb-2">Học Phần Đang Mở</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.subjects.toLocaleString()}</p>
                </div>
            </div>

            {/* Lịch thi */}
            <div className="bg-white dark:bg-surface-container-low rounded-2xl shadow-sm border border-gray-100 dark:border-outline-variant/10 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-outline-variant/10 bg-gray-50/50 dark:bg-surface-container-low/30">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">Lịch Thi Sắp Tới</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-surface-container-low/50 border-b border-gray-100 dark:border-outline-variant/10">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-500 dark:text-outline">Môn Học</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-500 dark:text-outline">Thời Gian</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-500 dark:text-outline">Phòng</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase text-gray-500 dark:text-outline text-right">Sĩ Số</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-outline-variant/5">
                            {exams.length > 0 ? (
                                exams.map((exam, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <Link 
                                                href={exam.subject_id ? route('admin.subjects.show', exam.subject_id) : '#'}
                                                className="font-bold text-sm text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-primary transition-colors"
                                            >
                                                {exam.subject}
                                            </Link>
                                            <div className="text-[10px] text-gray-400 dark:text-outline mt-1 font-mono">{exam.code}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-on-surface-variant">
                                            {exam.date} lúc {exam.time}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded bg-gray-100 dark:bg-surface-container-highest text-[10px] font-bold text-gray-600 dark:text-outline">
                                                {exam.room}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-black text-gray-900 dark:text-white text-sm">
                                            {exam.student_count}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-400 dark:text-outline italic text-sm">Không có lịch thi sắp tới</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = page => <AppLayout children={page} />;