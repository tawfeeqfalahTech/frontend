import React from 'react';
import { HeartHandshake, Clock, MoreVerticalIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
    { id: '0001356', title: 'إدارة الحجوزات', rating: '80%', status: 'نشط', Leads: "24", updatedAt: 'منذ ساعتين' },
    { id: '0001357', title: 'إدارة الحجوزات', rating: '0%', status: 'مرفوض', Leads: "24", updatedAt: 'منذ ساعتين' },
    { id: '0001358', title: 'إدارة الحجوزات', rating: '50%', status: 'قيد التقييم', Leads: "24", updatedAt: 'منذ ساعتين' },
    { id: '0001359', title: 'إدارة الحجوزات', rating: '80%', status: 'نشط', Leads: "24", updatedAt: 'منذ ساعتين' },
    { id: '0001310', title: 'إدارة الحجوزات', rating: '80%', status: 'نشط', Leads: "24", updatedAt: 'منذ ساعتين' },
    { id: '0001311', title: 'إدارة الحجوزات', rating: '80%', status: 'نشط', Leads: "24", updatedAt: 'منذ ساعتين' },
    { id: '0001312', title: 'إدارة الحجوزات', rating: '80%', status: 'نشط', Leads: "24", updatedAt: 'منذ ساعتين' },
    { id: '0001313', title: 'إدارة الحجوزات', rating: '80%', status: 'نشط', Leads: "24", updatedAt: 'منذ ساعتين' },
];

export default function ProjectsTable({ slice }) {

    const getScoreColor = (ratingString) => {
        const score = parseInt(ratingString, 10) || 0;


        if (score >= 80) {
            return {
                barClass: 'bg-emerald-500',
                textClass: 'text-emerald-600'
            };
        }
        if (score >= 50) {
            return {
                barClass: 'bg-amber-500',
                textClass: 'text-amber-600'
            };
        }
        return {
            barClass: 'bg-rose-500',
            textClass: 'text-rose-600'
        };
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'نشط':
                return {
                    badge: 'bg-emerald-100 text-emerald-800'
                };
            case 'قيد التقييم':
                return {
                    badge: 'bg-amber-100 text-amber-800'
                };
            case 'مرفوض':
                return {
                    badge: 'bg-rose-100 text-rose-800'
                };
            default:
                return {
                    badge: 'bg-slate-100 text-slate-700'
                };
        }
    };

    return (
        <div className="w-full px-5 bg-white rounded-2xl overflow-hidden dir-rtl mt-2.5" dir="rtl">
            <div className='flex items-center justify-between'>
                <h3 className='text-[#1E4C6F] text-lg font-bold'>المشاريع الأخيرة</h3>
                <Link href="/dashboard/idea-owner/projects" className='text-[#0039C4] text-sm font-semibold cursor-pointer'>عرض الكل</Link>
            </div>
            <div className='mt-3 flex flex-col space-y-3'>
                {projects.slice(0, slice).map((i) => (
                    <div key={i.id} className='flex items-center justify-between gap-4 h-25 rounded-2xl outline outline-slate-200 px-4 border-[#1E4C6F] border-l-8'>

                        <div className="relative w-33 h-19.5 rounded-2xl overflow-hidden">
                            <Image
                                src="/images/background_auth.jpeg"
                                alt="Background Auth"
                                sizes="120px"
                                className="object-cover"
                                fill
                                priority
                            />
                        </div>

                        <h3 className='text-base font-bold'>{i.title}</h3>

                        <div className='shrink-0 min-w-25 text-center'>
                            <span className={`font-semibold rounded-2xl px-4 py-2 text-sm w-full ${getStatusStyles(i.status)?.badge}`}>{i.status}</span>
                        </div>

                        <div className='relative rounded-full mt-3 h-1.75 w-35 bg-[#D9D9D9]'>
                            <div className='absolute -top-4.5 flex justify-between inset-x-0.5'>
                                <span className='text-xs font-bold'>التقييم</span>
                                <span className='text-xs font-bold'>{i.rating}</span>
                            </div>
                            <div className={`${getScoreColor(i.rating)?.barClass || 'bg-rose-500'} absolute h-1.75 rounded-full`} style={{ width: i.rating }} />
                        </div>

                        <div className='flex items-center gap-1 font-bold text-sm'>
                            <HeartHandshake size={21} />
                            <span>
                                {i.Leads} {" "} مهتم
                            </span>
                        </div>

                        <div className='flex items-center gap-1 font-bold text-sm'>
                            <Clock size={21} />
                            <span>
                                {i.updatedAt}
                            </span>
                        </div>

                        <div className='p-2 border cursor-pointer border-[#D5D4D4] rounded-xl hover:bg-[#F5F5F5] transition-colors duration-200'>
                            <MoreVerticalIcon />
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}