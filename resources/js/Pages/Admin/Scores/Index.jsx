import React, { useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { debounce } from 'lodash';

export default function Index({ scores, filters }) {
    const searchRef = useRef(
        debounce((value) => {
            router.get(
                route('admin.scores.index'),
                { search: value },
                { preserveState: true, replace: true }
            );
        }, 300)
    ).current;

    useEffect(() => {
        return () => searchRef.cancel();
    }, [searchRef]);

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <Head title="Quản Lý Điểm Số Toàn Trường" />

            <div className="flex justify-between items-end mb-2">
                <div>
                    <span className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-indigo-600 dark:text-primary mb-1 block">Giám Sát Đào Tạo</span>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Tra Cứu Điểm Số</h2>
                </div>
            </div>

            <div className="glass-card bg-white dark:bg-transparent rounded-xl overflow-hidden shadow-sm dark:shadow-2xl border border-gray-200 dark:border-outline-variant/10">
                <div className="p-6 flex flex-col lg:flex-row justify-between items-center gap-4 border-b border-gray-200 dark:border-outline-variant/10 bg-gray-50/50 dark:bg-surface-container-low/30">
                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="relative w-full lg:w-80 group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-outline text-sm group-focus-within:text-indigo-600 dark:group-focus-within:text-primary transition-colors">search</span>
                            <input
                                type="text"
                                placeholder="Tìm kiếm sinh viên, MSG, hoặc môn học..."
                                defaultValue={filters?.search || ''}
                                onChange={(e) => searchRef(e.target.value)}
                                className="bg-gray-100/50 dark:bg-surface-container-highest/50 text-sm rounded-xl border-none pl-10 pr-4 py-2.5 w-full text-gray-900 dark:text-on-surface focus:ring-1 focus:ring-indigo-500 dark:focus:ring-primary placeholder:text-gray-400 dark:placeholder:text-outline/50 transition-all font-['Inter'] outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-surface-container-low/50 border-b border-gray-200 dark:border-outline-variant/10">
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Hồ Sơ Sinh Viên</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Học Phần Tham Gia</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Giảng Viên Quản Lý</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline text-center">Chuyên Cần</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline text-center">Giữa Kỳ</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline text-center">Cuối Kỳ</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline text-center">Hệ Số Chót</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-outline-variant/5">
                            {scores.data && scores.data.length > 0 ? (
                                scores.data.map((item) => {
                                    const rawChuyenCan = item.score?.attendance_score;
                                    const rawGiuaKy = item.score?.midterm_score;
                                    const rawCuoiKy = item.score?.final_score;
                                    
                                    const hasFullScore = rawChuyenCan !== null && rawGiuaKy !== null && rawCuoiKy !== null;
                                    const tongKet = hasFullScore 
                                        ? (parseFloat(rawChuyenCan) * 0.1 + parseFloat(rawGiuaKy) * 0.3 + parseFloat(rawCuoiKy) * 0.6).toFixed(1)
                                        : null;

                                    return (
                                        <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg flex-shrink-0 bg-indigo-50 dark:bg-primary/10 flex items-center justify-center text-indigo-600 dark:text-primary font-bold uppercase text-sm border border-indigo-100 dark:border-primary/20 shadow-sm dark:shadow-[0_0_10px_rgba(195,192,255,0.1)]">
                                                        {item.student?.user?.name ? item.student.user.name.charAt(0) : 'S'}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-primary transition-colors">
                                                            {item.student?.user?.name || 'Vô Danh'}
                                                        </div>
                                                        <div className="text-[10px] font-mono font-bold text-gray-500 dark:text-outline mt-0.5 uppercase tracking-widest">
                                                            {item.student?.student_code}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900 dark:text-white text-sm">
                                                    {item.subject?.name}
                                                </div>
                                                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-gray-100 dark:bg-surface-container-highest text-[10px] font-bold text-gray-500 dark:text-outline tracking-wider font-mono">
                                                    {item.subject?.code}
                                                </span>
                                            </td>
                                            
                                            <td className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-on-surface-variant">
                                                {item.teacher?.user?.name || 'Không có'}
                                            </td>
                                            
                                            <td className="px-6 py-4 text-center font-mono font-bold text-sm text-gray-700 dark:text-on-surface">
                                                {rawChuyenCan !== null ? rawChuyenCan : <span className="text-gray-400 dark:text-outline-variant font-sans text-xs italic">-</span>}
                                            </td>
                                            
                                            <td className="px-6 py-4 text-center font-mono font-bold text-sm text-gray-700 dark:text-on-surface">
                                                {rawGiuaKy !== null ? rawGiuaKy : <span className="text-gray-400 dark:text-outline-variant font-sans text-xs italic">-</span>}
                                            </td>
                                            
                                            <td className="px-6 py-4 text-center font-mono font-bold text-sm text-gray-700 dark:text-on-surface">
                                                {rawCuoiKy !== null ? rawCuoiKy : <span className="text-gray-400 dark:text-outline-variant font-sans text-xs italic">-</span>}
                                            </td>
                                            
                                            <td className="px-6 py-4 text-center">
                                                {tongKet !== null ? (
                                                    <span className={`inline-flex items-center justify-center px-3 py-1.5 min-w-[48px] rounded bg-gray-100 dark:bg-surface-container-highest border border-gray-200 dark:border-outline-variant/10 text-sm font-black font-mono shadow-inner ${
                                                        parseFloat(tongKet) >= 8.0 ? 'text-emerald-600 dark:text-secondary' 
                                                        : parseFloat(tongKet) >= 5.0 ? 'text-indigo-600 dark:text-primary' 
                                                        : 'text-rose-600 dark:text-tertiary'
                                                    }`}>
                                                        {tongKet}
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-orange-50 dark:bg-tertiary/10 text-orange-600 dark:text-tertiary text-[10px] font-bold tracking-wider uppercase border border-orange-100 dark:border-tertiary/20">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 dark:bg-tertiary animate-pulse"></span>
                                                        Đang Chờ
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-16 text-center text-gray-500 dark:text-outline">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-surface-container-highest mb-4">
                                            <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-outline-variant">analytics</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-on-surface">Chưa Có Bản Ghi Hệ Số Đánh Giá</p>
                                        <p className="text-xs mt-1">Hệ thống chưa ghi nhận thông tin học phần hoặc dữ liệu điểm số từ Ban Cán Sự.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination links={scores.links} />
            </div>
        </div>
    );
}

Index.layout = page => <AppLayout children={page} />;

function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="p-6 bg-gray-50/50 dark:bg-surface-container-low/50 flex flex-wrap justify-center sm:justify-between items-center border-t border-gray-200 dark:border-outline-variant/10 gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline">Phân Trang Động</p>
            <div className="flex items-center gap-2">
                {links.map((link, index) => {
                    const label = link.label.replace('&laquo;', 'Trước').replace('&raquo;', 'Tiếp');
                    
                    if (!link.url) {
                        return (
                            <span key={index} className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-gray-400 dark:text-outline-variant bg-transparent cursor-not-allowed">
                                {label}
                            </span>
                        );
                    }
                    
                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                link.active 
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 dark:bg-primary dark:text-on-primary dark:shadow-primary/20' 
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-outline dark:hover:text-white dark:hover:bg-surface-container-highest'
                            }`}
                        >
                            {label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
