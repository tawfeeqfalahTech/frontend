"use client"
import { MoveLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const NotFound = () => {
    const router = useRouter()
    return (
        <main className='flex flex-col items-center justify-center h-screen w-full'>
            <h1 className='text-6xl text-[#1E4C6F] font-black'>عذرا!</h1>
            <h2 className='text-4xl text-[#9E7f4d] font-bold mt-4'>الصفحة غير موجودة</h2>
            <button onClick={() => router.back()} className="bg-[#1E4C6F] mt-4 group flex items-center justify-center gap-2 w-80 text-white text-lg h-11 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300">
                العودة للصفحة السابقة <MoveLeft className='group-hover:-translate-x-1 transition-transform duration-200' />
            </button>
            <div className="relative mb-6 h-75 w-full max-w-md mt-4">
                <Image
                    src="/images/404.png"
                    alt="Not found page"
                    priority
                    unoptimized
                    fill
                    className="h-full w-full object-contain"
                />
            </div>
        </main>
    )
}

export default NotFound