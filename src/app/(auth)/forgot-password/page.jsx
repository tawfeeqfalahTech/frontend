import AuthVisual from "@/features/auth/components/shared/AuthVisual";
import AuthHero from "@/features/auth/components/shared/AuthHero"
import AuthHeader from "@/features/auth/components/shared/AuthHeader"
import ForgotForm from "@/features/auth/components/password-reset/ForgotForm"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

const Page = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <AuthHero />
            <div className="relative z-10 grid grid-cols-2 max-[1163px]:grid-cols-1 min-h-screen mx-15 max-[520px]:mx-5">
                <div className="flex items-center max-[1163px]:justify-center h-screen max-[520px]:my-10">
                    <div className="bg-white rounded-2xl w-full max-w-100 px-6 pt-8">
                        <AuthHeader head="نسيت كلمة المرور" paragraph="أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق للمتابعة" />
                        <div className="mt-4">
                            <ForgotForm />
                        </div>
                        <Link href="/login" className="text-sm text-center font-bold py-4.5 flex justify-center items-center gap-1 group text-gray-500 hover:text-black transition-colors duration-200">العودة لتسجيل الدخول <ArrowLeftIcon size={20} className="group-hover:-translate-x-1 transition-transform duration-200" /></Link>
                    </div>
                </div>
                <AuthVisual
                    title="لا تدع كلمة مرور تُوقف قصة نجاحك"
                    description={<>أدخل بريدك الإلكتروني, وارجع خلال دقائق لمتابعة رحلتك على إحياء,<br /> ومتابعة كل الفرص والمشاريع التي بانتظارك.</>}
                />
            </div>
        </div>
    )
}

export default Page