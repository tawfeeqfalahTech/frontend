import AuthHero from "@/features/auth/components/shared/AuthHero"
import AuthHeader from "@/features/auth/components/shared/AuthHeader"
import AuthSocial from "@/features/auth/components/sign-in/AuthSocial"
import SignInForm from "@/features/auth/components/sign-in/SignInForm"
import Link from "next/link"

const Page = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <AuthHero />
            <div className="relative z-10 grid grid-cols-2 max-[1155px]:grid-cols-1 min-h-screen mx-15 max-[520px]:mx-5">
                <div className="flex items-center max-[1155px]:justify-center h-screen max-[520px]:my-10">
                    <div className="bg-white rounded-2xl w-full max-w-100 px-6 pb-5 pt-9.5">
                        <AuthHeader head="تسجيل الدخول" paragraph="مرحبا بعودتك! سجل دخولك للوصول إلى حسابك" />
                        <div className="mt-6">
                            <SignInForm />
                        </div>
                        <AuthSocial />
                        <p className="text-xs text-center font-semibold mt-4">هل تريد إنشاء <Link href="/register" className="text-[#5FABF8] underline">حساب جديد</Link></p>
                    </div>
                </div>
                <div className="flex absolute max-[1155px]:hidden left-0 bottom-30 flex-col mt-auto">
                    <div>
                        <h2 className="text-center text-white font-bold text-3xl">اكتشف فرصتك القادمة</h2>
                        <p className="text-center text-white text-sm font-semibold pt-3">سجّل دخولك الآن, وابدأ رحلتك على إحياء — سواء كنت تبحث عن فرصة<br /> استثمارية أو تسعى لعرض فكرتك أمام المتسثمرين</p>
                    </div>

                    <div className="grid grid-cols-3 mt-5">
                        <div className="flex items-start gap-3 h-15 pt-3 pl-4 pr-2 xl:pr-4">
                            <div className="space-y-0.5">
                                <h3 className="text-xs xl:text-sm font-semibold text-white">سهولة التواصل</h3>
                                <p className="text-[10px] xl:text-xs text-gray-300 leading-snug">تواصل سهل وسريع بين المستثمر<br /> وصاحب المشروع</p>
                            </div>
                            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md shrink-0 border border-white/10">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 h-15 pt-3 border-r border-white/20 pl-4 pr-2 xl:pr-4">
                            <div className="space-y-0.5">
                                <h3 className="text-xs xl:text-sm font-semibold text-white">تقييم ذكي للفكرة</h3>
                                <p className="text-[10px] xl:text-xs text-gray-300 leading-snug">احصل على تحليل دقيق لإمكانيات<br /> فكرتك</p>
                            </div>
                            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md shrink-0 border border-white/10">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex items-start gap-2 h-15 pt-3 border-r border-white/20 pr-2 xl:pr-4">
                            <div className="space-y-0.5">
                                <h3 className="text-xs xl:text-sm font-semibold text-white">بيئة آمنة وموثوقة</h3>
                                <p className="text-[10px] xl:text-xs text-gray-300 leading-snug">بياناتك محمية بأعلى معايير<br /> الأمان</p>
                            </div>
                            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md shrink-0 border border-white/10">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-2.17 0-4.207-.576-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Page