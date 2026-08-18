"use client";
import React from 'react';
import { MoreVertical, ArrowLeft } from 'lucide-react';

const projects = [
    { id: '0001356', title: 'إدارة الحجوزات', rating: '80%', status: 'نشط', updatedAt: 'منذ ساعتين' },
    { id: '0001356', title: 'إدارة الحجوزات', rating: '80%', status: 'نشط', updatedAt: 'منذ ساعتين' },
    { id: '0001356', title: 'إدارة الحجوزات', rating: '80%', status: 'نشط', updatedAt: 'منذ ساعتين' },
    { id: '0001356', title: 'إدارة الحجوزات', rating: '80%', status: 'نشط', updatedAt: 'منذ ساعتين' },
    { id: '0001356', title: 'إدارة الحجوزات', rating: '80%', status: 'نشط', updatedAt: 'منذ ساعتين' },
    { id: '0001356', title: 'إدارة الحجوزات', rating: '80%', status: 'نشط', updatedAt: 'منذ ساعتين' },
];

export default function ProjectsTable() {
    return (
        <div className="w-full bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden dir-rtl mt-2.5" dir="rtl">
            <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                    <thead>
                        <tr className="bg-[#EEF1F6] text-slate-700 text-xs sm:text-sm font-bold">
                            <th className="py-2.5 px-4 text-right">رقم م.</th>
                            <th className="py-2.5 px-4 text-right">عنوان المشروع</th>
                            <th className="py-2.5 px-4 text-center">التقييم</th>
                            <th className="py-2.5 px-4 text-center">الحالة</th>
                            <th className="py-2.5 px-4 text-center">تاريخ التحديث</th>
                            <th className="py-2.5 px-4 text-center">الإجراءات</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200/70 text-xs sm:text-sm">
                        {projects.map((item, index) => (
                            <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                                <td className="py-3.5 px-4 font-semibold text-slate-800">{item.id}</td>
                                <td className="py-3.5 px-4 font-bold text-slate-800">{item.title}</td>
                                <td className="py-3.5 px-4 text-center font-bold text-slate-800">{item.rating}</td>
                                <td className="py-3.5 px-4 text-center">
                                    <span className="inline-block bg-[#E2F4E6] text-[#2E7D32] text-xs font-bold px-3.5 py-1 rounded-full">
                                        {item.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-4 text-center text-slate-500 font-medium">{item.updatedAt}</td>
                                <td className="py-3.5 px-4 text-center">
                                    <button className="text-slate-600 hover:text-slate-900 transition-colors p-1 rounded-md">
                                        <MoreVertical size={16} className="mx-auto" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-[#EEF1F6] py-2 text-center border-t border-slate-200/70">
                <button className="inline-flex group items-center gap-2 text-xs sm:text-sm font-bold text-[#386685] hover:text-[#25465d] transition-colors">
                    <span>عرض جميع المشاريع</span>
                    <ArrowLeft size={16} className='group-hover:-translate-x-1 transition-transform duration-200' />
                </button>
            </div>
        </div>
    );
}