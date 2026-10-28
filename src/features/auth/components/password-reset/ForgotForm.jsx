"use client";

import { InboxIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { forgotPassword } from "@/features/auth/authApi";
import { toast } from "sonner";
import { notifyAuthConnectionError } from "@/features/auth/authNotifications";

const ForgotForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      toast.error("يرجى إدخال البريد الإلكتروني");
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPassword(cleanEmail);
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.message || "تعذر إرسال رابط الاستعادة، يرجى المحاولة لاحقاً");
        return;
      }

      setSent(true);
      toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
    } catch {
      notifyAuthConnectionError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={loading}>
      <div className="relative">
        <InboxIcon className="absolute w-5 h-5 top-1/2 -translate-y-1/2 right-3 text-slate-950 pointer-events-none" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading || sent}
          required
          autoComplete="email"
          className="bg-white font-semibold w-full outline-none rounded-xl h-11 shadow-[0_0_15px_rgba(0,0,0,0.2)] pr-10.5 pl-4 disabled:opacity-60"
          placeholder="البريد الالكتروني"
        />
      </div>

      <button
        type="submit"
        disabled={loading || sent}
        className="bg-[#1E4C6F] w-full mt-4 text-white text-lg py-2 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {loading ? (
          <span className="flex gap-2 items-center justify-center">
            <Loader2 className="animate-spin w-5 h-5" />
            جاري الإرسال...
          </span>
        ) : sent ? (
          "تم إرسال الرابط بنجاح"
        ) : (
          "إرسال رابط التحقق"
        )}
      </button>
    </form>
  );
};

export default ForgotForm;
