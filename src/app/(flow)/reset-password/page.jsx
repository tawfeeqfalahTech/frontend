import AuthVisual from "@/features/auth/components/shared/AuthVisual";
import AuthHero from "@/features/auth/components/shared/AuthHero"
import AuthHeader from "@/features/auth/components/shared/AuthHeader"
import ResetForm from "@/features/auth/components/password-reset/ResetForm"

const Page = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <AuthHero />
            <div className="relative z-10 grid grid-cols-2 max-[1163px]:grid-cols-1 min-h-screen mx-15 max-[520px]:mx-5">
                <div className="flex items-center max-[1163px]:justify-center h-screen max-[520px]:my-10">
                    <div className="bg-white rounded-2xl w-full max-w-100 px-6 pb-5 pt-8">
                        <AuthHeader head="إعادة تعيين كلمة المرور" paragraph="أدخل  كلمة المرور الجديدة وقم بتأكيدها" />
                        <div className="mt-4">
                            <ResetForm />
                        </div>
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