import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ courses }) {
    return (
        <AppLayout>
            <Head title="Học phần giảng dạy" />

            <div className="max-w-7xl mx-auto py-6">
                {/* Header của trang */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Học phần đang giảng dạy
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Danh sách các môn học và lớp học được phân công trong học kỳ.
                        </p>
                    </div>
                </div>

                {/* Kiểm tra nếu không có khóa học nào */}
                {!courses || courses.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center flex flex-col items-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Chưa có lớp học nào</h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">Hiện tại bạn chưa được phân công giảng dạy môn học nào.</p>
                    </div>
                ) : (
                    /* Hiển thị danh sách Grid Card */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course, index) => (
                            <div 
                                key={index} 
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col"
                            >
                                <div className="p-5 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-md">
                                            Kỳ {course.semester}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {course.credit} Tín chỉ
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                                        {course.subject_name}
                                    </h3>
                                    
                                    <div className="mt-4 flex items-center text-gray-600 dark:text-gray-400">
                                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className="text-sm font-medium">
                                            {course.total_students} Sinh viên
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 dark:bg-gray-900/50 px-5 py-3 border-t border-gray-100 dark:border-gray-800">
                                    {/* Nút xem chi tiết chuyển sang file Show.jsx */}
                                    <Link
                                        href={route('teacher.enrollments.show', { subject_id: course.subject_id, semester: course.semester })}
                                        className="block w-full text-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors py-1"
                                    >
                                        Xem danh sách lớp & Nhập điểm &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}