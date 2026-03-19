import React, { useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { debounce } from 'lodash';

export default function Index({ classes, filters }) {
    const searchRef = useRef(
        debounce((value) => {
            router.get(
                route('admin.classes.index'),
                { search: value },
                { preserveState: true, replace: true }
            );
        }, 300)
    ).current;

    useEffect(() => {
        return () => searchRef.cancel();
    }, [searchRef]);

    const totalClasses = classes.total || classes.data?.length || 0;

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <Head title="Quản Lý Ngành/Khóa" />

            <div className="flex justify-between items-end mb-2">
                <div>
                    <span className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-rose-600 dark:text-tertiary mb-1 block">Quản Trị Tổ Chức</span>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Thống Kê Ngành & Khóa</h2>
                </div>
            </div>

            <div className="glass-card bg-white dark:bg-transparent rounded-xl overflow-hidden shadow-sm dark:shadow-2xl border border-gray-200 dark:border-outline-variant/10">
                <div className="p-6 flex flex-col lg:flex-row justify-between items-center gap-4 border-b border-gray-200 dark:border-outline-variant/10 bg-gray-50/50 dark:bg-surface-container-low/30">
                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="relative w-full lg:w-80 group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-outline text-sm group-focus-within:text-rose-600 dark:group-focus-within:text-tertiary transition-colors">search</span>
                            <input
                                type="text"
                                placeholder="Tìm kiếm mã thiết lập khóa..."
                                defaultValue={filters?.search || ''}
                                onChange={(e) => searchRef(e.target.value)}
                                className="bg-gray-100/50 dark:bg-surface-container-highest/50 text-sm rounded-xl border-none pl-10 pr-4 py-2.5 w-full text-gray-900 dark:text-on-surface focus:ring-1 focus:ring-rose-500 dark:focus:ring-tertiary placeholder:text-gray-400 dark:placeholder:text-outline/50 transition-all font-['Inter'] outline-none"
                            />
                        </div>
                    </div>
                    
                    <Link
                        href={route('admin.classes.create')}
                        className="w-full lg:w-auto flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 dark:bg-gradient-to-r dark:from-tertiary dark:to-[#bf0f3c] text-white dark:text-[#40000d] px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-rose-500/20 dark:shadow-tertiary/20"
                    >
                        <span className="material-symbols-outlined text-lg">add_box</span>
                        Khởi Tạo Ngành Khóa Mới
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-surface-container-low/50 border-b border-gray-200 dark:border-outline-variant/10">
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline w-64">Mã Tổ Chức</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Mô tả Vi Mô</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline text-right">Biên Bản Lưu Trữ</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline text-right">Lọc Lệnh Hoạt Động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-outline-variant/5">
                            {classes.data && classes.data.length > 0 ? (
                                classes.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-rose-50 dark:bg-tertiary/10 flex items-center justify-center text-rose-600 dark:text-tertiary font-bold uppercase text-sm border border-rose-100 dark:border-tertiary/20 shadow-sm dark:shadow-[0_0_10px_rgba(255,178,183,0.1)]">
                                                    CP
                                                </div>
                                                <span className="font-bold text-gray-900 dark:text-white text-sm font-mono tracking-wide group-hover:text-rose-600 dark:group-hover:text-tertiary transition-colors">
                                                    {item.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-on-surface-variant max-w-xs truncate">
                                            {item.description || <span className="text-gray-400 dark:text-outline italic text-xs">Phân hệ này chưa có mô tả nào trong CSDL.</span>}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={route('admin.classes.show', item.id)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 dark:text-tertiary bg-rose-50 hover:bg-rose-600 hover:text-white dark:bg-tertiary/10 dark:hover:bg-tertiary dark:hover:text-[#40000d] transition-all border border-rose-100 dark:border-tertiary/20 shadow-sm"
                                            >
                                                <span className="material-symbols-outlined text-[14px]">view_list</span>
                                                Liệt Số Tổ Chức
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={route('admin.classes.edit', item.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-outline hover:text-indigo-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-surface-container-highest transition-all"
                                                    title="Thay thế Định danh"
                                                >
                                                    <span className="material-symbols-outlined text-lg">edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => confirm(`Tiêu hủy Khóa/Ngành ${item.name}? Các liên kết sinh viên sẽ bị xáo trộn. Cân nhắc kỹ.`) && router.delete(route('admin.classes.destroy', item.id))}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-outline hover:text-rose-600 dark:hover:text-tertiary hover:bg-rose-50 dark:hover:bg-tertiary/10 transition-all"
                                                    title="Giải Phóng Ngành/Khóa"
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
                                            <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-outline-variant">class</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-on-surface">Không Có Dữ Liệu Ngành/Khóa Tồn Tại</p>
                                        <p className="text-xs mt-1">Sử dụng nút khởi tạo hệ mới để thiết lập cấu trúc cho Sinh viên.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination links={classes.links} />
            </div>
        </div>
    );
}

Index.layout = page => <AppLayout children={page} />;

function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="p-6 bg-gray-50/50 dark:bg-surface-container-low/50 flex flex-wrap justify-center sm:justify-between items-center border-t border-gray-200 dark:border-outline-variant/10 gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-outline">Băng Thông Phân Trang</p>
            <div className="flex items-center gap-2">
                {links.map((link, index) => {
                    const label = link.label.replace('&laquo;', 'Trước').replace('&raquo;', 'Sau');
                    
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
                                    ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20 dark:bg-tertiary dark:text-[#40000d] dark:shadow-tertiary/20' 
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