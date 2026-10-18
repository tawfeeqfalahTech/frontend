import { Lightbulb, Users, TrendingUp, ShieldCheck } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      value: "+2500",
      label: "فكرة مسجلة بالمنصة",
      icon: Lightbulb,
    },
    {
      value: "+120",
      label: "مستثمر معتمد نشط",
      icon: Users,
    },
    {
      value: "+94%",
      label: "دقة التقييم التقني",
      icon: TrendingUp,
    },
    {
      value: "+50",
      label: "صفقة استثمارية مكتملة",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative -mt-10 lg:-mt-14 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_15px_40px_rgba(30,76,111,0.12)] border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-slate-100">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-center justify-between sm:justify-center gap-5 px-4 ${
                idx > 0 ? "pt-4 sm:pt-0" : ""
              }`}
            >
              <div className="text-right">
                <span className="block text-3xl lg:text-4xl font-extrabold text-[#1E4C6F] font-sans">
                  {item.value}
                </span>
                <span className="text-sm lg:text-base text-slate-600 font-medium">
                  {item.label}
                </span>
              </div>
              <div className="size-16 rounded-2xl bg-[#E9EDF1] flex items-center justify-center text-[#1E4C6F] shrink-0 shadow-inner">
                <Icon className="size-8" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
