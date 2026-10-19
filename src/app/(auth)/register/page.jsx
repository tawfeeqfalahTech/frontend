import AuthVisual from "@/features/auth/components/shared/AuthVisual";
import AuthHero from "@/features/auth/components/shared/AuthHero"
import AuthHeader from "@/features/auth/components/shared/AuthHeader"
import AuthSocial from "@/features/auth/components/sign-in/AuthSocial"
import SignUpForm from "@/features/auth/components/sign-in/SignUpForm"
import Link from "next/link"

const Page = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <AuthHero />
            <div className="relative z-10 grid grid-cols-2 max-[1163px]:grid-cols-1 min-h-screen mx-15 max-[520px]:mx-5">
                <div className="flex items-center max-[1163px]:justify-center min-h-screen py-6">
                    <div className="bg-white rounded-2xl w-full max-w-100 px-6 pb-5 pt-9.5">
                        <AuthHeader head="شارك مشروعك" paragraph="أنشئ الحساب الآن وابحث عن داعم لمشروعك" />
                        <div className="mt-6">
                            <SignUpForm />
                        </div>
                        <AuthSocial />
                        <p className="text-xs text-center font-semibold mt-4">لديك حساب بالفعل؟ <Link href="/login" className="text-[#5FABF8] underline">تسجيل الدخول</Link></p>
                    </div>
                </div>
                <AuthVisual
                    title="من الفكرة الى الاستثمار"
                    description={<>منصة ذكية تربط أصحاب الأفكار بالمستثمرين، بتقييم موضوعي<br /> يكشف القيمة الحقيقية لكل مشروع</>}
                />
            </div>
        </div>
    )
}

export default Page
