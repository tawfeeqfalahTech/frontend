"use client";
import AuthVisual from "@/features/auth/components/shared/AuthVisual";
import AuthHero from "@/features/auth/components/shared/AuthHero";
import AuthHeader from "@/features/auth/components/shared/AuthHeader";
import OtpInput from "@/features/auth/components/OtpForm";
import { resendOtp, verifyOtp } from "@/features/auth/authApi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie, setCookie, getCookie } from "@/lib/action";
import { toast } from "sonner";
import { getAuthErrors } from "@/features/auth/formErrors";
import { notifyAuthConnectionError, notifyAuthErrors } from "@/features/auth/authNotifications";

const Page = () => {
    const [email, setEmail] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    const [codeError, setCodeError] = useState(false);

    const COOLDOWN = 90
    const [cooldown, setCooldown] = useState(0)
    const [isResending, setIsResending] = useState(false)
    const [isChecking, setIsChecking] = useState(false)

    const router = useRouter();

    useEffect(() => {

        let isSubscribed = true;

        async function initPage() {
            const pendingEmail = await getCookie("pending_verify_email");
            if (isSubscribed) {
                const firstSent = Number(localStorage.getItem("firstVerificationSent"));
                if (firstSent) {
                    const elapsed = Math.floor((Date.now() - firstSent) / 1000);
                    setCooldown(Math.max(0, COOLDOWN - elapsed));
                }
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

    useEffect(() => {
        if (cooldown <= 0) return
        const interval = setTimeout(() => setCooldown((c) => c - 1), 1000)
        return () => clearTimeout(interval)
    }, [cooldown])

    const handleResend = async () => {
        if (cooldown > 0 || isResending || isChecking) return;
        if (!email) {
            notifyAuthErrors({}, "لم يتم العثور على البريد الإلكتروني. يرجى محاولة التسجيل مجدداً.");
            return;
        }

        const lastSent = Number(localStorage.getItem("firstVerificationSent"));
        if (lastSent && Date.now() - lastSent < COOLDOWN * 1000) {
            notifyAuthErrors({}, "يرجى الانتظار قبل طلب رمز تحقق جديد.");
            return;
        }

        setIsResending(true);

        try {
            const res = await resendOtp(email)
            const data = await res.json().catch(() => ({}))

            if (!res.ok) {
                const result = getAuthErrors(data, res.status, []);
                notifyAuthErrors(result.fieldErrors, result.formError);
                return;
            }

            localStorage.setItem("firstVerificationSent", Date.now());
            setCooldown(COOLDOWN);
            setCodeError(false);
            toast.success("تم إرسال رمز تحقق جديد إلى بريدك الإلكتروني.");

        } catch {
            notifyAuthConnectionError();
        } finally {
            setIsResending(false);
        }
    };

    const verifyEmail = async (otpCode) => {

        if (isChecking || isResending) return;

        if (!email) {
            notifyAuthErrors({}, "لم يتم العثور على البريد الإلكتروني. يرجى محاولة التسجيل مجدداً.");
            return;
        }

        setIsChecking(true);
        setCodeError(false);

        try {
            const res = await verifyOtp({
                email,
                code: otpCode,
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                const result = getAuthErrors(data, res.status, ["code"]);
                setCodeError(Boolean(result.fieldErrors.code) || [400, 401, 422].includes(res.status));
                notifyAuthErrors(result.fieldErrors, result.formError);
                return;
            }

            await setCookie("pending_selection_role", email, 60 * 7)
            await deleteCookie("pending_verify_email");

            localStorage.removeItem("firstVerificationSent")

            router.push("/auth/select-role");

        } catch {
            notifyAuthConnectionError();
        } finally {
            setIsChecking(false);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <AuthHero />
            <div className="relative z-10 grid grid-cols-2 max-[1163px]:grid-cols-1 min-h-screen mx-15 max-[520px]:mx-5">
                <div className="flex items-center max-[1163px]:justify-center h-screen max-[520px]:my-10">
                    <div className="bg-white rounded-2xl w-full max-w-100 px-6 pb-5.5 pt-9.5">
                        <AuthHeader
                            head="تحقق من بريدك الإلكتروني"
                            paragraph={`لقد أرسلنا رمز التحقق مكون من 6 أرقام إلى البريد ${email}`}
                        />
                        <div className="mt-4">
                            <OtpInput
                                onSubmit={handleResend}
                                onComplete={verifyEmail}
                                cooldown={cooldown}
                                isChecking={isChecking}
                                isResending={isResending}
                                loading={isChecking || isResending}
                                error={codeError}
                                onChange={() => setCodeError(false)}
                            />
                        </div>

                        {cooldown > 0 && (
                            <p className="text-xs text-center font-semibold mt-4 flex justify-center">
                                إعادة إرسال الرمز خلال{" "}
                                <span className="text-[#5FABF8] underline pr-1">{cooldown}s</span>
                            </p>
                        )}
                    </div>
                </div>

                <AuthVisual
                    title="خطوة واحدة تفصلك عن الإنطلاق"
                    description={
                        <>
                            تحقق من حسابك لتكمل رحلتك على إحياء, حيث تلتقي الأفكار الواعدة
                            <br /> بالمستثمرين المناسبين.
                        </>
                    }
                />
            </div>
        </div>
    );
};

export default Page;
