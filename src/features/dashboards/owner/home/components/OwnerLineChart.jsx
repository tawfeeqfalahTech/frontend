"use client";
import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { ArrowUpRight } from 'lucide-react';

const data = [
    { day: 'السبت', count: 24 },
    { day: 'الأحد', count: 40 },
    { day: 'الإثنين', count: 18 },
    { day: 'الثلاثاء', count: 32 },
    { day: 'الأربعاء', count: 55 },
    { day: 'الخميس', count: 48 },
    { day: 'الجمعة', count: 70 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-lg border border-slate-800 text-xs font-sans dir-rtl">
                <p className="font-semibold text-slate-300 mb-1">{label}</p>
                <p className="text-blue-400 font-bold">
                    المهتمون: <span className="text-white">{payload[0].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function InterestedChart() {
    return (
        <div className="w-full bg-white rounded-2xl pt-4 pb-6 px-4 border border-slate-100 shadow-sm dir-rtl" dir="rtl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">

                    <div>
                        <h3 className="text-base font-bold text-slate-800">عدد المهتمين</h3>
                        <p className="text-xs text-slate-500 pt-1">إحصائيات الإقبال للأيام السبعة الماضية</p>
                    </div>
                </div>
                <div className='flex flex-col items-center space-y-1'>

                    <span className='text-2xl font-bold'>147</span>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                        <ArrowUpRight className="w-4 h-4" />
                        <span>+14.5%</span>
                    </div>
                </div>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 2, left: -40, bottom: 0 }}>
                        <defs>
                            <linearGradient id="interestedGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F1F5F9" />

                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748B', fontSize: 12 }}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        <Area
                            type="linear"
                            dataKey="count"
                            stroke="#2563EB"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#interestedGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
