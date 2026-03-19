import React, { useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { debounce } from 'lodash';

export default function Index({ subjects, filters }) {
    const searchRef = useRef(
        debounce((value) => {
            router.get(
                route('admin.subjects.index'),
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
            <Head title="Học Phần Đào Tạo" />

            <div className="flex justify-between items-end mb-2">
                <div>
                    <span className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-emerald-600 dark:text-secondary mb-1 block">Quản Lý Đào Tạo</span>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Danh Mục Học Phần</h2>
                </div>
            </div>

            <div className="glass-card bg-white dark:bg-transparent rounded-xl overflow-hidden shadow-sm dark:shadow-2xl border border-gray-200 dark:border-outline-variant/10">
                <div className="p-6 flex flex-col lg:flex-row justify-between items-center gap-4 border-b border-gray-200 dark:border-outline-variant/10 bg-gray-50/50 dark:bg-surface-container-low/30">
                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="relative w-full lg:w-80 group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-outline text-sm group-focus-within:text-emerald-600 dark:group-focus-within:text-secondary transition-colors">search</span>
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo mã tín chỉ hoặc Tên môn..."
                                defaultValue={filters?.search || ''}
                                onChange={(e) => searchRef(e.target.value)}
                                className="bg-gray-100/50 dark:bg-surface-container-highest/50 text-sm rounded-xl border-none pl-10 pr-4 py-2.5 w-full text-gray-900 dark:text-on-surface focus:ring-1 focus:ring-emerald-500 dark:focus:ring-secondary placeholder:text-gray-400 dark:placeholder:text-outline/50 transition-all font-['Inter'] outline-none"
                            />
                        </div>
                    </div>
                    
                    <Link
                        href={route('admin.subjects.create')}
                        className="w-full lg:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-gradient-to-r dark:from-secondary dark:to-secondary-container text-white dark:text-[#002113] px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-emerald-500/20 dark:shadow-secondary/20"
                    >
                        <span className="material-symbols-outlined text-lg">add_circle</span>
                        Mở Môn Học Mới
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-surface-container-low/50 border-b border-gray-200 dark:border-outline-variant/10">
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline w-40">Mã Học Phần</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Tiêu Đề Môn Học</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Số Tín Chỉ</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline text-right">Thao Tác Hệ Thống</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-outline-variant/5">
                            {subjects.data && subjects.data.length > 0 ? (
                                subjects.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-surface-container-highest border border-gray-200 dark:border-outline-variant/20 text-xs font-bold text-emerald-600 dark:text-secondary font-mono tracking-widest shadow-inner">
                                                {item.code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-emerald-50 dark:bg-secondary/10 flex items-center justify-center text-emerald-600 dark:text-secondary">
                                                    <span className="material-symbols-outlined text-sm">book_4</span>
                                                </div>
                                                <span className="font-bold text-gray-900 dark:text-white text-sm tracking-wide group-hover:text-emerald-600 dark:group-hover:text-secondary transition-colors">
                                                    {item.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-50 dark:bg-secondary/10 text-emerald-600 dark:text-secondary border border-emerald-100 dark:border-secondary/20 text-xs font-black font-mono">
                                                    {item.credits}
                                                </span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline">Tín Chỉ</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={route('admin.subjects.edit', item.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-outline hover:text-indigo-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-surface-container-highest transition-all"
                                                    title="Điều Chỉnh Học Phần"
                                                >
                                                    <span className="material-symbols-outlined text-lg">edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => confirm(`Ngừng cung cấp khóa đào tạo ${item.code}?`) && router.delete(route('admin.subjects.destroy', item.id))}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-outline hover:text-rose-600 dark:hover:text-tertiary hover:bg-rose-50 dark:hover:bg-tertiary/10 transition-all"
                                                    title="Loại bỏ Học Phần"
                                                >
                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-16 text-center text-gray-500 dark:text-outline">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-surface-container-highest mb-4">
                                            <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-outline-variant">auto_stories</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-on-surface">Không tìm thấy Bộ Môn / Khóa học</p>
                                        <p className="text-xs mt-1">Vui lòng đăng ký các học phần mới vào Danh mục CSDL.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination links={subjects.links} colorClass="bg-emerald-600 text-white shadow-emerald-500/20 dark:bg-secondary dark:text-[#002113] dark:shadow-secondary/20" hoverColorClass="hover:text-emerald-600 dark:hover:text-secondary" />
            </div>
        </div>
    );
}

Index.layout = page => <AppLayout children={page} />;

function Pagination({ links, colorClass, hoverColorClass }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="p-6 bg-gray-50/50 dark:bg-surface-container-low/50 flex flex-wrap justify-center sm:justify-between items-center border-t border-gray-200 dark:border-outline-variant/10 gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline">Danh Mục Phân Trang</p>
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
                                    ? `${colorClass} shadow-md` 
                                    : `text-gray-600 ${hoverColorClass} hover:bg-gray-100 dark:text-outline dark:hover:bg-surface-container-highest`
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