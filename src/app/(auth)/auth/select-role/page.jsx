import Image from "next/image"
import UserGroupIcon from "@/icons/UserGroupIcon";
import RocketIcon from "@/icons/RokectIcon";
import ShieldCheckIcon from "@/icons/ShieldCheckIcon";
import IdeaIcon from "@/icons/IdeaIcon";
import LeafIcon from "@/icons/LeafIcon";
import DoveIcon from "@/icons/DoveIcon";
import BarChartIcon from "@/icons/BarChartIcon";
import { MoveRight } from "lucide-react";

const page = () => {
    return (
        <main>
            <div className="flex flex-col items-center justify-center gap-4 text-center mt-3">
                <h1 className="text-4xl font-bold">اختر دورك في المنصة</h1>
                <p className="font-semibold max-w-lg pt-2">سواء كنت مسثمراً تبحث عن فرص واعدة أو صاحب فكرة لديها حل لمشكلة حقيقية ستجد هنا المكان المناسب لك.</p>
            </div>
            <div className="flex gap-6 justify-center my-7">

                <div className="max-w-80 bg-white shadow-xl select-none rounded-xl">
                    <div className="relative">
                        <Image
                            src="/images/idea-owner.png"
                            alt="Role Selection"
                            width={500}
                            height={300}
                            className="object-cover rounded-t-xl"
                        />
                        <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-[#E9EDF1] w-18 h-18 rounded-full flex items-center justify-center">
                            <IdeaIcon className="w-11 h-11 text-[#9E7F4D]" />
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center mt-7">
                        <h2 className="text-2xl font-semibold mt-4 text-[#15364F]">صاحب فكرة</h2>
                        <p className="font-semibold pt-2 text-center text-[#1E4C6F] px-3.5">قدم فكرتك واحصل على الدعم من مستثمرين يؤمنون برؤيتك</p>
                    </div>
                    <div className="mx-3 mt-3">

                        <div className="flex justify-between items-center gap-4">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <ShieldCheckIcon className="w-7 h-7 text-[#9E7F4D]" />
                                <p className="text-[#57462A] text-xs font-semibold text-center">دعم وإرشاد في كل مرة</p>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <RocketIcon className="w-7 h-7 text-[#9E7F4D]" />
                                <p className="text-[#57462A] text-xs font-semibold text-center">حول فكرتك الى مشروع ناجح</p>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <UserGroupIcon className="w-7 h-7 text-[#9E7F4D]" />
                                <p className="text-[#57462A] text-xs font-semibold text-center">تواصل مع مستثمرين حقيقين</p>
                            </div>
                        </div>

                        <button className="bg-[#1E4C6F] flex items-center justify-center gap-1 group my-4 w-full text-white text-lg h-11 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300">
                            <MoveRight className="group-hover:translate-x-1 transition-transform duration-300" />
                            استمرار كصاحب فكرة
                        </button>
                    </div>
                </div>

                <div className="max-w-80 bg-white shadow-xl select-none rounded-xl">
                    <div className="relative">
                        <Image
                            src="/images/investor.png"
                            alt="Role Selection"
                            width={500}
                            height={300}
                            className="object-cover rounded-t-xl"
                        />
                        <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-[#E9EDF1] w-18 h-18 rounded-full flex items-center justify-center">
                            <LeafIcon className="w-10.5 h-10.5 text-[#9E7F4D]" />
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center mt-7">
                        <h2 className="text-2xl font-semibold mt-4 text-[#15364F]">مستثمر</h2>
                        <p className="font-semibold pt-2 text-center text-[#1E4C6F] px-3.5">اكتشف أفكارا مبتكرة واعدة, وتواصل مع أصحابها للاستثمار في مشاريع مستقبلية</p>
                    </div>
                    <div className="mx-3 mt-3">

                        <div className="flex justify-between items-center gap-4">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <ShieldCheckIcon className="w-7 h-7 text-[#9E7F4D]" />
                                <p className="text-[#57462A] text-xs font-semibold text-center">دعم وإرشاد في كل مرة</p>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <BarChartIcon className="w-8 h-8 text-[#9E7F4D]" />
                                <p className="text-[#57462A] text-xs font-semibold text-center">حول فكرتك الى مشروع ناجح</p>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <DoveIcon className="w-9 h-9 text-[#9E7F4D]" />
                                <p className="text-[#57462A] text-xs font-semibold text-center">تواصل مع مستثمرين حقيقين</p>
                            </div>
                        </div>

                        <button className="bg-[#1E4C6F] flex items-center gap-1 justify-center group mb-4 mt-3 w-full text-white text-lg h-11 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300">
                            <MoveRight className="group-hover:translate-x-1 transition-transform duration-300" />
                            استمرار كمستثمر
                        </button>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default page