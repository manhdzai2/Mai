import React, { useState } from 'react';
import TeacherLayout from '@/Layouts/TeacherLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ subject, semester, enrollments }) {
    const handleExportExcel = async () => {
        if (!enrollments || enrollments.length === 0) return alert("Không có dữ liệu.");
        const XLSX = await import('xlsx');
        const exportData = enrollments.map((enr, i) => ({
            "STT": i + 1,
            "Mã Sinh Viên": enr.student?.student_code || '',
            "Họ Tên": enr.student?.user?.name || '',
            "Điểm Chuyên Cần (10%)": enr.score?.attendance_score || '',
            "Điểm Giữa Kỳ (30%)": enr.score?.midterm_score || '',
            "Điểm Cuối Kỳ (60%)": enr.score?.final_score || '',
            "Điểm Tổng Kết": enr.score?.total_score || '',
            "Xếp Loại": enr.score?.grade || ''
        }));
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "BangDiem");
        XLSX.writeFile(workbook, `Bang_Diem_${subject?.code || 'lop'}.xlsx`);
    };

    const handleExportPDF = async () => {
        if (!enrollments || enrollments.length === 0) return alert("Không có dữ liệu.");
        const { default: jsPDF } = await import('jspdf');
        await import('jspdf-autotable');
        const doc = new jsPDF();
        
        doc.text(`Bang Diem: ${subject?.name || ''}`, 14, 15);
        doc.text(`Ma Hoc Phan: ${subject?.code || ''}`, 14, 22);

        const tableColumn = ["STT", "Ma SV", "Ho Ten", "Chuyen Can", "Giua Ky", "Cuoi Ky", "Tong Ket"];
        const tableRows = [];

        enrollments.forEach((enr, i) => {
            const data = [
                i + 1,
                enr.student?.student_code || '',
                (enr.student?.user?.name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D'),
                enr.score?.attendance_score || '-',
                enr.score?.midterm_score || '-',
                enr.score?.final_score || '-',
                enr.score?.total_score || '-'
            ];
            tableRows.push(data);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        });
        doc.save(`Bang_Diem_${subject?.code || 'lop'}.pdf`);
    };

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
        <div className="animate-fade-in space-y-8">
            <Head title={`Điểm số - ${subject?.name}`} />

            {/* Header & Back Button */}
            <div className="mb-8">
                <Link
                    href={route('teacher.enrollments.index')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors mb-6"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Quay lại Danh sách lớp
                </Link>
                
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="flex items-start gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center text-on-primary text-3xl font-black shadow-[0_8px_16px_rgba(70,71,211,0.25)] flex-shrink-0">
                            {subject?.name?.charAt(0) || 'C'}
                        </div>
                        <div>
                            <h2 className="text-3xl font-extrabold text-on-surface leading-tight font-headline tracking-tight">
                                {subject?.name}
                            </h2>
                            <div className="flex flex-wrap items-center gap-3 mt-3">
                                <span className="px-3 py-1 rounded-lg bg-surface-container text-xs font-bold font-mono text-on-surface">
                                    {subject?.code}
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                                    Học kỳ {semester}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm min-w-[110px]">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Sinh viên</p>
                            <p className="text-2xl font-black text-on-surface">{stats?.total || 0}</p>
                        </div>
                        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm min-w-[110px] relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary rounded-full"></div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Tỷ lệ Đạt</p>
                            <p className="text-2xl font-black text-on-surface">{stats?.passRate || 0}%</p>
                        </div>
                        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm min-w-[110px] relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full"></div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Điểm TB</p>
                            <p className="text-2xl font-black text-primary">{stats?.avg || '0.00'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-outline-variant/10">
                <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                    </span>
                    <span className="text-sm font-bold text-on-surface">Chấm điểm Trực tiếp</span>
                    <span className="text-xs text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full ml-2">
                        Đã chấm {stats?.entriesWithScore || 0}/{stats?.total || 0}
                    </span>
                </div>
                
                <div className="flex gap-3">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
                        <input type="text" placeholder="Tìm kiếm sinh viên..." className="w-64 bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-on-surface placeholder:text-on-surface-variant/50" />
                    </div>
                    <button onClick={handleExportExcel} className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant/20 hover:bg-surface-container text-on-surface rounded-lg text-sm font-bold transition-all shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">table_view</span> CSV
                    </button>
                    <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant/20 hover:bg-surface-container text-on-surface rounded-lg text-sm font-bold transition-all shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span> PDF
                    </button>
                </div>
            </div>

            {/* Grades Table */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surface-container-low border-b border-outline-variant/10 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                                <th className="px-6 py-4 w-16 text-center">STT</th>
                                <th className="px-6 py-4">Sinh viên</th>
                                <th className="px-4 py-4 text-center border-x border-outline-variant/5">Chuyên cần (10%)</th>
                                <th className="px-4 py-4 text-center border-r border-outline-variant/5">Giữa kỳ (30%)</th>
                                <th className="px-4 py-4 text-center border-r border-outline-variant/5">Cuối kỳ (60%)</th>
                                <th className="px-6 py-4 text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/5">
                            {enrollments && enrollments.length > 0 ? (
                                enrollments.map((enrollment, index) => (
                                    <ScoreRow key={enrollment.id} enrollment={enrollment} index={index} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-24 text-center">
                                        <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-50 mb-3 block">search_off</span>
                                        <h3 className="text-sm font-bold text-on-surface">Chưa có Sinh viên</h3>
                                        <p className="text-xs text-on-surface-variant mt-1">Vui lòng chờ sinh viên đăng ký học phần này.</p>
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
        <tr className="hover:bg-surface-container-high/30 transition-colors group">
            <td className="px-6 py-4 text-center text-xs font-bold text-on-surface-variant">
                {index + 1}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface font-bold text-sm shadow-inner shadow-black/5">
                        {enrollment.student?.user?.name ? enrollment.student.user.name.charAt(0) : 'S'}
                    </div>
                    <div>
                        <div className="font-bold text-on-surface text-sm">{enrollment.student?.user?.name || 'Không rõ'}</div>
                        <div className="text-[10px] font-mono font-bold text-on-surface-variant mt-0.5">{enrollment.student?.student_code}</div>
                    </div>
                </div>
            </td>
            
            <td className="px-4 py-4 text-center bg-primary/5 border-l border-outline-variant/5">
                {isEditing ? (
                    <input 
                        type="number" step="0.1" min="0" max="10"
                        value={data.attendance_score}
                        onChange={e => setData('attendance_score', e.target.value)}
                        className="w-16 px-2 py-1.5 text-center text-sm font-mono border border-outline-variant/20 rounded-md bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary text-on-surface outline-none"
                    />
                ) : (
                    <span className="font-mono text-on-surface font-bold text-sm">
                        {data.attendance_score !== '' ? data.attendance_score : <span className="text-on-surface-variant opacity-50">-</span>}
                    </span>
                )}
            </td>
            
            <td className="px-4 py-4 text-center bg-primary/5 border-l border-outline-variant/5">
                {isEditing ? (
                    <input 
                        type="number" step="0.1" min="0" max="10"
                        value={data.midterm_score}
                        onChange={e => setData('midterm_score', e.target.value)}
                        className="w-16 px-2 py-1.5 text-center text-sm font-mono border border-outline-variant/20 rounded-md bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary text-on-surface outline-none"
                    />
                ) : (
                    <span className="font-mono text-on-surface font-bold text-sm">
                        {data.midterm_score !== '' ? data.midterm_score : <span className="text-on-surface-variant opacity-50">-</span>}
                    </span>
                )}
            </td>
            
            <td className="px-4 py-4 text-center bg-primary/5 border-x border-outline-variant/5">
                {isEditing ? (
                    <input 
                        type="number" step="0.1" min="0" max="10"
                        value={data.final_score}
                        onChange={e => setData('final_score', e.target.value)}
                        className="w-16 px-2 py-1.5 text-center text-sm font-mono border border-outline-variant/20 rounded-md bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary text-on-surface outline-none"
                    />
                ) : (
                    <span className="font-mono text-on-surface font-bold text-sm">
                        {data.final_score !== '' ? data.final_score : <span className="text-on-surface-variant opacity-50">-</span>}
                    </span>
                )}
            </td>

            <td className="px-6 py-4 text-center">
                {isEditing ? (
                    <div className="flex items-center justify-center gap-2">
                        <button 
                            onClick={handleSave} 
                            disabled={processing}
                            className="p-1.5 text-white bg-primary hover:bg-primary-dim rounded-md transition-all shadow-sm shadow-primary/20"
                            title="Lưu điểm"
                        >
                            <span className="material-symbols-outlined text-[18px]">check</span>
                        </button>
                        <button 
                            onClick={() => setIsEditing(false)} 
                            className="p-1.5 text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high rounded-md transition-all"
                            title="Hủy"
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="mx-auto flex items-center justify-center w-8 h-8 text-primary bg-primary/10 hover:bg-primary hover:text-on-primary rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Sửa điểm"
                    >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                )}
            </td>
        </tr>
    );
}

Show.layout = page => <TeacherLayout>{page}</TeacherLayout>;