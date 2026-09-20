import { X } from 'lucide-react'
import React from 'react'

const StepThree = () => {
    return (
        <main>
            <div>
                <section>

                    <label htmlFor="team" className="font-bold text-slate-800 text-">أعضاء الفريق</label>
                    <div className='flex items-center gap-3 mt-2'>
                        <input
                            id="name"
                            type="text"
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 text-sm transition-all duration-300 outline-none hover:border-slate-300 focus:border-[#1E4C6F] focus:ring-4 focus:ring-[#1E4C6F]/10 placeholder:text-slate-400 placeholder:font-normal"
                            placeholder="الإسم"
                        />
                        <input
                            id="title"
                            type="text"
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 text-sm transition-all duration-300 outline-none hover:border-slate-300 focus:border-[#1E4C6F] focus:ring-4 focus:ring-[#1E4C6F]/10 placeholder:text-slate-400 placeholder:font-normal"
                            placeholder="الدور"
                        />
                        <div className='p-2.5 flex items-center justify-center border border-slate-200 shadow-sm rounded-xl'>
                            <X size={20} />
                        </div>
                    </div>
                    <button className="bg-[#1E4C6F] mt-4 flex items-center justify-center w-30 text-white text-lg h-11 rounded-xl cursor-pointer hover:-translate-y-0.5 hover:bg-[#163852] transition-all duration-300">
                        إضافة عضو
                    </button>
                </section>
                <hr className='block my-3 text-gray-300' />
                <section>
                    <h3 className="font-bold text-slate-800 text-">الميزانية المطلوبة</h3>
                    <div className='flex items-center justify-between gap-3 mt-3'>
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor="" className="font-seminbold text-slate-800 text-">الحد الأدنى للتمويل $</label>

                            <input
                                id="title"
                                type="text"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 text-sm transition-all duration-300 outline-none hover:border-slate-300 focus:border-[#1E4C6F] focus:ring-4 focus:ring-[#1E4C6F]/10 placeholder:text-slate-400 placeholder:font-normal"
                                placeholder="1,000$"
                            />
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor="" className="font-seminbold text-slate-800 text-">الحد الأقصى للتمويل</label>

                            <input
                                id="title"
                                type="text"
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 text-sm transition-all duration-300 outline-none hover:border-slate-300 focus:border-[#1E4C6F] focus:ring-4 focus:ring-[#1E4C6F]/10 placeholder:text-slate-400 placeholder:font-normal"
                                placeholder="10,000$"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default StepThree