import React, { useState, useMemo } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Form({ subjects, teachers, classes, students }) {
    const [mode, setMode] = useState('class'); // 'class' hoặc 'student'
    const [searchTerm, setSearchTerm] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        subject_id: '',
        teacher_id: '',
        class_id: '',
        student_ids: [],
        semester: 1,
        academic_year: '2024-2025',
    });


    const filteredStudents = useMemo(() => {
        if (!searchTerm) return students;
        const s = searchTerm.toLowerCase();
        return students.filter(st => 
            st.name.toLowerCase().includes(s) || 
            st.code.toLowerCase().includes(s) ||
            st.class_name.toLowerCase().includes(s)
        );
    }, [searchTerm, students]);

    const handleStudentToggle = (id) => {
        const currentIds = [...data.student_ids];
        const index = currentIds.indexOf(id);
        if (index > -1) {
            currentIds.splice(index, 1);
        } else {
            currentIds.push(id);
        }
        setData('student_ids', currentIds);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.course-assignments.store'));
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8 py-4">
            <Head title="Phân công giảng dạy" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-on-surface tracking-tight">Phân công giảng dạy</h1>
                    <p className="text-sm text-on-surface-variant mt-1.5 font-medium">
                        Gán Giảng viên & Môn học cho một Lớp hoặc những Sinh viên cụ thể.
                    </p>
                </div>
                <Link href={route('admin.course-assignments.index')} className="text-sm font-semibold text-on-surface-variant hover:text-on-surface px-4 py-2 rounded-xl bg-surface-container-low">Hủy bỏ</Link>
            </div>

            <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden">
                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left: General Settings */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">settings</span> Cấu hình chung
                            </h3>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-on-surface ml-1">Chọn Môn học <span className="text-error">*</span></label>
                                <select value={data.subject_id} onChange={e => setData('subject_id', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-low text-sm outline-none focus:ring-4 focus:ring-primary/10">
                                    <option value="">-- Chọn môn học --</option>
                                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
                                </select>
                                {errors.subject_id && <p className="text-xs text-error font-medium ml-1">{errors.subject_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-on-surface ml-1">Chọn Giảng viên <span className="text-error">*</span></label>
                                <select value={data.teacher_id} onChange={e => setData('teacher_id', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-low text-sm outline-none focus:ring-4 focus:ring-primary/10">
                                    <option value="">-- Chọn giảng viên --</option>
                                    {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                                {errors.teacher_id && <p className="text-xs text-error font-medium ml-1">{errors.teacher_id}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-on-surface ml-1">Học kỳ <span className="text-error">*</span></label>
                                    <select value={data.semester} onChange={e => setData('semester', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-low text-sm outline-none focus:ring-4 focus:ring-primary/10">
                                        <option value={1}>Học kỳ 1</option>
                                        <option value={2}>Học kỳ 2</option>
                                        <option value={3}>Học kỳ hè</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-on-surface ml-1">Năm học <span className="text-error">*</span></label>
                                    <input 
                                        type="text" 
                                        value={data.academic_year} 
                                        onChange={e => setData('academic_year', e.target.value)} 
                                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-low text-sm outline-none focus:ring-4 focus:ring-primary/10" 
                                        placeholder="2024-2025"
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Right: Selection Mode */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">group</span> Đối tượng phân công
                            </h3>

                            <div className="flex bg-surface-container-low p-1 rounded-2xl border border-outline-variant/10">
                                <button type="button" onClick={() => setMode('class')} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'class' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}>Theo Lớp</button>
                                <button type="button" onClick={() => setMode('student')} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'student' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}>Theo Sinh viên</button>
                            </div>

                            <AnimatePresence mode="wait">
                                {mode === 'class' ? (
                                    <motion.div key="class" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-on-surface ml-1">Chọn Lớp sinh viên <span className="text-error">*</span></label>
                                            <select value={data.class_id} onChange={e => setData('class_id', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-low text-sm outline-none focus:ring-4 focus:ring-primary/10">
                                                <option value="">-- Chọn lớp sinh viên --</option>
                                                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                            </select>
                                            {errors.class_id && <p className="text-xs text-error font-medium ml-1">{errors.class_id}</p>}
                                        </div>
                                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-[11px] text-primary font-medium leading-relaxed italic">
                                            * Hệ thống sẽ tự động gán toàn bộ sinh viên đang thuộc lớp này vào danh sách lớp học phần.
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div key="student" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4 flex flex-col h-[400px]">
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
                                            <input 
                                                type="text" 
                                                placeholder="Tìm tên, mã SV hoặc lớp..." 
                                                value={searchTerm}
                                                onChange={e => setSearchTerm(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container-low text-xs outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>

                                        <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                            {filteredStudents.map(student => (
                                                <div 
                                                    key={student.id} 
                                                    onClick={() => handleStudentToggle(student.id)}
                                                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${data.student_ids.includes(student.id) ? 'bg-primary/5 border-primary shadow-sm' : 'bg-surface-container-low border-outline-variant/10 hover:border-outline-variant/50'}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${data.student_ids.includes(student.id) ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                                                            {student.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-on-surface">{student.name}</p>
                                                            <p className="text-[10px] text-on-surface-variant font-mono">{student.code} • {student.class_name}</p>
                                                        </div>
                                                    </div>
                                                    {data.student_ids.includes(student.id) && <span className="material-symbols-outlined text-primary text-lg">check_circle</span>}
                                                </div>
                                            ))}
                                            {filteredStudents.length === 0 && <p className="text-center py-10 text-xs text-on-surface-variant italic">Không tìm thấy sinh viên phù hợp.</p>}
                                        </div>
                                        
                                        <div className="pt-2 border-t border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest">
                                            <span className="text-[11px] font-bold text-primary italic">Đã chọn: {data.student_ids.length} sinh viên</span>
                                            <button type="button" onClick={() => setData('student_ids', [])} className="text-[10px] font-bold text-error uppercase hover:underline">Bỏ chọn hết</button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-outline-variant/10">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary text-sm px-10 py-3.5 rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all font-bold active:scale-95 disabled:opacity-70"
                        >
                            {processing ? 'Đang thực hiện...' : 'Xác nhận Phân công'}
                        </button>
                    </div>
                </form>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(70, 71, 211, 0.2); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(70, 71, 211, 0.4); }
            `}} />
        </motion.div>
    );
}

Form.layout = page => <AdminLayout>{page}</AdminLayout>;
