import React, { useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { debounce } from 'lodash';

export default function Index({ subjects, filters }) {
    // Tối ưu search: Chỉ gọi API khi người dùng ngừng gõ 300ms
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
        return () => searchRef.cancel(); // Dọn dẹp debounce khi unmount
    }, [searchRef]);

    return (
        <div className="space-y-6 animate-fade-in">
            <Head title="Quản lý Môn học" />

            {/* --- HEADER & NÚT THÊM MỚI --- */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Môn học</h1>
                    <p className="text-sm text-gray-500 mt-1">Quản lý danh sách và số tín chỉ của các môn học</p>
                </div>
                <Link
                    href={route('admin.subjects.create')}
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Thêm môn học
                </Link>
            </div>

            {/* --- KHU VỰC TÌM KIẾM & BẢNG DỮ LIỆU --- */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                
                {/* Thanh công cụ tìm kiếm */}
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên môn học..."
                            defaultValue={filters?.search || ''}
                            onChange={(e) => searchRef(e.target.value)}
                            className="block w-full pl-10 pr-4 py-2.5 text-sm border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Bảng dữ liệu */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tên môn học</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Số tín chỉ</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {subjects.data && subjects.data.length > 0 ? (
                                subjects.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                                                    {item.name ? item.name.charAt(0).toUpperCase() : 'M'}
                                                </div>
                                                <span className="font-medium text-gray-900">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                {item.credit} tín chỉ
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                
                                                {/* --- NÚT XEM CHI TIẾT (MỚI THÊM) --- */}
                                                <Link
                                                    href={route('admin.subjects.show', item.id)}
                                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors tooltip-trigger"
                                                    title="Xem chi tiết"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                </Link>

                                                {/* --- Nút Chỉnh Sửa --- */}
                                                <Link
                                                    href={route('admin.subjects.edit', item.id)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip-trigger"
                                                    title="Chỉnh sửa"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                </Link>
                                                
                                                {/* --- Nút Xóa --- */}
                                                <button
                                                    onClick={() => confirm(`Bạn có chắc muốn xóa môn "${item.name}"?`) && router.delete(route('admin.subjects.destroy', item.id))}
                                                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors tooltip-trigger"
                                                    title="Xóa"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                            </div>
                                            <h3 className="text-gray-900 font-medium text-base">Chưa có môn học nào</h3>
                                            <p className="text-gray-500 text-sm mt-1">Hệ thống chưa có dữ liệu hoặc không tìm thấy kết quả phù hợp.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang (Pagination) */}
                <Pagination links={subjects.links} />

            </div>
        </div>
    );
}

// Bọc Component Layout
Index.layout = page => <AppLayout children={page} />;

// --- COMPONENT PHÂN TRANG (PAGINATION) ---
function Pagination({ links }) {
    // Nếu chỉ có 1 trang (Prev, 1, Next) thì ẩn luôn thanh phân trang cho gọn
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-1 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            {links.map((link, index) => {
                // Xử lý text "Previous" và "Next" của Laravel
                const label = link.label.replace('&laquo;', '«').replace('&raquo;', '»');
                
                return (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                            link.active 
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                                : !link.url 
                                    ? 'text-gray-400 cursor-not-allowed bg-transparent' 
                                    : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-indigo-600'
                        }`}
                        // Ngăn click nếu là link bị disable
                        onClick={(e) => !link.url && e.preventDefault()}
                    >
                        {label}
                    </Link>
                );
            })}
        </div>
    );
}