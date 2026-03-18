import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';

export default function Show({ subject, enrollments }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEnrollments = enrollments.filter((enrollment) => {
        const studentName = (enrollment.student?.user?.name || '').toLowerCase();
        const studentCode = (enrollment.student?.student_code || '').toLowerCase();
        const query = searchTerm.toLowerCase();
        return studentName.includes(query) || studentCode.includes(query);
    });

    // --- HÀM TÍNH TOÁN THỐNG KÊ LỚP HỌC ---
    const getStats = () => {
        let passed = 0;
        let failed = 0;
        enrollments.forEach(e => {
            const att = parseFloat(e.score?.attendance_score) || 0;
            const mid = parseFloat(e.score?.midterm_score) || 0;
            const fin = parseFloat(e.score?.final_score) || 0;
            // Chỉ tính những bạn đã có điểm cuối kỳ
            if (e.score?.final_score !== null && e.score?.final_score !== undefined) {
                const total = (att * 0.1) + (mid * 0.3) + (fin * 0.6);
                if (total >= 4.0) passed++; else failed++;
            }
        });
        return { passed, failed, totalGraded: passed + failed };
    };
    const stats = getStats();

    const exportToExcel = () => {
        const dataToExport = filteredEnrollments.map((e, index) => {
            const att = parseFloat(e.score?.attendance_score) || 0;
            const mid = parseFloat(e.score?.midterm_score) || 0;
            const fin = parseFloat(e.score?.final_score) || 0;
            const total = ((att * 0.1) + (mid * 0.3) + (fin * 0.6)).toFixed(1);
            
            let grade = 'F';
            if (total >= 8.5) grade = 'A';
            else if (total >= 7.0) grade = 'B';
            else if (total >= 5.5) grade = 'C';
            else if (total >= 4.0) grade = 'D';

            return {
                'STT': index + 1,
                'Mã Sinh Viên': e.student?.student_code || 'N/A',
                'Họ và Tên': e.student?.user?.name || 'Chưa cập nhật tên',
                'Điểm Chuyên Cần (10%)': e.score?.attendance_score || '',
                'Điểm Giữa Kỳ (30%)': e.score?.midterm_score || '',
                'Điểm Cuối Kỳ (60%)': e.score?.final_score || '',
                'Tổng Kết': e.score?.final_score ? total : '',
                'Xếp Loại': e.score?.final_score ? grade : ''
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng Điểm");
        worksheet['!cols'] = [ { wch: 5 }, { wch: 15 }, { wch: 25 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 15 }, { wch: 15 } ];
        XLSX.writeFile(workbook, `Bang_Diem_${subject.name}.xlsx`);
    };

    const printToPDF = () => {
        window.print();
    };

    return (
        <AppLayout>
            <Head title={`Chấm điểm - ${subject.name}`} />

            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 print:hidden">
                <div>
                    <Link href="/teacher/enrollments" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 mb-3 transition-colors">
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Quay lại danh sách lớp
                    </Link>
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        {subject.name}
                    </h1>
                    
                    {/* KHU VỰC THỐNG KÊ NHANH */}
                    <div className="flex items-center gap-4 mt-3">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 rounded-lg text-sm font-semibold border border-indigo-100 dark:border-indigo-500/20">
                            Sĩ số: {enrollments.length}
                        </span>
                        {stats.totalGraded > 0 && (
                            <>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-lg text-sm font-semibold border border-emerald-100 dark:border-emerald-500/20">
                                    Qua môn: {stats.passed} ({(stats.passed / stats.totalGraded * 100).toFixed(0)}%)
                                </span>
                                <span className="px-3 py-1 bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 rounded-lg text-sm font-semibold border border-rose-100 dark:border-rose-500/20">
                                    Trượt: {stats.failed} ({(stats.failed / stats.totalGraded * 100).toFixed(0)}%)
                                </span>
                            </>
                        )}
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm tên hoặc mã SV..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                        />
                    </div>

                    <button onClick={exportToExcel} className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-xl text-sm font-semibold transition-colors border border-emerald-200 dark:border-emerald-800/50">
                        Xuất Excel
                    </button>
                    <button onClick={printToPDF} className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 rounded-xl text-sm font-semibold transition-colors border border-rose-200 dark:border-rose-800/50">
                        In PDF
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden print:shadow-none print:border-none print:bg-transparent">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50/50 dark:bg-gray-800/50 print:bg-transparent">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Họ & Tên SV</th>
                                <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Mã SV</th>
                                <th className="px-2 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-24">CC (10%)</th>
                                <th className="px-2 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-24">GK (30%)</th>
                                <th className="px-2 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-24">CK (60%)</th>
                                <th className="px-4 py-4 text-center text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider w-24">Tổng</th>
                                <th className="px-4 py-4 text-center text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider w-24">Loại</th>
                                <th className="px-4 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider w-28 print:hidden">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 print:bg-transparent print:divide-gray-300">
                            {filteredEnrollments.length === 0 ? (
                                <tr><td colSpan="8" className="px-6 py-12 text-center text-gray-500">Không tìm thấy sinh viên nào.</td></tr>
                            ) : (
                                filteredEnrollments.map((enrollment) => (
                                    <ScoreRow key={enrollment.id} enrollment={enrollment} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}

function ScoreRow({ enrollment }) {
    const { data, setData, post, processing } = useForm({
        enrollment_id: enrollment.id,
        attendance_score: enrollment.score?.attendance_score ?? '',
        midterm_score: enrollment.score?.midterm_score ?? '',
        final_score: enrollment.score?.final_score ?? '',
    });

    // --- HÀM TÍNH ĐIỂM TỔNG KẾT VÀ XẾP LOẠI REAL-TIME ---
    const calculateGrade = () => {
        // Nếu chưa nhập điểm cuối kỳ thì khoan tính xếp loại
        if (data.final_score === '') return { total: '-', letter: '-', colorClass: 'text-gray-400 bg-gray-50 dark:bg-gray-800' };

        const att = parseFloat(data.attendance_score) || 0;
        const mid = parseFloat(data.midterm_score) || 0;
        const fin = parseFloat(data.final_score) || 0;
        
        const total = (att * 0.1 + mid * 0.3 + fin * 0.6).toFixed(1);
        
        if (total >= 8.5) return { total, letter: 'A', colorClass: 'text-emerald-700 bg-emerald-100 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-800' };
        if (total >= 7.0) return { total, letter: 'B', colorClass: 'text-blue-700 bg-blue-100 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-800' };
        if (total >= 5.5) return { total, letter: 'C', colorClass: 'text-amber-700 bg-amber-100 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-800' };
        if (total >= 4.0) return { total, letter: 'D', colorClass: 'text-orange-700 bg-orange-100 border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-800' };
        
        return { total, letter: 'F', colorClass: 'text-rose-700 bg-rose-100 border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-800' };
    };

    const gradeInfo = calculateGrade();

    const submit = (e) => {
        e.preventDefault();
        const toastId = toast.loading('Đang lưu...');
        post('/teacher/enrollments/update-score', {
            preserveScroll: true,
            onSuccess: () => toast.success(`Đã lưu điểm ${enrollment.student?.user?.name}`, { id: toastId }),
            onError: () => toast.error('Lưu thất bại!', { id: toastId })
        });
    };

    const renderInput = (name, value) => (
        <input
            type="number" step="0.1" min="0" max="10"
            value={value}
            onChange={(e) => setData(name, e.target.value)}
            className="w-16 text-center rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors print:border-none print:bg-transparent print:p-0 print:text-black print:font-bold"
            placeholder="-"
        />
    );

    return (
        <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs mr-3">
                        {enrollment.student?.user?.name?.charAt(0) || 'S'}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                        {enrollment.student?.user?.name || 'Chưa cập nhật tên'}
                    </div>
                </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-400">
                {enrollment.student?.student_code || 'N/A'}
            </td>
            
            <td className="px-2 py-4 whitespace-nowrap text-center">{renderInput('attendance_score', data.attendance_score)}</td>
            <td className="px-2 py-4 whitespace-nowrap text-center">{renderInput('midterm_score', data.midterm_score)}</td>
            <td className="px-2 py-4 whitespace-nowrap text-center">{renderInput('final_score', data.final_score)}</td>
            
            {/* CỘT TỔNG KẾT VÀ XẾP LOẠI MỚI */}
            <td className="px-4 py-4 whitespace-nowrap text-center">
                <span className="font-bold text-gray-900 dark:text-gray-100">{gradeInfo.total}</span>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-center">
                <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-sm font-bold border ${gradeInfo.colorClass}`}>
                    {gradeInfo.letter}
                </span>
            </td>

            <td className="px-4 py-4 whitespace-nowrap text-right print:hidden">
                <button
                    onClick={submit}
                    disabled={processing}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-400 dark:hover:bg-indigo-500/30 disabled:opacity-50"
                >
                    {processing ? '...' : 'Lưu'}
                </button>
            </td>
        </tr>
    );
}