"use client"
import EyeSlashIcon from '@/icons/EyeSlashIcon'
import { EyeIcon, InboxIcon, Loader2, LockIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { login } from '../../authApi'
import { setCookie } from '@/lib/action'
import { useRouter } from 'next/navigation'

const SignInForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [Loading, setLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();


    const handleSubmit = async () => {
        const userData = {
            email,
            password
        }
        setLoading(true)
        try {
            const res = await login(userData)
            const data = await res.json().catch(() => ({}))

            if (!res.ok) {
                if (data.code === "EMAIL_NOT_VERIFIED") {
                    await setCookie("pending_verify_email", email, 60 * 7);
                    alert(data.message);
                    return router.push("/verify-otp");
                }

                const errorMessage = data.message || `HTTP Error: ${res.status}`;
                throw new Error(errorMessage);
            }

            await setCookie("token", data.data?.token, 60 * 60 * 24 * 7);

            alert(data.message);

            const targetRole = data?.user?.role;
            if (targetRole) {
                router.push(`/dashboard/${targetRole}`);
            }
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
            </div>
            <div className="flex justify-between items-center py-4">
                <div className="flex gap-2">
                    <input id="remember" type="checkbox" />
                    <label htmlFor="remember" className="font-semibold select-none">تذكرني</label>
                </div>
                <Link href="/forgot-password" className="text-sm text-[#5FABF8] font-semibold hover:underline">هل نسيت كلمة المرور؟</Link>
            </div>
            <button className="bg-[#1E4C6F] w-full text-white text-lg h-11 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300">{Loading ?
                <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin w-6 h-6 inline-block mr-2" />
                </span>
                :
                "تسجيل الدخول"
            }
            </button>
        </form>
    )
}

export default SignInForm;