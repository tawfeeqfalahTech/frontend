"use client"
import { User2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const Page = () => {
    const [userName, setUserName] = useState("")
    return (
        <main className='flex flex-col items-center justify-center'>
            <div className="relative rounded-full w-full max-w-35 h-35 overflow-hidden ring-2 ring-[#B19971] ring-offset-5">
                <Image
                    alt="avatar"
                    src="/images/avatar.png"
                    fill
                    priority
                    unoptimized
                    className="absolute object-cover rounded-full"
                />
            </div>
            <div className='grid grid-cols-2 gap-3 max-w-3xl w-full mt-5'>

                <section>
                    <h2 className="text-2xl font-bold pr-3 border-r-5 rounded-sm border-[#1E4C6F]">المعلومات الأساسية</h2>
                    <div className="relative mt-8">
                        <label htmlFor="name" className='absolute -top-7.5 font-semibold'>الاسم الكامل</label>
                        <User2 className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
                        <input type="text" id='name' className="bg-white font-semibold w-full outline-none rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.1)] pr-10.5" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="الاسم الكامل" />
                    </div>
                    <div className="relative mt-8">
                        <label htmlFor="bio" className='absolute -top-7.5 font-semibold'>الاسم الكامل</label>
                        <User2 className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
                        <textarea type="text" id='bio' className="bg-white font-semibold w-full outline-none rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.1)] pr-10.5" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="الاسم الكامل" />
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-bold pr-3 border-r-5 rounded-sm border-[#1E4C6F]">المعلومات الأساسية</h2>
                    <div className="relative">
                        <User2 className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
                        <input type="text" className="bg-white font-semibold w-full outline-none rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] pr-10.5" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="الاسم الكامل" />
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Page