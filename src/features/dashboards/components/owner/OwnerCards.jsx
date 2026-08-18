import { HomeIcon } from '@/icons/HomeIcon'
import { PlusIcon } from '@/icons/PlusIcon'
import { LucidePlus } from 'lucide-react'
import React from 'react'

const OwnerCards = () => {
    const cards = [
        { id: 1, head: "إجمالي المشاريع", value: "24", icon: <HomeIcon />, span: "12" },
        { id: 2, head: "إجمالي المشاريع", value: "24", icon: <HomeIcon />, span: "12" },
        { id: 3, head: "إجمالي المشاريع", value: "24", icon: <HomeIcon />, span: "12" },
        { id: 4, head: "إجمالي المشاريع", value: "24", icon: <HomeIcon />, span: "12" },
    ]
    return (
        <>
            <div className='flex items-center justify-between'>

                <div className='flex flex-col'>
                    <h1 className='text-[28px] font-semibold'>الرئيسية</h1>
                    <p className='text-[#B19971] font-semibold'>مرحبا بك مجدداً, إليك نظرة عامة على مشاريعك</p>
                </div>
                <div>
                    <button className='flex justify-center items-center gap-1 text-sm bg-[#1E4C6F] hover:bg-[#4b708c] font-semibold text-white transition-colors duration-200 h-11 w-35 cursor-pointer rounded-lg'>
                        <LucidePlus className='w-5 h-5' />
                        مشروع جديد
                    </button>
                </div>

            </div>

            <div className='grid grid-cols-4 max-[1020px]:grid-cols-2 gap-5 mt-5'>
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="bg-white rounded-2xl p-5 max-[1095px]:px-3 max-[1095px]:py-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="text-sm font-semibold text-slate-500 mb-1">
                                    إجمالي المشاريع
                                </h4>
                                <span className="text-4xl font-extrabold text-slate-900 tracking-tight block">
                                    24
                                </span>
                            </div>

                            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors">
                                <HomeIcon className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold">
                                sss
                            </span>
                            <span>عن الشهر الماضي</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default OwnerCards