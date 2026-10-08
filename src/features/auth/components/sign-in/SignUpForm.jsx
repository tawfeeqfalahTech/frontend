"use client"
import { InboxIcon, Loader2, LockIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { register } from '../../authApi'
import { getAuthErrors, validateAuthForm } from '../../formErrors'
import { useRouter } from 'next/navigation'
import { setCookie } from '@/lib/action'
import AuthInput from './AuthInput'

const SignUpForm = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [agree, setAgree] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [formError, setFormError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const submitting = useRef(false)
    const router = useRouter()

    const updateField = (field, setter) => (event) => {
        setter(event.target.value)
        setErrors((previous) => ({ ...previous, [field]: undefined,
            ...(field === "password" ? { password_confirmation: undefined } : {}) }))
        setFormError("")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (submitting.current) return
        const userData = { name: userName.trim(), email: email.trim(), password, password_confirmation: confirmPassword }
        const validation = validateAuthForm({ ...userData, agree }, true)
        setErrors(validation)
        setFormError("")
        if (Object.keys(validation).length) return
        submitting.current = true
        setLoading(true)
        try {
            const res = await register(userData)
            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
                const result = getAuthErrors(data, res.status, ["name", "email", "password", "password_confirmation"])
                setErrors(result.fieldErrors)
                setFormError(result.formError)
                return
            }
            await setCookie("pending_verify_email", userData.email, 420)
            router.push('/verify-otp')
        } catch {
            setFormError("تعذر إتمام إنشاء الحساب. تحقق من اتصال الإنترنت وحاول مجدداً.")
        } finally {
            submitting.current = false
            setLoading(false)
        }
    }

    return (
        <form noValidate onSubmit={handleSubmit} aria-busy={loading}>
            <div className="flex flex-col gap-3">
                <AuthInput id="register-name" name="name" label="الاسم الكامل" icon={InboxIcon}
                    type="text" autoComplete="name" required disabled={loading} value={userName}
                    error={errors.name} onChange={updateField("name", setUserName)} />
                <AuthInput id="register-email" name="email" label="البريد الالكتروني" icon={InboxIcon}
                    type="email" autoComplete="email" required disabled={loading} value={email}
                    error={errors.email} onChange={updateField("email", setEmail)} />
                <AuthInput id="register-password" name="password" label="كلمة المرور" icon={LockIcon}
                    type={showPassword ? "text" : "password"} autoComplete="new-password" required
                    disabled={loading} value={password} error={errors.password}
                    onChange={updateField("password", setPassword)} showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)} />
                <AuthInput id="register-confirm-password" name="password_confirmation" label="تأكيد كلمة المرور" icon={LockIcon}
                    type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" required
                    disabled={loading} value={confirmPassword} error={errors.password_confirmation}
                    onChange={updateField("password_confirmation", setConfirmPassword)} showPassword={showConfirmPassword}
                    onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)} />
            </div>
            <div className="py-3">
                <div className="flex gap-2">
                    <input id="agree" name="agree" type="checkbox" required checked={agree} disabled={loading}
                        aria-invalid={Boolean(errors.agree)} aria-describedby={errors.agree ? "agree-error" : undefined}
                        onChange={(event) => { setAgree(event.target.checked); setErrors((previous) => ({ ...previous, agree: undefined })); setFormError("") }} />
                    <label htmlFor="agree" className="font-semibold text-sm select-none">الموافقة على<span className="text-[#5FABF8]"> الشروط والأحكام وسياسة الخصوصية</span></label>
                </div>
                {errors.agree && <p id="agree-error" role="alert" className="text-red-600 text-xs mt-0.5 leading-4">{errors.agree}</p>}
            </div>
            {formError && <p role="alert" className="text-red-600 text-sm mb-3 leading-relaxed">{formError}</p>}
            <button type="submit" disabled={loading} className="bg-[#1E4C6F] w-full text-white text-lg h-11 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                {loading ? <span role="status" className="flex gap-2 items-center justify-center"><Loader2 aria-hidden="true" className="animate-spin w-5 h-5" />جاري إنشاء الحساب...</span> : "إنشاء حساب"}
            </button>
        </form>
    )
}

export default SignUpForm
