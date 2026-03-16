import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import * as XLSX from 'xlsx'; // <-- Import thư viện Excel

export default function Show({ subject, enrollments }) {
    
    // --- HÀM XUẤT RA FILE EXCEL ---
    const exportToExcel = () => {
        // 1. Chuẩn bị dữ liệu từ danh sách sinh viên
        const dataToExport = enrollments.map((e, index) => ({
            'STT': index + 1,
            'Mã Sinh Viên': e.student?.student_code || 'N/A',
            'Họ và Tên': e.student?.user?.name || 'Chưa cập nhật tên',
            'Điểm Chuyên Cần (10)': e.score?.attendance_score || '',
            'Điểm Giữa Kỳ (10)': e.score?.midterm_score || '',
            'Điểm Cuối Kỳ (10)': e.score?.final_score || '',
        }));

        // 2. Tạo worksheet và workbook
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng Điểm");

        // 3. Chỉnh độ rộng cột cho đẹp
        worksheet['!cols'] = [ { wch: 5 }, { wch: 15 }, { wch: 25 }, { wch: 20 }, { wch: 20 }, { wch: 20 } ];

        // 4. Lưu file tải về máy
        XLSX.writeFile(workbook, `Bang_Diem_${subject.name}.xlsx`);
    };

    // --- HÀM IN PDF (Dùng trình duyệt) ---
    const printToPDF = () => {
        window.print();
    };

    return (
        <AppLayout>
            <Head title={`Chấm điểm - ${subject.name}`} />

            {/* Tiêu đề & Cụm nút Export (Thêm class print:hidden để khi in PDF sẽ ẩn cụm nút này đi) */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 print:hidden">
                <div>
                    <Link href="/teacher/enrollments" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 mb-3 transition-colors">
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Quay lại danh sách lớp
                    </Link>
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        {subject.name}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                        Quản lý điểm chuyên cần, giữa kỳ và cuối kỳ của sinh viên.
                    </p>
                </div>
                
                {/* 2 NÚT EXCEL VÀ PDF MỚI THÊM VÀO ĐÂY */}
                <div className="flex items-center gap-3">
                    <button 
                        onClick={exportToExcel}
                        className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20 rounded-xl text-sm font-semibold transition-colors duration-200 border border-emerald-200 dark:border-emerald-800/50"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Xuất Excel
                    </button>
                    
                    <button 
                        onClick={printToPDF}
                        className="inline-flex items-center px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 rounded-xl text-sm font-semibold transition-colors duration-200 border border-rose-200 dark:border-rose-800/50"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                        In PDF
                    </button>
                </div>
            </div>

            {/* Bảng chấm điểm */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden print:shadow-none print:border-none print:bg-transparent">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50/50 dark:bg-gray-800/50 print:bg-transparent">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider print:text-black">Họ & Tên SV</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider print:text-black">Mã SV</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32 print:text-black">Chuyên cần (10)</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32 print:text-black">Giữa kỳ (10)</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32 print:text-black">Cuối kỳ (10)</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32 print:hidden">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 print:bg-transparent print:divide-gray-300">
                            {enrollments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        Chưa có sinh viên nào đăng ký môn học này.
                                    </td>
                                </tr>
                            ) : (
                                enrollments.map((enrollment) => (
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

// Component con xử lý việc nhập và lưu điểm cho TỪNG sinh viên
function ScoreRow({ enrollment }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        enrollment_id: enrollment.id,
        attendance_score: enrollment.score?.attendance_score ?? '',
        midterm_score: enrollment.score?.midterm_score ?? '',
        final_score: enrollment.score?.final_score ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/teacher/enrollments/update-score', {
            preserveScroll: true, // Không bị giật lên đầu trang khi lưu
        });
    };

    // Hàm tiện ích tạo ô input (Khi in PDF, nó sẽ hiển thị dưới dạng văn bản tĩnh nhờ class print:...)
    const renderInput = (name, value) => (
        <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={value}
            onChange={(e) => setData(name, e.target.value)}
            className="w-20 text-center rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors print:border-none print:bg-transparent print:p-0 print:text-black print:font-bold"
            placeholder="-"
        />
    );

    return (
        <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs mr-3 print:border print:border-gray-400 print:bg-white print:text-black">
                        {enrollment.student?.user?.name?.charAt(0) || 'S'}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-200 print:text-black">
                        {enrollment.student?.user?.name || 'Chưa cập nhật tên'}
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-400 print:text-black">
                {enrollment.student?.student_code || 'N/A'}
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-center">
                {renderInput('attendance_score', data.attendance_score)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
                {renderInput('midterm_score', data.midterm_score)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
                {renderInput('final_score', data.final_score)}
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-right print:hidden">
                <button
                    onClick={submit}
                    disabled={processing}
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        recentlySuccessful 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                            : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-400 dark:hover:bg-indigo-500/30'
                    }`}
                >
                    {recentlySuccessful ? (
                        <>
                            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            Đã lưu
                        </>
                    ) : (
                        processing ? 'Đang lưu...' : 'Lưu điểm'
                    )}
                </button>
            </td>
        </tr>
    );
}