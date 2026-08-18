"use client"
import EyeSlashIcon from '@/icons/EyeSlashIcon'
import { EyeIcon, InboxIcon, LockIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const path = usePathname()
    return (
        <form>
            <div className="flex flex-col space-y-4">
                {path === "/register" && (
                    <div className="relative">
                        <InboxIcon className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
                        <input type="text" className="bg-white font-semibold w-full outline-none rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] pr-10.5" placeholder="الاسم الكامل" />
                    </div>
                )}
                <div className="relative">
                    <InboxIcon className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
                    <input type="email" className="bg-white font-semibold w-full outline-none rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] pr-10.5" placeholder="البريد الالكتروني" />
                </div>
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
                {path === "/register" && (
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
                )}
            </div>
            {path !== "/register" ? (
                <div className="flex justify-between items-center py-4">
                    <div className="flex gap-2">
                        <input id="remember" type="checkbox" />
                        <label htmlFor="remember" className="font-semibold select-none">تذكرني</label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-[#5FABF8] font-semibold hover:underline">هل نسيت كلمة المرور؟</Link>
                </div>
            ) : (
                <div className="flex gap-2 py-4">
                    <input id="agree" type="checkbox" />
                    <label htmlFor="agree" className="font-semibold text-sm select-none">الموافقة على<span className='text-[#5FABF8]'> الشروط والأحكام وسياسة الخصوصية</span></label>
                </div>
            )}
            <button className="bg-[#1E4C6F] w-full text-white text-lg py-2 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300">{path === "/owner/login" ? "تسجيل الدخول" : "إنشاء حساب"}</button>
        </form>
    )
}

export default SignInForm