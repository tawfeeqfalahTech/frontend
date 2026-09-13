"use client"
import Image from "next/image"
import UserGroupIcon from "@/icons/UserGroupIcon";
import RocketIcon from "@/icons/RokectIcon";
import ShieldCheckIcon from "@/icons/ShieldCheckIcon";
import IdeaIcon from "@/icons/IdeaIcon";
import LeafIcon from "@/icons/LeafIcon";
import DoveIcon from "@/icons/DoveIcon";
import BarChartIcon from "@/icons/BarChartIcon";
import { MoveRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Role } from "@/features/auth/authApi";
import { useState, useEffect } from "react";
import { deleteCookie, getCookie } from "@/lib/action";
import { getDashboardPath } from "@/lib/auth-routes";

const Page = () => {

    const router = useRouter()
    const [email, setEmail] = useState("")
    const [isMounted, setIsMounted] = useState(false)
    const [role, setRole] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let isSubscribed = true;

        async function initPage() {
            const pendingEmail = await getCookie("pending_selection_role");
            if (isSubscribed) {
                if (pendingEmail) {
                    setEmail(pendingEmail);
                }
                setIsMounted(true);
            }
        }

        initPage();

        return () => {
            isSubscribed = false;
        };
    }, []);

    const handleSubmit = async (selectedRole) => {
        const activeRole = selectedRole || role;
        if (!activeRole) return alert("الرجاء اختيار دورك")

        const userData = {
            email,
            role: activeRole
        }

        setLoading(true)
        try {
            const res = await Role(userData)

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                const errorMessage = data.message || "حدث خطأ في الطلب: " + res.status;
                throw new Error(errorMessage);
            }

            await deleteCookie("pending_selection_role")
            router.replace(getDashboardPath(data?.data?.user?.role));

        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    if (!isMounted) {
        return null
    }

    return (
        <main className="min-h-screen pb-12">
            <div className="flex flex-col items-center justify-center gap-4 text-center mt-3 animate-fade-in">
                <h1 className="text-4xl font-bold text-[#15364F]">اختر دورك في المنصة</h1>
                <p className="font-semibold max-w-lg pt-2 text-[#1E4C6F]">
                    سواء كنت مستثمراً تبحث عن فرص واعدة أو صاحب فكرة لديها حل لمشكلة حقيقية ستجد هنا المكان المناسب لك.
                </p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center my-8 px-4">

                {/* بطاقة: صاحب فكرة */}
                <div
                    onClick={() => setRole("idea_owner")}
                    className={`max-w-80 bg-white shadow-xl rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 ${role === "idea_owner"
                        ? "border-[#1E4C6F] ring-4 ring-[#1E4C6F]/10 scale-[1.02]"
                        : "border-transparent opacity-90 hover:opacity-100"
                        }`}
                >
                    <div className="relative">
                        <Image
                            src="/images/idea-owner.png"
                            alt="Role Selection"
                            width={500}
                            height={300}
                            className="object-cover rounded-t-xl select-none"
                        />
                        <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-[#E9EDF1] w-18 h-18 rounded-full flex items-center justify-center shadow-md">
                            <IdeaIcon className="w-11 h-11 text-[#9E7F4D]" />
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center mt-7">
                        <h2 className="text-2xl font-semibold mt-4 text-[#15364F]">صاحب فكرة</h2>
                        <p className="font-semibold pt-2 text-center text-[#1E4C6F] px-3.5">
                            قدم فكرتك واحصل على الدعم من مستثمرين يؤمنون برؤيتك
                        </p>
                    </div>

                    <div className="mx-3 mt-3">
                        <div className="flex justify-between items-center gap-4 py-2">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <ShieldCheckIcon className="w-7 h-7 text-[#9E7F4D]" />
                                <p className="text-[#57462A] text-xs font-semibold text-center">دعم وإرشاد في كل مرة</p>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <RocketIcon className="w-7 h-7 text-[#9E7F4D]" />
                                <p className="text-[#57462A] text-xs font-semibold text-center">حول فكرتك الى مشروع ناجح</p>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <UserGroupIcon className="w-7 h-7 text-[#9E7F4D]" />
                                <p className="text-[#57462A] text-xs font-semibold text-center">تواصل مع مستثمرين حقيقين</p>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            onClick={(e) => {
                                e.stopPropagation();
                                setRole("idea_owner");
                                handleSubmit("idea_owner");
                            }}
                            className="bg-[#1E4C6F] flex items-center justify-center gap-2 group my-4 w-full text-white text-lg h-11 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading && role === "idea_owner" ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <MoveRight className="group-hover:translate-x-1 transition-transform duration-300" />
                                    استمرار كصاحب فكرة
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* بطاقة: مستثمر */}
                <div
                    onClick={() => setRole("investor")}
                    className={`max-w-80 bg-white shadow-xl rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 ${role === "investor"
                        ? "border-[#1E4C6F] ring-4 ring-[#1E4C6F]/10 scale-[1.02]"
                        : "border-transparent opacity-90 hover:opacity-100"
                        }`}
                >
                    <div className="relative">
                        <Image
                            src="/images/investor.png"
                            alt="Role Selection"
                            width={500}
                            height={300}
                            className="object-cover rounded-t-xl select-none"
                        />
                        <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-[#E9EDF1] w-18 h-18 rounded-full flex items-center justify-center shadow-md">
                            <LeafIcon className="w-10.5 h-10.5 text-[#9E7F4D]" />
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center mt-7">
                        <h2 className="text-2xl font-semibold mt-4 text-[#15364F]">مستثمر</h2>
                        <p className="font-semibold pt-2 text-center text-[#1E4C6F] px-3.5">
                            اكتشف أفكارا مبتكرة واعدة, وتواصل مع أصحابها للاستثمار في مشاريع مستقبلية
                        </p>
                    </div>

                    <div className="mx-3 mt-3">
                        <div className="flex justify-between items-center gap-4 py-2">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <ShieldCheckIcon className="w-7 h-7 text-[#9E7F4D]" />
                                <p className="text-[#57462A] text-xs font-semibold text-center">دعم وإرشاد في كل مرة</p>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <BarChartIcon className="w-8 h-8 text-[#9E7F4D]" />
                                <p className="text-[#57462A] text-xs font-semibold text-center">حول فكرتك الى مشروع ناجح</p>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <DoveIcon className="w-9 h-9 text-[#9E7F4D]" />
                                <p className="text-[#57462A] text-xs font-semibold text-center">تواصل مع مستثمرين حقيقين</p>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            onClick={(e) => {
                                e.stopPropagation();
                                setRole("investor");
                                handleSubmit("investor");
                            }}
                            className="bg-[#1E4C6F] flex items-center justify-center gap-2 group mb-4 mt-3 w-full text-white text-lg h-11 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading && role === "investor" ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <MoveRight className="group-hover:translate-x-1 transition-transform duration-300" />
                                    استمرار كمستثمر
                                </>
                            )}
                        </button>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Page