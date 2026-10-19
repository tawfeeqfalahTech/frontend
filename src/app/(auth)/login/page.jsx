import AuthHeader from "@/features/auth/components/shared/AuthHeader"
import AuthVisual from "@/features/auth/components/shared/AuthVisual";
import AuthHero from "@/features/auth/components/shared/AuthHero"
import AuthSocial from "@/features/auth/components/sign-in/AuthSocial"
import SignInForm from "@/features/auth/components/sign-in/SignInForm"
import Link from "next/link"

const Page = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <AuthHero />
            <div className="relative z-10 grid grid-cols-2 max-[1163px]:grid-cols-1 min-h-screen mx-15 max-[520px]:mx-5">
                <div className="flex items-center max-[1163px]:justify-center min-h-screen py-6">
                    <div className="bg-white rounded-2xl w-full max-w-100 px-6 pb-5 pt-9.5">
                        <AuthHeader head="تسجيل الدخول" paragraph="مرحبا بعودتك! سجل دخولك للوصول إلى حسابك" />
                        <div className="mt-6">
                            <SignInForm />
                        </div>
                        <AuthSocial />
                        <p className="text-xs text-center font-semibold mt-4">هل تريد إنشاء <Link href="/register" className="text-[#5FABF8] underline">حساب جديد</Link></p>
                    </div>
                </div>
                <AuthVisual
                    title="اكتشف فرصتك القادمة"
                    description={<>سجل الدخول الآن وابدأ بعرض مشاريعك ليشاهدها المستثمرين,<br /> وأطلق العنان لمشروعك.</>}
                />
            </div>
        </div>
    )
}

export default Page
