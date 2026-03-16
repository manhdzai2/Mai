import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ subject = null }) {
    // Xác định xem đang ở chế độ Thêm mới hay Sửa
    const isUpdate = !!subject; 

    // Khởi tạo state cho form
    const { data, setData, post, put, processing, errors } = useForm({
        name: subject?.name || '',
        credit: subject?.credit || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Nếu có subject -> dùng PUT để cập nhật. Nếu không -> dùng POST để thêm mới
        if (isUpdate) {
            put(route('admin.subjects.update', subject.id));
        } else {
            post(route('admin.subjects.store'));
        }
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            <Head title={isUpdate ? `Chỉnh sửa: ${subject.name}` : "Thêm Môn Học Mới"} />

            {/* --- HEADER --- */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <Link href={route('admin.subjects.index')} className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Quay lại danh sách
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                        {isUpdate ? 'Chỉnh sửa môn học' : 'Thêm môn học mới'}
                    </h1>
                </div>
            </div>

            {/* --- FORM CONTAINER --- */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                    
                    {/* Tên môn học */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                            Tên môn học <span className="text-rose-500">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="VD: Toán cao cấp 1..."
                            className={`w-full px-4 py-3 bg-gray-50/50 border rounded-xl focus:bg-white focus:ring-4 transition-all ${
                                errors.name 
                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' 
                                    : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                            }`}
                        />
                        {/* Hiển thị lỗi validation từ Laravel */}
                        {errors.name && (
                            <p className="text-sm text-rose-500 flex items-center gap-1 mt-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Số tín chỉ */}
                    <div className="space-y-2">
                        <label htmlFor="credit" className="block text-sm font-semibold text-gray-700">
                            Số tín chỉ <span className="text-rose-500">*</span>
                        </label>
                        <input
                            id="credit"
                            type="number"
                            min="1"
                            max="15"
                            value={data.credit}
                            onChange={(e) => setData('credit', e.target.value)}
                            placeholder="Nhập số tín chỉ (VD: 3)"
                            className={`w-full md:w-1/2 px-4 py-3 bg-gray-50/50 border rounded-xl focus:bg-white focus:ring-4 transition-all ${
                                errors.credit 
                                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' 
                                    : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                            }`}
                        />
                        {errors.credit && (
                            <p className="text-sm text-rose-500 flex items-center gap-1 mt-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                {errors.credit}
                            </p>
                        )}
                    </div>

                    {/* Dải phân cách */}
                    <hr className="border-gray-100" />

                    {/* Nút hành động */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Link
                            href={route('admin.subjects.index')}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Hủy bỏ
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            {processing ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang lưu...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    {isUpdate ? 'Cập nhật' : 'Lưu môn học'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Bọc Component Layout
Form.layout = page => <AppLayout children={page} />;