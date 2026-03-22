import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard({ auth, cards = {}, gradeStats = {}, subjectAverages = [], upcomingExams = [] }) {
    const stats = {
        students: cards?.students || 0,
        teachers: cards?.teachers || 0,
        subjects: cards?.subjects || 0
    };

    const exams = Array.isArray(upcomingExams) ? upcomingExams : [];
    const user = auth?.user;

    // Chuẩn bị Data cho Recharts (Biểu đồ Cột) - Điểm Trung bình các Môn
    const barData = subjectAverages.map(item => ({
        name: item.subject,
        uv: parseFloat(item.avg_score)
    }));

    // Chuẩn bị Data cho Pie Chart - Xếp loại Sinh viên
    const pieData = [
        { name: 'Giỏi', value: gradeStats.Gioi, color: '#4647d3' },
        { name: 'Khá', value: gradeStats.Kha, color: '#6a37d4' },
        { name: 'Trung bình', value: gradeStats.TB, color: '#963776' },
        { name: 'Yếu', value: gradeStats.Yeu, color: '#b41340' },
    ].filter(i => i.value > 0); // Chỉ hiện những loại có sinh viên

    // Để pieData không trống nếu chưa có điểm
    if (pieData.length === 0) pieData.push({ name: 'Chưa đủ dữ liệu', value: 1, color: '#d9dde0' });

    // Animation Variants
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-12">
            <Head title="Admin Dashboard" />

            {/* Welcome Section */}
            <motion.section variants={itemVariants}>
                <h2 className="text-3xl font-extrabold font-headline tracking-tight text-gray-900 dark:text-white">Chào mừng trở lại, {user?.name || 'Admin'}</h2>
                <p className="text-gray-500 dark:text-outline mt-1">Dưới đây là tổng quan tình hình học thuật theo số liệu thực tế.</p>
            </motion.section>

            {/* KPI Cards Bento Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Students */}
                <div className="bg-white dark:bg-[#161f36] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-indigo-500/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-indigo-50 dark:bg-primary/20 rounded-lg">
                            <span className="material-symbols-outlined text-indigo-600 dark:text-primary">group</span>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tổng Sinh Viên</p>
                    <h3 className="text-2xl font-black mt-1 text-gray-900 dark:text-white">{stats.students.toLocaleString()}</h3>
                </div>

                {/* Giảng Viên */}
                <div className="bg-white dark:bg-[#161f36] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-indigo-500/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-50 dark:bg-secondary/20 rounded-lg">
                            <span className="material-symbols-outlined text-purple-600 dark:text-secondary">person_check</span>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Giảng Viên</p>
                    <h3 className="text-2xl font-black mt-1 text-gray-900 dark:text-white">{stats.teachers.toLocaleString()}</h3>
                </div>

                {/* Khóa Học */}
                <div className="bg-white dark:bg-[#161f36] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-indigo-500/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-pink-50 dark:bg-tertiary/20 rounded-lg">
                            <span className="material-symbols-outlined text-pink-600 dark:text-tertiary">menu_book</span>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Học Phần</p>
                    <h3 className="text-2xl font-black mt-1 text-gray-900 dark:text-white">{stats.subjects.toLocaleString()}</h3>
                </div>

                {/* Upcoming Exams */}
                <div className="bg-white dark:bg-[#161f36] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-indigo-500/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-rose-50 dark:bg-error/20 rounded-lg">
                            <span className="material-symbols-outlined text-rose-600 dark:text-[#ff8ed2]">event</span>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Kỳ thi Kế tiếp</p>
                    <h3 className="text-2xl font-black mt-1 text-gray-900 dark:text-white">{exams.length}</h3>
                </div>
            </motion.div>

            {/* Main Charts Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Bar Chart (Thay thế Spline Chart mockup) */}
                <div className="lg:col-span-2 bg-white dark:bg-[#161f36] p-5 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-indigo-500/10">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Điểm Trung bình theo Học Phần</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Top 10 môn có điểm cao nhất hệ thống</p>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.3} />
                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} tickLine={false} axisLine={false} domain={[0, 10]} />
                                <Tooltip cursor={{ fill: 'rgba(70, 71, 211, 0.1)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: '#000' }} />
                                <Bar dataKey="uv" name="Điểm TB" radius={[4, 4, 0, 0]} fill="#4647d3" barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white dark:bg-[#161f36] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-indigo-500/10 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Thống kê Xếp loại</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Tỷ lệ phổ điểm toàn trường</p>
                    
                    <div className="flex-1 min-h-[200px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none" label={false}>
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: '#000' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {pieData.map((entry, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: entry.color }}></div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Upcoming Exams Table Section */}
            <motion.section variants={itemVariants} className="bg-white dark:bg-[#161f36] rounded-2xl shadow-sm border border-gray-100 dark:border-indigo-500/10 overflow-hidden">
                <div className="p-8 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Danh sách Lịch thi</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Các kỳ thi sắp tới cần giám sát</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-[#161f36] border-b border-gray-100 dark:border-gray-800">
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Học phần</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Lịch trình</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Phòng thi</th>
                                <th className="px-8 py-4 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-right">Sinh viên dự thi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {exams.length > 0 ? (
                                exams.map((exam, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-5">
                                            <div>
                                                <div className="font-bold text-sm text-gray-900 dark:text-white block">{exam.subject}</div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">{exam.code}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{exam.date} lúc <span className="text-indigo-600 dark:text-primary font-bold">{exam.time}</span></span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">{exam.room}</span>
                                        </td>
                                        <td className="px-8 py-5 text-right font-black text-gray-900 dark:text-white text-sm">
                                            {exam.student_count}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-12 text-center text-gray-500 dark:text-gray-400 italic text-sm">Hiện chưa có dòng thông tin nào trong CSDL!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.section>
        </motion.div>
    );
}

Dashboard.layout = page => <AdminLayout>{page}</AdminLayout>;