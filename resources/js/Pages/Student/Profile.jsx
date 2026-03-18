import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, usePage } from '@inertiajs/react';

// DỮ LIỆU LỘ TRÌNH MẪU (Giữ nguyên của bạn)
const courseRoadmaps = {
    'Lập trình Web với Laravel': [
        { week: 'Tuần 1 - 3', title: 'Cơ bản về PHP & Kiến trúc MVC', desc: 'Ôn tập PHP, cài đặt môi trường Laragon, làm quen với cấu trúc thư mục Laravel.' },
        { week: 'Tuần 4 - 6', title: 'Routing, Controller & Blade/Inertia', desc: 'Tạo Route, xử lý logic tại Controller và render giao diện người dùng.' },
        { week: 'Tuần 7', title: 'Kiểm tra Giữa kỳ', desc: 'Thi thực hành trên máy 60 phút.', isExam: true },
        { week: 'Tuần 8 - 14', title: 'Database, Eloquent & API', desc: 'Migration, Seeder, Query Builder và tích hợp Laravel Breeze.' },
        { week: 'Tuần 15', title: 'Bảo vệ Đồ án Cuối kỳ', desc: 'Nộp project và thuyết trình trước hội đồng.', isExam: true },
    ],
    // ... (Các lộ trình khác giữ nguyên)
    'default': [
        { week: 'Tuần 1 - 4', title: 'Lý thuyết cơ bản', desc: 'Nắm vững các khái niệm nền tảng của môn học.' },
        { week: 'Tuần 5 - 7', title: 'Thực hành chuyên sâu', desc: 'Áp dụng lý thuyết vào bài tập thực tế.' },
        { week: 'Tuần 8', title: 'Thi Giữa Kỳ', desc: 'Kiểm tra đánh giá năng lực giai đoạn 1.', isExam: true },
        { week: 'Tuần 9 - 14', title: 'Nâng cao & Đồ án', desc: 'Triển khai dự án nhóm và học các kiến thức nâng cao.' },
        { week: 'Tuần 15', title: 'Thi Cuối Kỳ', desc: 'Đánh giá tổng kết môn học.', isExam: true },
    ]
};

