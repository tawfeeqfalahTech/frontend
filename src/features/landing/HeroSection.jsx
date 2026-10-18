import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowLeft, Rocket } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[640px] lg:min-h-[760px] flex items-center bg-[#0D202F] overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/landing/hero-bg.png"
          alt="رواد أعمال ومستثمرون في منصة إحياء"
          fill
          priority
          className="object-cover object-left md:object-center opacity-70 lg:opacity-85 mix-blend-luminosity"
        />
        {/* Gradients overlay for contrast and luxury aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0D202F] via-[#0D202F]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D202F] via-transparent to-[#0D202F]/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl mr-auto lg:mr-0 text-right space-y-7">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#183562]/80 backdrop-blur-md border border-white/15 text-[#E9EDF1] shadow-lg">
            <Sparkles className="size-4 text-[#9E7F4D]" />
            <span className="text-sm md:text-base font-semibold">
              نُطلق الأفكار، ونُرسّخ الاستثمار
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans text-[#E9EDF1] leading-[1.25] tracking-tight">
            منصتك لإحياء الأفكار وتنمية{" "}
            <span className="text-[#9E7F4D] relative inline-block">
              الاستثمار
              <span className="absolute bottom-1 left-0 w-full h-1 bg-[#9E7F4D]/40 rounded-full" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#B9C8D2] font-normal leading-relaxed max-w-xl">
            نساعد أصحاب المشاريع في الحصول على تقييم مهني مدعوم بالذكاء الاصطناعي وبناء جسور شراكة حقيقية مع مستثمرين محليين وعالميين.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/dashboard/idea-owner/create-project"
              className="px-8 py-4 rounded-2xl bg-[#9E7F4D] text-[#0D202F] font-bold text-lg shadow-xl shadow-[#9E7F4D]/20 hover:bg-[#B3935E] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
              <Rocket className="size-5 transition-transform group-hover:-translate-y-0.5" />
              <span>ارفع مشروعك</span>
            </Link>

            <Link
              href="/explore"
              className="px-8 py-4 rounded-2xl border-2 border-[#E9EDF1]/60 text-[#E9EDF1] font-bold text-lg hover:bg-white/10 hover:border-[#E9EDF1] transition-all flex items-center justify-center gap-2 group"
            >
              <span>استكشف المشاريع</span>
              <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>

          {/* Micro trust indicators */}
          <div className="pt-4 flex items-center gap-6 text-sm text-[#B9C8D2]">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              تقييم فوري بالذكاء الاصطناعي
            </span>
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#9E7F4D]" />
              حماية تامة للملكية الفكرية
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
