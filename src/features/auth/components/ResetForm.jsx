"use client"
import EyeSlashIcon from '@/icons/EyeSlashIcon'
import { EyeIcon, LockIcon } from 'lucide-react'
import { useState } from 'react'

const ResetForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <form className='flex flex-col space-y-4 pb-1'>
            <div className="relative">
                <LockIcon className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
                <input type={!showPassword ? "password" : "text"} className="bg-white font-semibold outline-none w-full rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] pr-10.5 [::-ms-reveal]:hidden [::-ms-clear]:hidden" placeholder="كلمة المرور" />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    {showPassword ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
                </button>
            </div>
            <div className="relative">
                <LockIcon className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
                <input type={!showConfirmPassword ? "password" : "text"} className="bg-white font-semibold outline-none w-full rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] pr-10.5 [::-ms-reveal]:hidden [::-ms-clear]:hidden" placeholder="تأكيد كلمة المرور" />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    {showConfirmPassword ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
                </button>
            </div>
            <button className="bg-[#1E4C6F] w-full text-white text-lg py-2 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300">إعادة التعيين</button>
        </form>
    )
}

export default ResetForm