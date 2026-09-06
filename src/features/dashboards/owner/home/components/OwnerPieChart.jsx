"use client";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'نشط', value: 8, percentage: '33%', color: '#4EA853' },
    { name: 'قيد التقييم', value: 10, percentage: '42%', color: '#F7931E' },
    { name: 'مرفوض', value: 6, percentage: '25%', color: '#F14336' },
];

export default function ProjectsStatusChart() {
    const totalProjects = data.reduce((acc, item) => acc + item.value, 0);

    return (
        <div className="w-full bg-white rounded-2xl px-5 pt-5 pb-2 border border-slate-100 shadow-sm dir-rtl" dir="rtl">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
                توزيع المشاريع حسب الحالة
            </h3>

            <div className="flex flex-col items-center justify-between gap-4 py-2">
                <div className="relative w-44 h-44 flex-shrink-">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={52}
                                outerRadius={70}
                                paddingAngle={4}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        <span className="text-2xl font-extrabold text-slate-900 leading-none">
                            {totalProjects}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 mt-1">
                            إجمالي المشاريع
                        </span>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between gap-7 flex-row-reverse">
                            <div className="text-center min-w-[40px]">
                                <div className="text-base font-bold text-slate-900 leading-tight">
                                    {item.value}
                                </div>
                                <div className="text-xs text-slate-500 font-medium">
                                    {item.percentage}
                                </div>
                            </div>

                            <div className="flex items-center flex-row-reverse gap-2">
                                <span className="text-sm font-bold text-slate-800">
                                    {item.name}
                                </span>
                                <span
                                    className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: item.color }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}