import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ student }) {
    // Nếu có biến student truyền vào -> Chế độ Sửa. Ngược lại -> Chế độ Thêm mới
    const isEditing = !!student;

    // Khởi tạo form với Inertia
    const { data, setData, post, put, processing, errors } = useForm({
        name: student?.user?.name || '',
        email: student?.user?.email || '',
        student_code: student?.student_code || '',
        password: '', // Password luôn để trống mặc định
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            // Cập nhật (dùng PUT)
            put(route('admin.students.update', student.id));
        } else {
            // Thêm mới (dùng POST)
            post(route('admin.students.store'));
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <Head title={isEditing ? 'Chỉnh sửa Sinh viên' : 'Thêm Sinh viên mới'} />

            {/* --- HEADER --- */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                        {isEditing ? 'Chỉnh sửa thông tin' : 'Thêm sinh viên mới'}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isEditing ? `Cập nhật dữ liệu cho sinh viên ${student.student_code}` : 'Tạo tài khoản và hồ sơ sinh viên mới'}
                    </p>
                </div>
                <Link
                    href={route('admin.students.index')}
                    className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl shadow-sm transition-all font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Quay lại
                </Link>
            </div>

            {/* --- FORM --- */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Cột 1: Thông tin tài khoản */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Thông tin Tài khoản</h3>
                                
                                <div className="space-y-4">
                                    {/* Tên sinh viên */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Họ và Tên <span className="text-rose-500">*</span></label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className={`w-full rounded-xl shadow-sm transition-all ${errors.name ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                                            placeholder="VD: Nguyễn Văn A"
                                        />
                                        {errors.name && <p className="mt-1.5 text-sm text-rose-500">{errors.name}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email (Dùng để đăng nhập) <span className="text-rose-500">*</span></label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className={`w-full rounded-xl shadow-sm transition-all ${errors.email ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                                            placeholder="VD: nguyenvana@example.com"
                                        />
                                        {errors.email && <p className="mt-1.5 text-sm text-rose-500">{errors.email}</p>}
                                    </div>

                                    {/* Mật khẩu */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Mật khẩu {isEditing ? <span className="text-gray-400 font-normal">(Bỏ trống nếu không muốn đổi)</span> : <span className="text-rose-500">*</span>}
                                        </label>
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            className={`w-full rounded-xl shadow-sm transition-all ${errors.password ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                                            placeholder="Nhập ít nhất 8 ký tự"
                                        />
                                        {errors.password && <p className="mt-1.5 text-sm text-rose-500">{errors.password}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cột 2: Thông tin hồ sơ */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Hồ sơ Sinh viên</h3>
                                
                                <div className="space-y-4">
                                    {/* Mã Sinh viên */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mã Sinh viên <span className="text-rose-500">*</span></label>
                                        <input
                                            type="text"
                                            value={data.student_code}
                                            onChange={e => setData('student_code', e.target.value)}
                                            className={`w-full font-mono rounded-xl shadow-sm transition-all ${errors.student_code ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                                            placeholder="VD: SV2023001"
                                        />
                                        {errors.student_code && <p className="mt-1.5 text-sm text-rose-500">{errors.student_code}</p>}
                                    </div>
                                    
                                    {/* Ghi chú nhắc nhở */}
                                    <div className="bg-indigo-50 rounded-xl p-4 mt-4 border border-indigo-100">
                                        <div className="flex gap-3">
                                            <svg className="w-5 h-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <p className="text-sm text-indigo-800">
                                                Khi bạn {isEditing ? 'cập nhật' : 'tạo mới'} sinh viên này, hệ thống sẽ đồng bộ trực tiếp với cơ sở dữ liệu tài khoản (Users) để sinh viên có thể dùng Email và Mật khẩu trên để đăng nhập vào hệ thống xem điểm và lịch học.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- NÚT SUBMIT --- */}
                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                        <Link
                            href={route('admin.students.index')}
                            className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                        >
                            Hủy bỏ
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {processing && (
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {isEditing ? 'Lưu thay đổi' : 'Tạo sinh viên'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Bọc Component Layout
Form.layout = page => <AppLayout children={page} />;