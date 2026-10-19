import { ChatIcon } from "@/icons/ChatIcon";
import BarChartIcon from "@/icons/BarChartIcon";
import ShieldCheckIcon from "@/icons/ShieldCheckIcon";

const defaultFeatures = [
    {
        title: "سهولة التواصل",
        description: "تواصل سهل بين المستثمر وصاحب الفكرة",
        icon: ChatIcon,
    },
    {
        title: "تقييم ذكي للفكرة",
        description: "احصل على تحليل دقيق لإمكانات فكرتك",
        icon: BarChartIcon,
    },
    {
        title: "بيئة آمنة وموثوقة",
        description: "بياناتك محمية بأعلى معايير الأمان",
        icon: ShieldCheckIcon,
    },
];

const featureClassNames = [
    "flex items-start gap-2 h-15 pt-3 pl-2 pr-4 xl:pl-3",
    "flex items-start gap-2 h-15 pt-3 border-r border-white/20 pr-5 xl:pr-6 xl:pl-3 pl-3",
    "flex items-start gap-2 h-15 pt-3 border-r border-white/20 pr-2 xl:pr-4",
];

export default function AuthVisual({ title, description, features = defaultFeatures }) {
    return (
        <div className="flex absolute max-[1163px]:hidden max-[1300px]:-left-17 -left-10 bottom-28 flex-col mt-auto">
            <div>
                <h2 className="text-center text-white font-bold text-3xl">{title}</h2>
                <p className="text-center text-white text-sm font-semibold pt-3">{description}</p>
            </div>
            <div className="grid grid-cols-3 mt-5">
                {features.map(({ title: featureTitle, description: featureDescription, icon: Icon }, index) => (
                    <div key={featureTitle} className={featureClassNames[index]}>
                        <div className="space-y-0.5">
                            <h3 className="text-xs min-[1270px]:text-sm font-semibold text-white">{featureTitle}</h3>
                            <p className={`text-[10px] min-[1270px]:text-xs text-gray-300 leading-snug${index < 2 ? " pt-0.5" : ""}`}>{featureDescription}</p>
                        </div>
                        <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md shrink-0 border border-white/10" aria-hidden="true">
                            <Icon className="w-5 h-5 text-white" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
