import Image from "next/image";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "خالد اليعقوبي",
      role: "مستثمر معتمد",
      avatar: "/images/landing/avatar-3.png",
      content:
        "أحببت سهولة التواصل مع أصحاب المشاريع وجودة الفرص المتاحة على المنصة ودقة التقييم المدعوم بالذكاء الاصطناعي.",
    },
    {
      name: "منار السالمي",
      role: "صاحبة مشاريع وريادية أعمال",
      avatar: "/images/landing/avatar-2.png",
      content:
        "كانت تجربة رفع المشاريع سلسة جداً، والتقييم الذي حصلت عليه ساعدني في تطوير خطتي الاستثمارية وجذب المستثمر المناسب بثقة أكبر.",
    },
    {
      name: "سالم السعودي",
      role: "مستثمر أعمال ملائكي",
      avatar: "/images/landing/avatar-1.png",
      content:
        "إحياء منصة موثوقة وشفافة، وفّرت عليّ شهوراً من التدقيق والتحليل، وساعدتني في الوصول لمشاريع واعدة ببيانات حقيقية.",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="inline-block text-[#1E4C6F] font-bold text-lg">
            التقييمات
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-[#0D202F]">
            ماذا يقول شركاؤنا عنا؟
          </h2>
          <p className="text-lg text-slate-600">
            تجارب حقيقية لرواد أعمال ومستثمرين حققوا شراكات ناجحة عبر المنصة.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 rounded-3xl p-8 border border-slate-200/80 flex flex-col justify-between hover:shadow-xl hover:bg-white hover:border-[#1E4C6F]/30 transition-all duration-300 text-right group"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 justify-end text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Content */}
                <p className="text-slate-700 leading-relaxed text-base italic">
                  "{item.content}"
                </p>
              </div>

              {/* Author info */}
              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-end gap-4">
                <div className="text-right">
                  <h3 className="font-bold text-lg text-[#0D202F]">
                    {item.name}
                  </h3>
                  <span className="text-sm text-slate-500 font-medium">
                    {item.role}
                  </span>
                </div>
                <div className="relative size-14 rounded-full overflow-hidden border-2 border-[#1E4C6F]/20 shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
