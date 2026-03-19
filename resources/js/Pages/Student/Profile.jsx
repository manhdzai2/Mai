import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function Profile({ studentInfo, enrollments }) {
    const defaultAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(studentInfo?.user?.name || 'S V')}&background=4338ca&color=fff&size=200&font-size=0.4&bold=true`;

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <Head title="Hồ Sơ Cá Nhân & Bảng Điểm" />

            {/* HERO SECTION */}
            <div className="bg-white dark:bg-transparent glass-card rounded-3xl border border-gray-200 dark:border-outline-variant/10 shadow-lg dark:shadow-2xl relative overflow-hidden group">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-full h-[180px] bg-gradient-to-br from-indigo-100 to-purple-50 dark:from-surface-bright/40 dark:to-surface-container/20">
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-background to-transparent"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.05] dark:opacity-[0.03] pattern-grid-lg"></div>
                </div>

                <div className="p-8 pb-10 flex flex-col md:flex-row gap-8 md:items-end relative z-10 pt-20">
                    {/* Avatar */}
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white dark:bg-surface p-1.5 shadow-xl dark:shadow-[0_0_30px_rgba(78,222,163,0.1)] border border-gray-200 dark:border-outline-variant/20 flex-shrink-0 mx-auto md:mx-0 relative group-hover:shadow-2xl transition-shadow duration-500">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-300/20 to-purple-300/20 dark:from-secondary/20 dark:to-primary/20 rounded-2xl -z-10 blur-xl opacity-50"></div>
                        <img 
                            src={defaultAvatarUrl} 
                            alt="Ảnh đại diện" 
                            className="w-full h-full object-cover rounded-xl border border-gray-100 dark:border-outline-variant/10 bg-gray-50 dark:bg-surface-container"
                        />
                        <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-emerald-50 dark:bg-secondary/10 flex items-center justify-center border border-emerald-200 dark:border-secondary/20 text-emerald-600 dark:text-secondary shadow-lg dark:shadow-[0_0_15px_rgba(78,222,163,0.2)] backdrop-blur-md">
                            <span className="material-symbols-outlined text-lg">verified</span>
                        </div>
                    </div>
                    
                    {/* Thông tin chính */}
                    <div className="flex-1 text-center md:text-left space-y-4 mb-2">
                        <div>
                            <span className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline mb-1 block">Hồ Sơ Sinh Viên Đang Hoạt Động</span>
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                                {studentInfo?.user?.name || 'Chưa xác định'}
                            </h1>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-secondary/10 text-xs font-bold font-mono tracking-widest text-indigo-700 dark:text-secondary border border-indigo-100 dark:border-secondary/20 shadow-inner">
                                <span className="material-symbols-outlined text-[14px]">pin</span>
                                {studentInfo?.student_code || 'CHƯA CẤP'}
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-surface-container-highest text-xs font-bold text-gray-700 dark:text-on-surface border border-gray-200 dark:border-outline-variant/10 shadow-inner">
                                <span className="material-symbols-outlined text-[14px] text-indigo-600 dark:text-primary">diversity_3</span>
                                Lớp: {studentInfo?.class?.name || 'Chờ xếp lớp'}
                            </span>
                            <span className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-outline">
                                <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                {studentInfo?.dob ? new Date(studentInfo.dob).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                            </span>
                            <span className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-outline">
                                <span className="material-symbols-outlined text-[14px]">{studentInfo?.gender === 'male' ? 'male' : studentInfo?.gender === 'female' ? 'female' : 'transgender'}</span>
                                {studentInfo?.gender === 'male' ? 'Nam' : studentInfo?.gender === 'female' ? 'Nữ' : 'Khác'}
                            </span>
                        </div>
                    </div>
                    
                    {/* Nút Lịch Học */}
                    <div className="mb-2 w-full md:w-auto flex justify-center md:justify-end">
                        <Link
                            href={route('student.schedule')}
                            className="inline-flex items-center justify-center gap-2 flex-col w-full md:w-32 py-3 bg-indigo-50 hover:bg-indigo-100 dark:bg-gradient-to-b dark:from-primary/10 dark:to-primary/5 dark:hover:from-primary/20 dark:hover:to-primary/10 text-indigo-700 dark:text-primary border border-indigo-200 dark:border-primary/20 rounded-2xl shadow-lg dark:shadow-[0_0_15px_rgba(195,192,255,0.05)] transition-all active:scale-95 group/btn"
                        >
                            <span className="material-symbols-outlined text-3xl group-hover/btn:-translate-y-1 transition-transform">calendar_month</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Thời Khóa Biểu</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* HAI CỘT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Cột trái: Liên lạc */}
                <div className="lg:col-span-1 bg-white dark:bg-transparent glass-card rounded-3xl p-8 border border-gray-200 dark:border-outline-variant/10 shadow-lg dark:shadow-xl relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100/50 dark:bg-primary/5 rounded-full blur-3xl group-hover:bg-indigo-200/50 dark:group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
                    
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 uppercase tracking-widest">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-surface-container-highest rounded-lg flex items-center justify-center text-gray-500 dark:text-outline-variant shadow-inner">
                            <span className="material-symbols-outlined text-[16px]">contact_mail</span>
                        </div>
                        Thông Tin Liên Lạc
                    </h3>
                    
                    <div className="space-y-6">
                        <div className="group/item">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline block mb-2 group-hover/item:text-indigo-600 dark:group-hover/item:text-primary transition-colors">Địa Chỉ Email</label>
                            <div className="flex items-center gap-3">
                                <div className="text-sm font-semibold text-gray-800 dark:text-white break-all bg-gray-50 dark:bg-surface-container-low/50 px-4 py-3 rounded-xl border border-gray-200 dark:border-outline-variant/10 w-full group-hover/item:border-indigo-300 dark:group-hover/item:border-primary/30 transition-colors shadow-inner flex items-center gap-3">
                                    <span className="material-symbols-outlined text-gray-400 dark:text-outline-variant text-[18px]">mail</span>
                                    {studentInfo?.user?.email || 'Chưa có'}
                                </div>
                            </div>
                        </div>
                        <div className="group/item">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline block mb-2 group-hover/item:text-indigo-600 dark:group-hover/item:text-primary transition-colors">Số Điện Thoại</label>
                            <div className="flex items-center gap-3">
                                <div className="text-sm font-semibold text-gray-800 dark:text-white bg-gray-50 dark:bg-surface-container-low/50 px-4 py-3 rounded-xl border border-gray-200 dark:border-outline-variant/10 w-full group-hover/item:border-indigo-300 dark:group-hover/item:border-primary/30 transition-colors shadow-inner flex items-center gap-3">
                                    <span className="material-symbols-outlined text-gray-400 dark:text-outline-variant text-[18px]">smartphone</span>
                                    {studentInfo?.phone || 'Chưa cung cấp'}
                                </div>
                            </div>
                        </div>
                        <div className="group/item">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline block mb-2 group-hover/item:text-indigo-600 dark:group-hover/item:text-primary transition-colors">Địa Chỉ Thường Trú</label>
                            <div className="flex items-center gap-3">
                                <div className="text-sm font-semibold text-gray-800 dark:text-white bg-gray-50 dark:bg-surface-container-low/50 px-4 py-3 rounded-xl border border-gray-200 dark:border-outline-variant/10 w-full min-h-[5rem] group-hover/item:border-indigo-300 dark:group-hover/item:border-primary/30 transition-colors shadow-inner leading-relaxed flex items-start gap-3">
                                    <span className="material-symbols-outlined text-gray-400 dark:text-outline-variant text-[18px] mt-0.5">location_on</span>
                                    {studentInfo?.address || 'Chưa cập nhật. Liên hệ phòng đào tạo.'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cột phải: Bảng Điểm */}
                <div className="lg:col-span-2 bg-white dark:bg-transparent glass-card rounded-3xl border border-gray-200 dark:border-outline-variant/10 shadow-lg dark:shadow-xl overflow-hidden relative">
                    <div className="p-8 border-b border-gray-200 dark:border-outline-variant/10 bg-gray-50/50 dark:bg-surface-container-low/30 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-50 dark:bg-secondary/10 rounded-xl flex items-center justify-center text-emerald-600 dark:text-secondary shadow-lg">
                                    <span className="material-symbols-outlined text-lg">school</span>
                                </div>
                                Bảng Điểm Học Tập
                            </h3>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline mt-2">Kết quả học phần học kỳ hiện tại</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto min-h-[300px]">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-surface-container-low/50 border-b border-gray-200 dark:border-outline-variant/10">
                                    <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Tên Học Phần</th>
                                    <th className="px-6 py-4 text-center font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline w-24">Tín Chỉ</th>
                                    <th className="px-6 py-4 text-center font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline w-24">Chuyên Cần</th>
                                    <th className="px-6 py-4 text-center font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline w-24">Giữa Kỳ</th>
                                    <th className="px-6 py-4 text-center font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline w-24">Cuối Kỳ</th>
                                    <th className="px-6 py-4 text-center font-['Inter'] uppercase tracking-widest text-[10px] font-black text-emerald-700 dark:text-secondary bg-emerald-50/50 dark:bg-secondary/5 w-28 border-l border-emerald-200 dark:border-secondary/10">Tổng Kết</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-outline-variant/5">
                                {enrollments && enrollments.length > 0 ? (
                                    enrollments.map((enr, idx) => {
                                        const cc = enr.score?.attendance_score;
                                        const gk = enr.score?.midterm_score;
                                        const ck = enr.score?.final_score;
                                        
                                        const hasFullScore = cc !== null && gk !== null && ck !== null;
                                        const tk = hasFullScore 
                                            ? (parseFloat(cc) * 0.1 + parseFloat(gk) * 0.3 + parseFloat(ck) * 0.6).toFixed(1)
                                            : null;

                                        return (
                                            <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900 dark:text-white text-sm whitespace-normal w-48 leading-snug group-hover:text-indigo-600 dark:group-hover:text-primary transition-colors">{enr.subject?.name}</div>
                                                    <div className="text-[10px] font-mono font-bold tracking-widest text-gray-500 dark:text-outline mt-1 uppercase border border-gray-200 dark:border-outline-variant/20 inline-block px-1.5 py-0.5 rounded shadow-inner">{enr.subject?.code}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center text-xs font-bold font-mono text-gray-400 dark:text-outline-variant">
                                                    {enr.subject?.credits || enr.subject?.credit || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-center text-sm font-mono font-bold text-gray-700 dark:text-on-surface">
                                                    {cc !== null ? cc : <span className="text-gray-400 dark:text-outline-variant">-</span>}
                                                </td>
                                                <td className="px-6 py-4 text-center text-sm font-mono font-bold text-gray-700 dark:text-on-surface">
                                                    {gk !== null ? gk : <span className="text-gray-400 dark:text-outline-variant">-</span>}
                                                </td>
                                                <td className="px-6 py-4 text-center text-sm font-mono font-bold text-gray-700 dark:text-on-surface">
                                                    {ck !== null ? ck : <span className="text-gray-400 dark:text-outline-variant">-</span>}
                                                </td>
                                                <td className="px-6 py-4 text-center bg-emerald-50/30 dark:bg-secondary/5 border-l border-emerald-100 dark:border-secondary/10 group-hover:bg-emerald-50 dark:group-hover:bg-secondary/10 transition-colors">
                                                    {tk !== null ? (
                                                        <div className={`mx-auto inline-flex items-center justify-center min-w-[48px] px-2 py-1 rounded-lg text-sm font-black font-mono shadow-inner border ${
                                                            parseFloat(tk) >= 8.5 ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-secondary/20 dark:text-secondary dark:border-secondary/30' 
                                                            : parseFloat(tk) >= 5.0 ? 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-primary/20 dark:text-primary dark:border-primary/30' 
                                                            : 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-tertiary/20 dark:text-tertiary dark:border-tertiary/30'
                                                        }`}>
                                                            {tk}
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 dark:text-outline-variant text-[10px] font-bold uppercase tracking-widest">Đang chờ</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-24 text-center text-gray-500 dark:text-outline">
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-surface-container-highest mb-4 shadow-inner">
                                                <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-outline-variant">find_in_page</span>
                                            </div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-on-surface">Bảng Điểm Trống</p>
                                            <p className="text-xs mt-1">Chưa tìm thấy học phần nào được đăng ký trong học kỳ hiện tại.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

Profile.layout = page => <AppLayout children={page} />;