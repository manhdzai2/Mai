import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

// --- MOCK DATA (Hiển thị tạm thời nếu Controller chưa truyền data thực) ---
const defaultStats = {
    students: 1250,
    teachers: 45,
    subjects: 32
};

const defaultGradeData = [
    { name: 'Giỏi', value: 350 },
    { name: 'Khá', value: 450 },
    { name: 'Trung bình', value: 300 },
    { name: 'Yếu', value: 150 },
];

const defaultTopSubjects = [
    { name: 'Toán cao cấp', score: 8.5 },
    { name: 'Lập trình Web', score: 8.2 },
    { name: 'Cơ sở dữ liệu', score: 7.9 },
    { name: 'Mạng máy tính', score: 7.6 },
    { name: 'Trí tuệ nhân tạo', score: 7.4 },
];

const PIE_COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#F43F5E']; // Xanh lá, Xanh dương, Vàng cam, Đỏ hồng

export default function Dashboard({ stats = defaultStats, gradeChart = defaultGradeData, topSubjects = defaultTopSubjects }) {
    return (
        <div className="space-y-6 animate-fade-in">
            <Head title="Tổng quan hệ thống" />

            {/* --- HEADER --- */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Tổng quan hệ thống</h1>
                    <p className="text-sm text-gray-500 mt-1">Theo dõi các chỉ số quan trọng của nhà trường</p>
                </div>
                <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    Cập nhật: {new Date().toLocaleDateString('vi-VN')}
                </div>
            </div>

            {/* --- THẺ THỐNG KÊ (STAT CARDS) --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Tổng Sinh viên"
                    value={stats.students}
                    icon={<StudentIcon />}
                    gradient="from-blue-50/50 to-white"
                    iconColor="text-blue-600"
                    iconBg="bg-blue-100/50"
                />
                <StatCard
                    title="Tổng Giảng viên"
                    value={stats.teachers}
                    icon={<TeacherIcon />}
                    gradient="from-emerald-50/50 to-white"
                    iconColor="text-emerald-600"
                    iconBg="bg-emerald-100/50"
                />
                <StatCard
                    title="Tổng Môn học"
                    value={stats.subjects}
                    icon={<SubjectIcon />}
                    gradient="from-purple-50/50 to-white"
                    iconColor="text-purple-600"
                    iconBg="bg-purple-100/50"
                />
            </div>

            {/* --- KHU VỰC BIỂU ĐỒ --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                
                {/* 1. Biểu đồ Phổ xếp loại (PieChart) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Phổ xếp loại Sinh viên</h2>
                            <p className="text-sm text-gray-500">Tỷ lệ học lực trên toàn trường</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
                        </div>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={gradeChart}
                                    cx="50%" cy="50%"
                                    innerRadius={70} outerRadius={100}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {gradeChart.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip content={<CustomTooltip unit="sinh viên" />} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Biểu đồ Top Môn Học (BarChart) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Top 5 Môn Học Tốt Nhất</h2>
                            <p className="text-sm text-gray-500">Đánh giá theo điểm trung bình môn</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        </div>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topSubjects} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} tickLine={false} 
                                    tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} 
                                />
                                <YAxis 
                                    axisLine={false} tickLine={false} 
                                    tick={{ fill: '#6b7280', fontSize: 12 }} domain={[0, 10]} 
                                />
                                <RechartsTooltip content={<CustomTooltip unit="điểm" />} cursor={{ fill: '#f9fafb' }} />
                                <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={36} animationDuration={1500} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Bọc Component Layout
Dashboard.layout = page => <AppLayout children={page} />;

// ================= CÁC COMPONENT CON ================= //

// 1. Thẻ Thống Kê
function StatCard({ title, value, icon, gradient, iconColor, iconBg }) {
    return (
        <div className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1 tracking-wide uppercase">{title}</p>
                    <h3 className="text-3xl font-black text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {value.toLocaleString()}
                    </h3>
                </div>
                <div className={`${iconBg} ${iconColor} p-4 rounded-xl shadow-sm border border-white/50 group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

// 2. Custom Tooltip cho Recharts (Đẹp & Đồng bộ Tailwind)
const CustomTooltip = ({ active, payload, label, unit }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-sm border border-gray-100 p-3 rounded-xl shadow-xl">
                <p className="font-semibold text-gray-800 text-sm">{label || payload[0].name}</p>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].payload.fill || payload[0].color }}></div>
                    <p className="text-indigo-600 font-bold text-sm">
                        {payload[0].value} <span className="text-gray-500 font-normal">{unit}</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

// 3. SVG Icons
function StudentIcon() {
    return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}

function TeacherIcon() {
    return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
}

function SubjectIcon() {
    return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    );
}