import React, { useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { debounce } from 'lodash';

export default function Index({ teachers, filters }) {
    const searchRef = useRef(
        debounce((value) => {
            router.get(
                route('admin.teachers.index'),
                { search: value },
                { preserveState: true, replace: true }
            );
        }, 300)
    ).current;

    useEffect(() => {
        return () => searchRef.cancel();
    }, [searchRef]);

    const totalTeachers = teachers.total || teachers.data?.length || 0;

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <Head title="Danh Bạ Giáo Viên" />

            {/* Page Header is handled by Layout Topbar mostly, but we add page context here */}
            <div className="flex justify-between items-end mb-2">
                <div>
                    <span className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-indigo-600 dark:text-primary mb-1 block">Quản lý Nhân Sự</span>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Danh bạ Giảng Viên</h2>
                </div>
            </div>

            {/* Bento Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card bg-white dark:bg-transparent p-6 rounded-xl flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-surface-container-highest/60 transition-all border border-gray-200 dark:border-outline-variant/10 shadow-sm">
                    <div>
                        <p className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline mb-1">Tổng Số Giảng Viên</p>
                        <h3 className="text-4xl font-black text-gray-900 dark:text-white">{totalTeachers}</h3>
                        <p className="text-xs text-emerald-600 dark:text-secondary mt-2 flex items-center gap-1 font-bold">
                            <span className="material-symbols-outlined text-xs">trending_up</span>
                            +12% so với năm ngoái
                        </p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-primary-container/20 flex items-center justify-center text-indigo-600 dark:text-primary-fixed-dim shadow-[0_0_15px_rgba(195,192,255,0.15)]">
                        <span className="material-symbols-outlined text-3xl">groups</span>
                    </div>
                </div>

                <div className="glass-card bg-white dark:bg-transparent p-6 rounded-xl flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-surface-container-highest/60 transition-all border border-gray-200 dark:border-outline-variant/10 shadow-sm">
                    <div>
                        <p className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline mb-1">Công Trình Nghiên Cứu</p>
                        <h3 className="text-4xl font-black text-gray-900 dark:text-white">1.4k</h3>
                        <p className="text-xs text-emerald-600 dark:text-secondary mt-2 flex items-center gap-1 font-bold">
                            <span className="material-symbols-outlined text-xs">check_circle</span>
                            94 bài xuất bản tháng này
                        </p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-secondary/10 flex items-center justify-center text-emerald-600 dark:text-secondary shadow-[0_0_15px_rgba(78,222,163,0.15)]">
                        <span className="material-symbols-outlined text-3xl">biotech</span>
                    </div>
                </div>

                <div className="glass-card bg-white dark:bg-transparent p-6 rounded-xl flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-surface-container-highest/60 transition-all border border-gray-200 dark:border-outline-variant/10 shadow-sm">
                    <div>
                        <p className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline mb-1">Khoa Tập Trung Hoạt Động</p>
                        <h3 className="text-4xl font-black text-gray-900 dark:text-white">24</h3>
                        <p className="text-xs text-gray-500 dark:text-outline mt-2 font-bold">Trải dài trên 4 cơ sở đại học</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-tertiary/10 flex items-center justify-center text-rose-500 dark:text-tertiary shadow-[0_0_15px_rgba(255,178,183,0.15)]">
                        <span className="material-symbols-outlined text-3xl">account_tree</span>
                    </div>
                </div>
            </div>

            {/* Directory Section Table */}
            <div className="glass-card bg-white dark:bg-transparent rounded-xl overflow-hidden shadow-sm dark:shadow-2xl border border-gray-200 dark:border-outline-variant/10">
                {/* Table Header/Filters */}
                <div className="p-6 flex flex-col lg:flex-row justify-between items-center gap-4 border-b border-gray-200 dark:border-outline-variant/10 bg-gray-50/50 dark:bg-surface-container-low/30">
                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="relative w-full lg:w-80 group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-outline text-sm group-focus-within:text-indigo-600 dark:group-focus-within:text-primary transition-colors">search</span>
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo Tên, SDT hoặc Email..."
                                defaultValue={filters?.search || ''}
                                onChange={(e) => searchRef(e.target.value)}
                                className="bg-gray-100/50 dark:bg-surface-container-highest/50 text-sm rounded-xl border-none pl-10 pr-4 py-2.5 w-full text-gray-900 dark:text-on-surface focus:ring-1 focus:ring-indigo-500 dark:focus:ring-primary placeholder:text-gray-400 dark:placeholder:text-outline/50 transition-all outline-none"
                            />
                        </div>
                        <div className="hidden lg:flex items-center gap-2 px-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-secondary animate-pulse"></span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline">Đang kết nối</span>
                        </div>
                    </div>
                    
                    <Link
                        href={route('admin.teachers.create')}
                        className="w-full lg:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-gradient-to-r dark:from-primary dark:to-primary-container text-white dark:text-[#002113] px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-indigo-500/20 dark:shadow-primary/20"
                    >
                        <span className="material-symbols-outlined text-lg">person_add</span>
                        Thêm Giảng Viên
                    </Link>
                </div>

                {/* Premium High-Density Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-surface-container-low/50 border-b border-gray-200 dark:border-outline-variant/10">
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Cấu hình Giảng Viên</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Liên Lạc</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Bộ môn Trực Thuộc</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Trạng thái Làm việc</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline text-right">Thao Tác Hệ Thống</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-outline-variant/5">
                            {teachers.data && teachers.data.length > 0 ? (
                                teachers.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-surface-container-highest border border-gray-200 dark:border-outline-variant/20 flex items-center justify-center text-indigo-600 dark:text-primary font-bold shadow-inner">
                                                    {item.user?.name ? item.user.name.charAt(0).toUpperCase() : 'T'}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-primary transition-colors">{item.user?.name}</p>
                                                    <span className="inline-block px-2 py-0.5 rounded bg-indigo-50 dark:bg-primary-container/20 text-[9px] font-bold text-indigo-600 dark:text-primary tracking-wider uppercase mt-1">
                                                        MÃ GV: {item.id}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-5">
                                            <div className="text-sm text-gray-600 dark:text-on-surface-variant font-medium">{item.phone || 'Chưa cung cấp'}</div>
                                            <div className="text-[11px] text-gray-500 dark:text-outline mt-0.5">{item.user?.email || 'Chưa cung cấp'}</div>
                                        </td>
                                        
                                        <td className="px-6 py-5">
                                            <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                                {/* Mock subjects since backend may not give them eagerly */}
                                                <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-surface-container-highest text-[10px] text-gray-600 dark:text-outline font-medium tracking-wide">Khoa Tự Động Hóa & Hệ Thống</span>
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-secondary/10 text-emerald-600 dark:text-secondary text-[10px] font-bold tracking-wider uppercase">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-secondary"></span>
                                                ĐANG HOẠT ĐỘNG
                                            </span>
                                        </td>
                                        
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={route('admin.teachers.show', item.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-outline hover:text-emerald-600 dark:hover:text-secondary hover:bg-emerald-50 dark:hover:bg-secondary/10 transition-all"
                                                    title="Xem chi tiết"
                                                >
                                                    <span className="material-symbols-outlined text-lg">visibility</span>
                                                </Link>
                                                <Link
                                                    href={route('admin.teachers.edit', item.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-outline hover:text-indigo-600 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-surface-container-highest transition-all"
                                                    title="Sửa Hồ Sơ"
                                                >
                                                    <span className="material-symbols-outlined text-lg">edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => confirm(`Xóa giảng viên "${item.user?.name}"?`) && router.delete(route('admin.teachers.destroy', item.id))}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-outline hover:text-rose-600 hover:bg-rose-50 dark:hover:text-tertiary dark:hover:bg-tertiary/10 transition-all"
                                                    title="Xóa"
                                                >
                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-16 text-center text-gray-500 dark:text-outline">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-surface-container-highest mb-4">
                                            <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-outline-variant">person_off</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-on-surface">Cấu Hình Không Hợp Lệ</p>
                                        <p className="text-xs mt-1">Chưa có thông tin nhân sự nào được đi qua điểm này. Vui lòng bổ xung.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination links={teachers.links} />
            </div>
        </div>
    );
}

Index.layout = page => <AppLayout children={page} />;

function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="p-6 bg-gray-50/50 dark:bg-surface-container-low/50 flex flex-wrap justify-center sm:justify-between items-center border-t border-gray-200 dark:border-outline-variant/10 gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline">Phân Trang Cơ Sở Dữ Liệu</p>
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
