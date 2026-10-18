import Link from "next/link";
import Image from "next/image";
import { Bookmark, ArrowLeft, ArrowUpRight } from "lucide-react";

export default function FeaturedProjectsSection() {
  const projects = [
    {
      id: "1",
      category: "تجارة إلكترونية",
      title: "منصة إدارة المتاجر الذكية",
      description: "نظام قائم على إدارة المخزون التجاري والصادر والوارد وتوقع الطلب باستخدام AI.",
      score: "85/100",
      progress: 85,
      supporters: "5 داعمين",
      target: "$4,500",
      image: "/images/landing/idea-cover.png",
    },
    {
      id: "2",
      category: "تقنية مالية",
      title: "محفظة الاستثمار التشاركي",
      description: "تطبيق للمدفوعات الصغيرة وحلول تمويلية مبسطة لدعم المشاريع الناشئة.",
      score: "92/100",
      progress: 92,
      supporters: "12 داعماً",
      target: "$12,000",
      image: "/images/landing/idea-cover.png",
    },
    {
      id: "3",
      category: "صحة ورعاية",
      title: "نظام الرعاية الطبية عن بعد",
      description: "ربط العيادات والمراكز الصحية بالمرضى مع تحليل بيانات الفحوصات بالأتمتة.",
      score: "78/100",
      progress: 78,
      supporters: "8 داعمين",
      target: "$8,000",
      image: "/images/landing/idea-cover.png",
    },
    {
      id: "4",
      category: "تعليم تقني",
      title: "أكاديمية المهارات المستقبلية",
      description: "منصة تدريب تفاعلية تعتمد التوجيه الذكي ومحاكاة بيئات العمل الحقيقية.",
      score: "88/100",
      progress: 88,
      supporters: "15 داعماً",
      target: "$6,200",
      image: "/images/landing/idea-cover.png",
    },
  ];

  return (
    <section id="projects" className="py-24 bg-[#E9EDF1]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-right">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block text-[#1E4C6F] font-bold text-lg">
              الأفكار المميزة
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-[#0D202F]">
              تصفح أحدث الفرص التي خضعت للتقييم{" "}
              <span className="text-[#9E7F4D]">بالذكاء الاصطناعي</span>
            </h2>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-base font-bold text-[#1E4C6F] hover:text-[#9E7F4D] transition-colors self-start md:self-end"
          >
            <span>عرض كل المشاريع المتاحة</span>
            <ArrowLeft className="size-5" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-[0_8px_25px_rgba(15,23,42,0.05)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Card Image & Badge */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0D202F]/80 backdrop-blur-md text-white text-xs font-bold">
                  {item.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 text-right space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0D202F] line-clamp-1 mb-2 group-hover:text-[#1E4C6F] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* AI Score */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#9E7F4D]">{item.score}</span>
                    <span className="text-slate-500 font-normal">تقييم الذكاء الاصطناعي</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#9E7F4D] rounded-full transition-all duration-1000"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                {/* Supporters & Target */}
                <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Bookmark className="size-4 text-slate-400" />
                    <span>{item.supporters}</span>
                  </div>
                  <span className="font-extrabold text-[#0D202F] font-sans">
                    {item.target}
                  </span>
                </div>

                {/* Details Button */}
                <Link
                  href="/explore"
                  className="w-full pt-3 flex items-center justify-center gap-2 text-sm font-bold text-[#1E4C6F] group-hover:text-[#9E7F4D] border-t border-slate-100 transition-colors"
                >
                  <span>عرض التفاصيل</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
