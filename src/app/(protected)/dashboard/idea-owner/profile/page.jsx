"use client"
import { projects } from "@/features/dashboards/owner/data/projects"
import SessionsCard from "@/features/dashboards/owner/project/Seestion"
import GithubIcon from "@/icons/GithubIcon"
import LinkedIcon from "@/icons/LinkedIcon"
import { Clock, Heart, MoreVertical } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const page = () => {
    const userName = "توفيق أبو حصيرة"
    const bio = "أُحول الأفكار التقنية إلى مشاريع قابلة للنمو, مبرمج وصاحب مشاريع أدرس السوق وأخرج بمشاريع حقيقية ونماذج أولية مشاريع تحل المشاكل"

    const skills = ["Next.js", "react", "Tailwend", "HTML", "Css", "Javascript", "node.js"]

    const getScoreColor = (ratingString) => {
        const score = parseInt(ratingString, 10) || 0;


        if (score >= 80) {
            return {
                barClass: 'bg-emerald-500',
                textClass: 'text-emerald-600'
            };
        }
        if (score >= 50) {
            return {
                barClass: 'bg-amber-500',
                textClass: 'text-amber-600'
            };
        }
        return {
            barClass: 'bg-rose-500',
            textClass: 'text-rose-600'
        };
    };

    const handleLogoutAll = () => {

    }

    const handleLogoutAllSessions = () => { }

    const handleLogoutOne = () => { }

    return (
        <main className="px-40 mt-5">
            <section className="grid grid-cols-2 ">
                <div className="flex gap-5">
                    <div className="relative rounded-full w-full max-w-35 h-35 overflow-hidden ring-2 ring-[#B19971] ring-offset-5">
                        <Image
                            alt="avatar"
                            src="/images/avatar.png"
                            fill
                            priority
                            unoptimized
                            className="absolute object-cover rounded-full"
                        />
                    </div>
                    <div>
                        <h1 className="text-[34px] font-bold">{userName}</h1>
                        <p className="text-xs text-gray-500 font-bold mt-2">{bio}</p>
                        <div className="flex items-center gap-1 mt-1">
                            <GithubIcon className="cursor-pointer w-5 h-5" />
                            <LinkedIcon className="text-[#0A66C2] w-5 h-5 cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-end">
                        <Link href="/dashboard/idea-owner/profile/edit"
                            className="bg-[#1E4C6F] border-[#1E4C6F] group flex items-center justify-center w-30 text-white text-lg h-11 rounded-xl cursor-pointer hover:-translate-y-0.5 hover:bg-[#163852] transition-all duration-300 disabled:opacity-50"
                        >
                            تعديل
                        </Link>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">المهارات والكفاءات</h2>
                        <div className="mt-2 flex flex-wrap items-center gap-1">
                            {skills.map((skill) => (
                                <div key={skill} className="bg-blue-100 w-fit rounded-md px-2 py-1">
                                    <span className="text-slate-700 font-semibold text-xs block">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <hr className="text-gray-200 block mt-6 mb-5" />
            <section className="mt-5">
                <h2 className="text-2xl font-bold pr-3 border-r-5 rounded-sm border-[#1E4C6F]">المشاريع</h2>
                <div className="mt-4 grid grid-cols-4 ">
                    {projects.slice(0, 4).map((i) => (

                        <div key={i.id} className="max-w-57 shadow-xl rounded-b-xl">
                            <div className="relative rounded-t-xl w-full max-w-57 h-35 overflow-hidden">
                                <Image
                                    alt="avatar"
                                    src="/images/Rectangle 16.png"
                                    fill
                                    priority
                                    unoptimized
                                    className="absolute object-cover"
                                />
                            </div>
                            <div className="px-3 pt-2 pb-3">

                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-sm text-gray-700">{i.title}</h3>
                                    <div className="w-fit p-1 hover:bg-gray-100 rounded-md cursor-pointer">
                                        <MoreVertical size={15} />
                                    </div>
                                </div>
                                <div className='relative rounded-full mt-8 h-1.75 w-full bg-[#D9D9D9] '>
                                    <div className='absolute -top-5 flex justify-between inset-x-0.5'>
                                        <span className='text-xs font-bold'>التقييم</span>
                                        <span className='text-xs font-bold'>{i.rating}</span>
                                    </div>
                                    <div className={`${getScoreColor(i.rating)?.barClass || 'bg-rose-500'} absolute h-1.75 rounded-full`} style={{ width: i.rating }} />
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex gap-1">
                                        <Clock size={14} />
                                        <span className="text-xs font-semibold">{i.updatedAt}</span>
                                    </div>
                                    <span className="h-4 w-0.5 bg-gray-300 block" />
                                    <div className="flex items-center gap-1">
                                        <Heart size={15} />
                                        <span className="text-xs font-semibold">{i.Leads} مهتم</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </section>
            <section className="mt-6">
                <h2 className="text-2xl font-bold pr-3 border-r-5 rounded-sm border-[#1E4C6F]">إدارة الجلسات</h2>
                <div className="mt-4">
                    <SessionsCard
                        onLogoutOne={(idx) => handleLogoutOne(idx)}
                        onLogoutAll={() => handleLogoutAll()}
                        onLogoutAllSessions={() => handleLogoutAllSessions()}
                    />
                </div>
            </section>
        </main>
    )
}

export default page