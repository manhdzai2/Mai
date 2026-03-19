import React, { useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { debounce } from 'lodash';

export default function Index({ classrooms, filters }) {
    const searchRef = useRef(
        debounce((value) => {
            router.get(
                route('admin.classrooms.index'),
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
            <Head title="Lớp Học Phần" />

            <div className="flex justify-between items-end mb-2">
                <div>
                    <span className="font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-indigo-500 dark:text-[#c3c0ff] mb-1 block">Quản Lý Cơ Sở Vật Chất & Lịch Trình</span>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Ma Trận Cấp Lớp</h2>
                </div>
            </div>

            <div className="glass-card bg-white dark:bg-transparent rounded-xl overflow-hidden shadow-sm dark:shadow-2xl border border-gray-200 dark:border-outline-variant/10">
                <div className="p-6 flex flex-col lg:flex-row justify-between items-center gap-4 border-b border-gray-200 dark:border-outline-variant/10 bg-gray-50/50 dark:bg-surface-container-low/30">
                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="relative w-full lg:w-80 group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-outline text-sm group-focus-within:text-indigo-600 dark:group-focus-within:text-primary transition-colors">search</span>
                            <input
                                type="text"
                                placeholder="Tìm kiếm qua Mã lớp, Cơ Sở..."
                                defaultValue={filters?.search || ''}
                                onChange={(e) => searchRef(e.target.value)}
                                className="bg-gray-100/50 dark:bg-surface-container-highest/50 text-sm rounded-xl border-none pl-10 pr-4 py-2.5 w-full text-gray-900 dark:text-on-surface focus:ring-1 focus:ring-indigo-500 dark:focus:ring-primary placeholder:text-gray-400 dark:placeholder:text-outline/50 transition-all font-['Inter'] outline-none"
                            />
                        </div>
                    </div>
                    
                    <Link
                        href={route('admin.classrooms.create')}
                        className="w-full lg:w-auto flex items-center justify-center gap-2 bg-indigo-600 dark:bg-gradient-to-r dark:from-primary dark:to-primary-container text-white dark:text-[#002113] px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-indigo-500/20 dark:shadow-primary/20"
                    >
                        <span className="material-symbols-outlined text-lg">meeting_room</span>
                        Lập Lớp Học Thuật
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-surface-container-low/50 border-b border-gray-200 dark:border-outline-variant/10">
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline w-48">Mã Hoạt Động Cấp Lớp</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Môn Học Tương Quan</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline">Vị trí Hội trường</th>
                                <th className="px-6 py-4 font-['Inter'] uppercase tracking-widest text-[10px] font-bold text-gray-500 dark:text-outline text-right">Lọc Lệnh Quản Lý</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-outline-variant/5">
                            {classrooms.data && classrooms.data.length > 0 ? (
                                classrooms.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-primary-container/20 text-xs font-bold text-indigo-600 dark:text-primary font-mono tracking-widest border border-indigo-100 dark:border-primary/20">
                                                {item.name}
                                            </span>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                            {item.subject ? (
                                                <div>
                                                    <div className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-primary transition-colors">
                                                        {item.subject.name}
                                                    </div>
                                                    <div className="text-[10px] font-['Inter'] uppercase font-bold tracking-widest text-gray-500 dark:text-outline mt-1">
                                                        {item.subject.code}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 dark:text-outline italic text-xs">Chưa Liên Kết</span>
                                            )}
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                            {item.room ? (
                                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded border border-gray-200 dark:border-outline-variant/20 bg-gray-100 dark:bg-surface-container-highest text-xs font-bold text-indigo-500 dark:text-[#c3c0ff]">
                                                    <span className="material-symbols-outlined text-sm">nest_cam_wired_stand</span>
                                                    Phòng {item.room}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded border border-rose-200 dark:border-tertiary/20 bg-rose-50 dark:bg-tertiary/10 text-xs font-bold text-rose-600 dark:text-tertiary">
                                                    <span className="material-symbols-outlined text-sm">warning</span>
                                                    Chưa Quyết Định
                                                </span>
                                            )}
                                        </td>
                                        
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={route('admin.classrooms.edit', item.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-outline hover:text-indigo-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-surface-container-highest transition-all"
                                                    title="Điều chỉnh Cấp Lớp"
                                                >
                                                    <span className="material-symbols-outlined text-lg">edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => confirm(`Ngưng triển khai cấp lớp ${item.name}? Hoạt động này sẽ làm khóa đi đến tình trạng chờ hủy.`) && router.delete(route('admin.classrooms.destroy', item.id))}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-outline hover:text-rose-600 hover:bg-rose-50 dark:hover:text-tertiary dark:hover:bg-tertiary/10 transition-all"
                                                    title="Treo Lịch Hành Chính"
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
                                            <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-outline-variant">room_service</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-on-surface">Không tìm thấy Không Gian Lớp</p>
                                        <p className="text-xs mt-1">Sử dụng bộ công cụ để bố trí phòng ban học thuật mới.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination links={classrooms.links} />
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
