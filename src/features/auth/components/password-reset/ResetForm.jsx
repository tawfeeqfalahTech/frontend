"use client";

import EyeSlashIcon from "@/icons/EyeSlashIcon";
import { EyeIcon, Loader2, LockIcon } from "lucide-react";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "@/features/auth/authApi";
import { toast } from "sonner";
import { notifyAuthConnectionError } from "@/features/auth/authNotifications";

const ResetForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || "";
  const emailParam = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("يرجى إدخال البريد الإلكتروني");
      return;
    }
    if (password.length < 8) {
      toast.error("يجب أن تكون كلمة المرور 8 خانات على الأقل");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("كلمتا المرور غير متطابقتين");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword({
        token,
        email: email.trim(),
        password,
        password_confirmation: confirmPassword,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.message || "فشلت إعادة تعيين كلمة المرور، قد يكون الرابط منتهياً");
        return;
      }

      toast.success("تمت إعادة تعيين كلمة المرور بنجاح. يمكنك تسجيل الدخول الآن.");
      router.replace("/login");
    } catch {
      notifyAuthConnectionError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col space-y-4 pb-1" aria-busy={loading}>
      {!emailParam && (
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
          placeholder="البريد الإلكتروني"
          className="bg-white font-semibold outline-none w-full rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] px-4"
        />
      )}

      <div className="relative">
        <LockIcon className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
          className="bg-white font-semibold outline-none w-full rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] pr-10.5 pl-10"
          placeholder="كلمة المرور الجديدة"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
        </button>
      </div>

      <div className="relative">
        <LockIcon className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          required
          className="bg-white font-semibold outline-none w-full rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] pr-10.5 pl-10"
          placeholder="تأكيد كلمة المرور"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showConfirmPassword ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#1E4C6F] w-full text-white text-lg py-2 my-1 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex gap-2 items-center justify-center">
            <Loader2 className="animate-spin w-5 h-5" />
            جاري إعادة التعيين...
          </span>
        ) : (
          "إعادة التعيين"
        )}
      </button>
    </form>
  );
};

export default ResetForm;
