import Link from "next/link";
import { ArrowLeft, UploadCloud, BrainCircuit, Handshake } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "ارفع فكرتك",
      description: "أدخل تفاصيل مشروعك وخلفيتك الاستثمارية في دقائق معدودة وبواجهة سهلة.",
      icon: UploadCloud,
      action: { label: "ابدأ الرفع", href: "/dashboard/idea-owner/create-project" },
    },
    {
      step: "02",
      title: "تقييم ذكي",
      description: "يقوم محرك الذكاء الاصطناعي بتحليل الأبعاد التقنية والمالية ودراسة الجدوى بدقة.",
      icon: BrainCircuit,
      action: { label: "تعرف على التقييم", href: "#features" },
    },
    {
      step: "03",
      title: "تواصل واستثمر",
      description: "احصل على تمويل مباشر وتواصل شفاف مع شبكة مستثمرين معتمدين ومهتمين بمجالك.",
      icon: Handshake,
      action: { label: "استكشف الفرص", href: "/dashboard/idea-owner/projects" },
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#E9EDF1]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block text-[#1E4C6F] font-bold text-lg tracking-wide">
            خطوات بسيطة
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-[#0D202F]">
            كيف تبدأ رحلتك الاستثمارية معنا؟
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
            لقد لخصنا عملية التمويل والتأسيس الطويلة في 3 خطوات رقمية آمنة وذكية تماماً
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(30,76,111,0.06)] border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
              >
                {/* Top Row: Number & Icon */}
                <div className="flex items-center justify-between mb-8">
                  <div className="size-16 rounded-2xl bg-[#E9EDF1] text-[#1E4C6F] flex items-center justify-center group-hover:bg-[#1E4C6F] group-hover:text-white transition-colors duration-300">
                    <Icon className="size-8" />
                  </div>
                  <span className="text-4xl font-black font-sans text-[#9E7F4D]">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3 mb-8 text-right">
                  <h3 className="text-2xl font-bold text-[#0D202F] group-hover:text-[#1E4C6F] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {item.description}
                  </p>
                </div>

                {/* Card Action Link */}
                <Link
                  href={item.action.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1E4C6F] hover:text-[#9E7F4D] transition-colors self-start"
                >
                  <span>{item.action.label}</span>
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
