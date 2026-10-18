import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function CtaBannerSection() {
  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#112A3D] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Right/Text side (RTL) */}
          <div className="max-w-xl text-right space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#9E7F4D] text-sm font-semibold">
              <Sparkles className="size-4" />
              <span>فرصتك الذهبية تبدأ اليوم</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-[#E9EDF1] leading-tight">
              هل أنت مستعد لتحويل فكرتك{" "}
              <span className="text-[#9E7F4D]">لمشروع حقيقي</span> أو الاستثمار بأحد المشاريع؟
            </h2>

            <p className="text-base sm:text-lg text-[#B9C8D2] leading-relaxed">
              انضم لأكثر من 200 رائد أعمال نجحوا في الحصول على تقييم احترافي لخططهم وتواصلوا مع مستثمرين حقيقيين اليوم.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/dashboard/idea-owner/create-project"
                className="px-7 py-3.5 rounded-xl bg-[#9E7F4D] text-[#0D202F] font-bold text-base hover:bg-[#B3935E] hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
              >
                انضم كصاحب فكرة
              </Link>
              <Link
                href="/login"
                className="px-7 py-3.5 rounded-xl border border-[#E9EDF1]/60 text-[#E9EDF1] font-bold text-base hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2 group"
              >
                <span>انضم كمستثمر</span>
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Left/Graphic side */}
          <div className="relative w-full max-w-sm lg:max-w-md h-64 sm:h-80 z-10">
            <Image
              src="/images/landing/cta-illustration.png"
              alt="رسم توضيحي للنمو والاستثمار"
              fill
              className="object-contain"
            />
          </div>

          {/* Background decorative glow */}
          <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-[#1E4C6F]/30 blur-3xl pointer-events-none" />
          <div className="absolute -right-20 -top-20 size-80 rounded-full bg-[#9E7F4D]/20 blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
