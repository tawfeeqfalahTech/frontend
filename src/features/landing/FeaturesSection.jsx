import Link from "next/link";
import { 
  BarChart3, 
  FileText, 
  ShieldCheck, 
  MessageCircle, 
  LayoutDashboard,
  ArrowLeft
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "تقييم ذكي بخمس أبعاد",
      desc: "تقييم تحليلي يعتمد على مقاييس السوق، نموذج العمل، الجدوى المالية، والكفاءة التقنية.",
      icon: BarChart3,
    },
    {
      title: "تقارير شفافة قابلة للتصدير",
      desc: "ملفات وتفاصيل شاملة يمكن تنزيلها ومشاركتها مع الشركاء والمستثمرين بكل يسر.",
      icon: FileText,
    },
    {
      title: "إفصاح متدرج يحمي الخصوصية",
      desc: "حماية تامة لأسرار المشروع، بحيث لا يتم كشف البيانات الحساسة إلا بعد الموافقة المتبادلة.",
      icon: ShieldCheck,
    },
    {
      title: "تواصل مباشر بعد الاتفاق",
      desc: "قنوات تواصل آمنة ومباشرة بين صاحب الفكرة والمستثمر فور التوصل للتفاهم الأولي.",
      icon: MessageCircle,
    },
    {
      title: "لوحة تحكم مخصصة لكل دور",
      desc: "واجهة إدارة مخصصة ومصممة بعناية لاحتياجات رائد الأعمال ومتابعة العروض الاستثمارية.",
      icon: LayoutDashboard,
      link: { label: "استعرض لوحة التحكم", href: "/dashboard/idea-owner" },
    },
  ];

  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-right">
          <div className="space-y-4 max-w-xl">
            <span className="inline-block text-[#1E4C6F] font-bold text-lg">
              لماذا إحياء
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-[#0D202F] leading-tight">
              تقييم مبني على بيانات{" "}
              <span className="text-[#9E7F4D]">حقيقية</span>
            </h2>
          </div>
          <p className="text-lg text-slate-600 max-w-md leading-relaxed">
            من التقييم الموضوعي إلى التواصل المباشر، نقدم بيئة عمل رقمية تضمن الشفافية والجدوى دون وسطاء.
          </p>
        </div>

        {/* 5 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 hover:bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-[#1E4C6F]/30 hover:shadow-xl transition-all duration-300 text-right flex flex-col justify-between group"
              >
                <div>
                  <div className="size-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#1E4C6F] group-hover:scale-110 group-hover:bg-[#1E4C6F] group-hover:text-white transition-all duration-300 mb-6">
                    <Icon className="size-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0D202F] mb-3 group-hover:text-[#1E4C6F] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                {feat.link && (
                  <div className="pt-6 mt-6 border-t border-slate-200/60">
                    <Link
                      href={feat.link.href}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#1E4C6F] hover:text-[#9E7F4D] transition-colors"
                    >
                      <span>{feat.link.label}</span>
                      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
