"use client"
import EyeSlashIcon from '@/icons/EyeSlashIcon'
import { EyeIcon, InboxIcon, Loader2, LockIcon } from 'lucide-react'
import { useState } from 'react'
import { register } from '../../authApi'

const SignUpForm = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [Loading, setLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleSubmit = async () => {
        const data = {
            userName,
            email,
            password,
        }
        setLoading(true)
        try {
            await register(data)
            alert("تم إنشاء الحساب بنجاح")
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
            <div className="flex flex-col space-y-4">
                <div className="relative">
                    <InboxIcon className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
                    <input type="text" className="bg-white font-semibold w-full outline-none rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] pr-10.5" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="الاسم الكامل" />
                </div>
                <div className="relative">
                    <InboxIcon className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
                    <input type="email" className="bg-white font-semibold w-full outline-none rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] pr-10.5" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="البريد الالكتروني" />
                </div>
                <div className="relative">
                    <LockIcon className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
                    <input type={!showPassword ? "password" : "text"} className="bg-white font-semibold outline-none w-full rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] pr-10.5 [::-ms-reveal]:hidden [::-ms-clear]:hidden" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="كلمة المرور" />
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
                    <input type={!showConfirmPassword ? "password" : "text"} className="bg-white font-semibold outline-none w-full rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] pr-10.5 [::-ms-reveal]:hidden [::-ms-clear]:hidden" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="تأكيد كلمة المرور" />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        {showConfirmPassword ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
                    </button>
                </div>
            </div>

            <div className="flex gap-2 py-4">
                <input id="agree" type="checkbox" />
                <label htmlFor="agree" className="font-semibold text-sm select-none">الموافقة على<span className='text-[#5FABF8]'> الشروط والأحكام وسياسة الخصوصية</span></label>
            </div>
            <button className="bg-[#1E4C6F] w-full text-white text-lg h-11 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300">{Loading ?
                <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin w-6 h-6 inline-block mr-2" />
                </span>
                :
                "إنشاء حساب"
            }
            </button>        </form>
    )
}

export default SignUpForm;