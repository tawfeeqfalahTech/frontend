"use client"
import { InboxIcon, Loader2, LockIcon } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { login } from '../../authApi'
import { getAuthErrors, validateAuthForm } from '../../formErrors'
import { setCookie } from '@/lib/action'
import { useRouter } from 'next/navigation'
import AuthInput from './AuthInput'

const SignInForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [formError, setFormError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const submitting = useRef(false)
    const router = useRouter()

    const updateField = (field, setter) => (event) => {
        setter(event.target.value)
        setErrors((previous) => ({ ...previous, [field]: undefined }))
        setFormError("")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (submitting.current) return
        const userData = { email: email.trim(), password }
        const validation = validateAuthForm(userData)
        setErrors(validation)
        setFormError("")
        if (Object.keys(validation).length) return
        submitting.current = true
        setLoading(true)
        try {
            const res = await login(userData)
            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
                if (data.code === "EMAIL_NOT_VERIFIED") {
                    await setCookie("pending_verify_email", userData.email, 60 * 7)
                    return router.push("/verify-otp")
                }
                if (data.code === "ROLE_REQUIRED") {
                    await setCookie("pending_selection_role", userData.email, 60 * 7)
                    return router.push("/auth/select-role")
                }
                const result = getAuthErrors(data, res.status, ["email", "password"])
                setErrors(result.fieldErrors)
                setFormError(result.formError)
                return
            }
            await setCookie("token", data.data?.token, 60 * 60 * 24 * 7)
            const targetRole = data?.user?.role
            if (targetRole) router.push(`/dashboard/${targetRole}`)
        } catch {
            setFormError("تعذر إتمام تسجيل الدخول. تحقق من اتصال الإنترنت وحاول مجدداً.")
        } finally {
            submitting.current = false
            setLoading(false)
        }
    }

    return (
        <form noValidate onSubmit={handleSubmit} aria-busy={loading}>
            <div className="flex flex-col space-y-4">
                <AuthInput id="login-email" name="email" label="البريد الالكتروني" icon={InboxIcon}
                    type="email" autoComplete="email" required disabled={loading} value={email}
                    error={errors.email} onChange={updateField("email", setEmail)} />
                <AuthInput id="login-password" name="password" label="كلمة المرور" icon={LockIcon}
                    type={showPassword ? "text" : "password"} autoComplete="current-password" required
                    disabled={loading} value={password} error={errors.password}
                    onChange={updateField("password", setPassword)} showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)} />
            </div>
            <div className="flex justify-between items-center py-4">
                <div className="flex gap-2">
                    <input id="remember" type="checkbox" disabled={loading} />
                    <label htmlFor="remember" className="font-semibold select-none">تذكرني</label>
                </div>
                <Link href="/forgot-password" className="text-sm text-[#5FABF8] font-semibold hover:underline">هل نسيت كلمة المرور؟</Link>
            </div>
            {formError && <p role="alert" className="text-red-600 text-sm mb-3 leading-relaxed">{formError}</p>}
            <button type="submit" disabled={loading} className="bg-[#1E4C6F] w-full text-white text-lg h-11 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                {loading ? <span role="status" className="flex gap-2 items-center justify-center"><Loader2 aria-hidden="true" className="animate-spin w-5 h-5" />جاري تسجيل الدخول...</span> : "تسجيل الدخول"}
            </button>
        </form>
    )
}

export default SignInForm
