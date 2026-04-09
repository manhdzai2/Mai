import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Index({ assignments }) {
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
    const itemVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

    const handleDelete = (item) => {
        if (confirm(`Bạn có chắc muốn xóa phân công môn ${item.subject_name} cho lớp ${item.class_name}?`)) {
            router.delete(route('admin.course-assignments.destroy', {
                subject_id: item.subject_id,
                teacher_id: item.teacher_id,
                class_id: item.class_id
            }));
        }
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 pb-12">
            <Head title="Phân công giảng dạy" />

            {/* Page Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Phân công giảng dạy</h2>
                    <p className="text-on-surface-variant mt-1">Quản lý việc gán Giảng viên vào các Lớp học phần và Môn học.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href={route('admin.course-assignments.create')} className="px-5 py-2.5 bg-primary text-on-primary font-bold text-sm rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-[0_4px_12px_rgba(70,71,211,0.25)]">
                        <span className="material-symbols-outlined text-[18px]">add_task</span> Phân công mới
                    </Link>
                </div>
            </motion.div>

            {/* Table Container */}
            <motion.div variants={itemVariants} className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface-container-low/50 border-b border-outline-variant/10">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Môn học</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Giảng viên</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Lớp sinh viên</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Số lượng SV</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/5">
                            {assignments.length > 0 ? (
                                assignments.map((item, idx) => (
                                    <tr key={`${item.subject_id}-${item.teacher_id}-${item.class_id}`} className="hover:bg-primary/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-on-surface group-hover:text-primary transition-colors">{item.subject_name}</div>
                                            <div className="text-[10px] text-on-surface-variant font-mono uppercase mt-0.5">ID: {item.subject_id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">
                                                    {item.teacher_name.charAt(0)}
                                                </div>
                                                <span className="font-medium text-sm">{item.teacher_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-bold text-on-surface">
                                                {item.class_name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-[16px] text-primary">groups</span>
                                                <span className="font-bold text-sm">{item.student_count}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => handleDelete(item)}
                                                className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center hover:bg-error/20 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center">
                                        <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-30 mb-2">assignment_late</span>
                                        <p className="text-on-surface-variant font-medium">Chưa có phân công giảng dạy nào.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
