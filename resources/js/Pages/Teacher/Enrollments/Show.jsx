import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ subject, semester, enrollments }) {
    // Tính toán thống kê
    const stats = React.useMemo(() => {
        if (!enrollments || enrollments.length === 0) return null;
        
        const total = enrollments.length;
        let sumTotal = 0;
        let passCount = 0;
        let entriesWithScore = 0;

        enrollments.forEach(enr => {
            if (enr.score && enr.score.total_score !== null) {
                sumTotal += parseFloat(enr.score.total_score);
                entriesWithScore++;
                if (parseFloat(enr.score.total_score) >= 4.0) passCount++;
            }
        });

        return {
            total,
            avg: entriesWithScore > 0 ? (sumTotal / entriesWithScore).toFixed(2) : '0.00',
            passRate: total > 0 ? ((passCount / total) * 100).toFixed(1) : '0.0',
            entriesWithScore
        };
    }, [enrollments]);

    return (
        <div className="space-y-8 animate-fade-in pb-12 max-w-7xl mx-auto">
            <Head title={`Quản Lý Điểm - ${subject?.name}`} />

            {/* Back Button & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <Link
                        href={route('teacher.enrollments.index')}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-outline hover:text-indigo-600 dark:hover:text-primary transition-colors mb-3"
                    >
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Quay lại danh sách lớp dạy
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-600 dark:bg-primary flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-500/20">
                            {subject?.name?.charAt(0) || 'S'}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-none">
                                {subject?.name}
                            </h2>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-primary/10 border border-indigo-100 dark:border-primary/20 text-[10px] font-bold text-indigo-600 dark:text-primary tracking-widest uppercase font-mono">
                                    {subject?.code}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                    Học Kỳ Khóa {semester}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white dark:bg-surface-container-low p-4 rounded-xl border border-gray-200 dark:border-outline-variant/10 shadow-sm min-w-[120px] text-center">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline mb-1">Sĩ Số</p>
                        <p className="text-2xl font-black text-gray-900 dark:text-white">{stats?.total || 0}</p>
                    </div>
                    <div className="bg-white dark:bg-surface-container-low p-4 rounded-xl border border-gray-200 dark:border-outline-variant/10 shadow-sm min-w-[120px] text-center border-b-2 border-b-emerald-500">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline mb-1">Tỷ Lệ Đạt</p>
                        <p className="text-2xl font-black text-emerald-600 dark:text-secondary">{stats?.passRate || 0}%</p>
                    </div>
                    <div className="bg-white dark:bg-surface-container-low p-4 rounded-xl border border-gray-200 dark:border-outline-variant/10 shadow-sm min-w-[120px] text-center border-b-2 border-b-indigo-500">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline mb-1">Điểm TB</p>
                        <p className="text-2xl font-black text-indigo-600 dark:text-primary">{stats?.avg || '0.00'}</p>
                    </div>
                </div>
            </div>

            <div className="glass-card bg-white dark:bg-surface-container-low rounded-2xl overflow-hidden shadow-sm dark:shadow-2xl border border-gray-200 dark:border-outline-variant/10">
                <div className="p-6 border-b border-gray-200 dark:border-outline-variant/10 bg-gray-50/50 dark:bg-surface-container-low/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-secondary animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white">Bảng Ghi Điểm Học Viên</span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 dark:text-outline">Đã nhập: {stats?.entriesWithScore || 0}/{stats?.total || 0}</p>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-surface-container-low/50 border-b border-gray-200 dark:border-outline-variant/10">
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline w-16 text-center">STT</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline w-64">Hồ Sơ Căn Bản</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Điểm Tiếp Xúc</th>
                                <th className="px-4 py-4 text-center font-['Inter'] uppercase tracking-widest text-[10px] font-black text-indigo-700 bg-indigo-50 dark:text-primary dark:bg-primary/5 border-x border-indigo-100 dark:border-primary/10">Chuyên Cần (10%)</th>
                                <th className="px-4 py-4 text-center font-['Inter'] uppercase tracking-widest text-[10px] font-black text-indigo-700 bg-indigo-50 dark:text-primary dark:bg-primary/5">Giữa Kỳ (30%)</th>
                                <th className="px-4 py-4 text-center font-['Inter'] uppercase tracking-widest text-[10px] font-black text-indigo-700 bg-indigo-50 dark:text-primary dark:bg-primary/5 border-l border-indigo-100 dark:border-primary/10">Cuối Bài (60%)</th>
                                <th className="px-6 py-4 text-center font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Ghi Xét Lệnh</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-outline-variant/5">
                            {enrollments && enrollments.length > 0 ? (
                                enrollments.map((enrollment, index) => (
                                    <ScoreRow key={enrollment.id} enrollment={enrollment} index={index} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-24 text-center text-gray-500 dark:text-outline">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-surface-container-highest mb-4">
                                            <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-outline-variant">person_off</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-on-surface">Không Phát Hiện Hồ Sơ Tồn Tại</p>
                                        <p className="text-xs mt-1">Sĩ số rỗng. Có vẻ chưa học thuyết nào gửi người tham khảo vào khóa.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function ScoreRow({ enrollment, index }) {
    const { data, setData, post, processing } = useForm({
        enrollment_id: enrollment.id,
        attendance_score: enrollment.score?.attendance_score ?? '',
        midterm_score: enrollment.score?.midterm_score ?? '',
        final_score: enrollment.score?.final_score ?? '',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        post(route('teacher.enrollments.update-score'), {
            preserveScroll: true,
            onSuccess: () => setIsEditing(false),
        });
    };

    return (
        <tr className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
            <td className="px-6 py-4 text-center text-xs font-bold text-gray-400 dark:text-outline-variant">
                {index + 1}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded border border-gray-200 dark:border-outline-variant/20 bg-gray-100 dark:bg-surface-container-highest flex items-center justify-center text-gray-900 dark:text-on-surface font-bold text-xs uppercase shadow-inner">
                        {enrollment.student?.user?.name ? enrollment.student.user.name.charAt(0) : 'S'}
                    </div>
                    <div>
                        <div className="font-bold text-gray-900 dark:text-white text-sm tracking-wide">{enrollment.student?.user?.name || 'Vô Danh'}</div>
                        <div className="text-[10px] font-mono font-bold text-gray-500 dark:text-outline mt-0.5 uppercase">{enrollment.student?.student_code}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-xs font-medium text-gray-600 dark:text-on-surface-variant">
                {enrollment.student?.user?.email}
            </td>
            
            <td className="px-4 py-4 text-center bg-indigo-50/50 dark:bg-primary/5 border-l border-indigo-100 dark:border-primary/10 transition-colors">
                {isEditing ? (
                    <input 
                        type="number" step="0.1" min="0" max="10"
                        value={data.attendance_score}
                        onChange={e => setData('attendance_score', e.target.value)}
                        className="w-16 px-1 py-1 text-center text-sm font-mono border-none rounded bg-white dark:bg-surface-container-highest focus:ring-1 focus:ring-indigo-600 dark:focus:ring-primary text-gray-900 dark:text-white outline-none shadow-inner border-[1px] border-indigo-100 dark:border-none"
                    />
                ) : (
                    <span className="font-mono text-gray-900 dark:text-white font-bold text-sm">
                        {data.attendance_score !== '' ? data.attendance_score : <span className="text-gray-400 dark:text-outline-variant">-</span>}
                    </span>
                )}
            </td>
            
            <td className="px-4 py-4 text-center bg-indigo-50/50 dark:bg-primary/5 transition-colors">
                {isEditing ? (
                    <input 
                        type="number" step="0.1" min="0" max="10"
                        value={data.midterm_score}
                        onChange={e => setData('midterm_score', e.target.value)}
                        className="w-16 px-1 py-1 text-center text-sm font-mono border-none rounded bg-white dark:bg-surface-container-highest focus:ring-1 focus:ring-indigo-600 dark:focus:ring-primary text-gray-900 dark:text-white outline-none shadow-inner border-[1px] border-indigo-100 dark:border-none"
                    />
                ) : (
                    <span className="font-mono text-gray-900 dark:text-white font-bold text-sm">
                        {data.midterm_score !== '' ? data.midterm_score : <span className="text-gray-400 dark:text-outline-variant">-</span>}
                    </span>
                )}
            </td>
            
            <td className="px-4 py-4 text-center bg-indigo-50/50 dark:bg-primary/5 border-r border-indigo-100 dark:border-primary/10 transition-colors">
                {isEditing ? (
                    <input 
                        type="number" step="0.1" min="0" max="10"
                        value={data.final_score}
                        onChange={e => setData('final_score', e.target.value)}
                        className="w-16 px-1 py-1 text-center text-sm font-mono border-none rounded bg-white dark:bg-surface-container-highest focus:ring-1 focus:ring-indigo-600 dark:focus:ring-primary text-gray-900 dark:text-white outline-none shadow-inner border-[1px] border-indigo-100 dark:border-none"
                    />
                ) : (
                    <span className="font-mono text-gray-900 dark:text-white font-bold text-sm">
                        {data.final_score !== '' ? data.final_score : <span className="text-gray-400 dark:text-outline-variant">-</span>}
                    </span>
                )}
            </td>

            <td className="px-6 py-4 text-center">
                {isEditing ? (
                    <div className="flex items-center justify-center gap-2">
                        <button 
                            onClick={handleSave} 
                            disabled={processing}
                            className="p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white dark:text-secondary dark:bg-secondary/10 dark:hover:bg-secondary dark:hover:text-[#002113] border border-emerald-100 dark:border-secondary/20 rounded-md transition-all shadow-md shadow-emerald-500/10 dark:shadow-secondary/10"
                            title="Lưu Thành Quả"
                        >
                            <span className="material-symbols-outlined text-lg">check</span>
                        </button>
                        <button 
                            onClick={() => setIsEditing(false)} 
                            className="p-1.5 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 dark:text-outline dark:hover:text-white dark:bg-surface-container-highest dark:hover:bg-outline-variant/30 rounded-md transition-all border border-gray-200 dark:border-outline-variant/20"
                            title="Xóa Thao Tác Chặn"
                        >
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="mx-auto flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-600 hover:text-white dark:text-primary dark:bg-primary/10 dark:border-primary/20 dark:hover:bg-primary dark:hover:text-on-primary rounded transition-all opacity-50 sm:opacity-0 group-hover:opacity-100 shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[14px]">edit_note</span>
                        Thao Tác Điểm
                    </button>
                )}
            </td>
        </tr>
    );
}

Show.layout = page => <AppLayout children={page} />;