export default function Profile({ studentInfo, enrollments }) {
    const { auth } = usePage().props;
    const [selectedSubject, setSelectedSubject] = useState(null);

    // NÂNG CẤP: Nhấn ESC để đóng Modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedSubject(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const calculateGrade = (score) => {
        if (!score || score.final_score === null) return null;
        const att = parseFloat(score.attendance_score) || 0;
        const mid = parseFloat(score.midterm_score) || 0;
        const fin = parseFloat(score.final_score) || 0;
        const total = (att * 0.1 + mid * 0.3 + fin * 0.6).toFixed(1);
        
        if (total >= 8.5) return { total, letter: 'A', gpa: 4.0, color: 'text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400' };
        if (total >= 7.0) return { total, letter: 'B', gpa: 3.0, color: 'text-blue-700 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' };
        if (total >= 5.5) return { total, letter: 'C', gpa: 2.0, color: 'text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400' };
        if (total >= 4.0) return { total, letter: 'D', gpa: 1.0, color: 'text-orange-700 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400' };
        return { total, letter: 'F', gpa: 0.0, color: 'text-rose-700 bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400' };
    };

    let totalGPA = 0;
    let gradedSubjects = 0;

    // NÂNG CẤP: Dùng (enrollments || []) để chống lỗi map() khi biến bị null
    const safeEnrollments = enrollments || [];
    const gradesList = safeEnrollments.map(e => {
        const grade = calculateGrade(e.score);
        if (grade) {
            totalGPA += grade.gpa;
            gradedSubjects++;
        }
        return { ...e, grade };
    });

    const finalGPA = gradedSubjects > 0 ? (totalGPA / gradedSubjects).toFixed(2) : '0.00';

    return (
        <AppLayout>
            <Head title="Hồ sơ Sinh viên" />

            {/* PHẦN HEADER THÔNG TIN (Giữ nguyên thiết kế đẹp của bạn) */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold border border-white/30 shadow-inner">
                            {auth.user.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight">{auth.user.name}</h1>
                            <p className="text-indigo-100 mt-1 flex items-center gap-2">
                                Mã SV: <strong className="text-white">{studentInfo?.student_code || 'Chưa cập nhật'}</strong>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center items-center text-center">
                    <p className="text-gray-500 font-medium uppercase tracking-widest text-xs mb-2">GPA Tích lũy</p>
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                        {finalGPA}
                    </div>
                </div>
            </div>

            {/* TIÊU ĐỀ BẢNG ĐIỂM */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    Bảng điểm & Lộ trình học
                </h2>
                <a href="/student/schedule" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg transition-colors">
                    Xem Lịch Học &rarr;
                </a>
            </div>
            
            {/* BẢNG ĐIỂM */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                {gradesList.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Môn học</th>
                                    <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Chuyên cần</th>
                                    <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Giữa kỳ</th>
                                    <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cuối kỳ</th>
                                    <th className="px-4 py-4 text-center text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Tổng</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Xếp loại</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                {gradesList.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900 dark:text-white">{item.subject?.name}</div>
                                            <button 
                                                onClick={() => setSelectedSubject(item.subject?.name)}
                                                className="text-xs text-indigo-500 hover:text-indigo-700 mt-1 font-semibold flex items-center gap-1 transition-colors outline-none"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                Xem lộ trình học
                                            </button>
                                        </td>
                                        <td className="px-4 py-4 text-center text-gray-600 dark:text-gray-300">{item.score?.attendance_score ?? '-'}</td>
                                        <td className="px-4 py-4 text-center text-gray-600 dark:text-gray-300">{item.score?.midterm_score ?? '-'}</td>
                                        <td className="px-4 py-4 text-center text-gray-600 dark:text-gray-300">{item.score?.final_score ?? '-'}</td>
                                        <td className="px-4 py-4 text-center font-bold text-gray-900 dark:text-white">{item.grade ? item.grade.total : '-'}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-3 py-1 rounded-full font-bold text-xs ${item.grade?.color || 'text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'}`}>
                                                {item.grade ? item.grade.letter : 'Chưa có'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    // NÂNG CẤP: Giao diện khi chưa có môn học nào
                    <div className="p-10 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <h3 className="text-gray-900 dark:text-white font-medium text-lg">Chưa có môn học nào</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-sm">Bạn chưa được xếp vào lớp học nào trong học kỳ này. Vui lòng liên hệ với Giáo vụ nếu đây là sự nhầm lẫn.</p>
                    </div>
                )}
            </div>

            {/* MODAL LỘ TRÌNH HỌC */}
            {selectedSubject && (
                // NÂNG CẤP: Bấm ra ngoài vùng tối (backdrop) để đóng Modal
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                    onClick={() => setSelectedSubject(null)}
                >
                    <div 
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden transform scale-100 transition-transform"
                        onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click lan ra ngoài làm đóng modal khi đang bấm bên trong
                    >
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Lộ trình môn học</h3>
                                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{selectedSubject}</p>
                            </div>
                            <button onClick={() => setSelectedSubject(null)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 bg-gray-50 dark:bg-gray-900/50">
                            <div className="relative border-l-2 border-indigo-200 dark:border-indigo-900/50 ml-3 md:ml-6 space-y-8">
                                {(courseRoadmaps[selectedSubject] || courseRoadmaps['default']).map((step, index) => (
                                    <div key={index} className="relative pl-8">
                                        <div className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white dark:border-gray-800 ${step.isExam ? 'bg-rose-500' : 'bg-indigo-500'}`}></div>
                                        <div className={`p-4 rounded-xl shadow-sm border transition-colors ${step.isExam ? 'bg-rose-50/50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-900/50' : 'bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700'}`}>
                                            <span className={`text-xs font-bold uppercase tracking-wider ${step.isExam ? 'text-rose-600 dark:text-rose-400' : 'text-indigo-600 dark:text-indigo-400'}`}>{step.week}</span>
                                            <h4 className="text-base font-bold mt-1 dark:text-white">{step.title}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-end">
                            <button onClick={() => setSelectedSubject(null)} className="px-5 py-2 bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-semibold rounded-xl">Đóng lại</button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}