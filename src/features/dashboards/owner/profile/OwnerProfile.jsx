"use client"
import EmptyState from "@/features/dashboards/shared/EmptyState"
import ProjectsEmptyState from "@/features/dashboards/owner/home/components/ProjectsEmptyState"
import SessionsCard from "@/features/dashboards/owner/project/Seestion"
import { Award, Clock, Heart, MoreVertical } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const OwnerProfile = ({ profile, projects = [] }) => {
    const { name: userName, bio, skills = [], links = [], sessions = [] } = profile

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
        <main className="mx-auto mt-5 max-w-7xl px-0 sm:px-5 lg:px-12" dir="rtl">
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="flex min-w-0 gap-4">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-full ring-2 ring-[#B19971] ring-offset-5 sm:size-35">
                        <Image
                            alt="avatar"
                            src={profile.avatar}
                            fill
                            priority
                            unoptimized
                            className="absolute object-cover rounded-full"
                        />
                    </div>
                    <div className="min-w-0">
                        <h1 className="break-words text-2xl font-bold sm:text-[34px]">{userName}</h1>
                        <p className="text-xs leading-6 text-gray-500 font-bold mt-2">{bio || "لم تُضف نبذة عنك بعد. عرّف المستثمرين بخبراتك من خلال تعديل ملفك."}</p>
                        {links.length === 0 ? <p className="mt-2 text-xs text-[#68879F]">لا توجد روابط تواصل مضافة بعد.</p> : <div className="flex flex-wrap items-center gap-2 mt-1">
                            {links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#1E4C6F] hover:underline">{link.label || link.url}</a>)}
                        </div>}
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
                        {skills.length === 0 ? <EmptyState compact icon={Award} title="لم تُضف مهاراتك بعد" description="أضف مهاراتك وخبراتك ليسهل التعرف على إمكاناتك." actionLabel="إضافة مهارات" actionHref="/dashboard/idea-owner/profile/edit" /> : <div className="mt-2 flex flex-wrap items-center gap-1">
                            {skills.map((skill) => (
                                <div key={skill} className="bg-blue-100 w-fit rounded-md px-2 py-1">
                                    <span className="text-slate-700 font-semibold text-xs block">{skill}</span>
                                </div>
                            ))}
                        </div>}
                    </div>
                </div>
            </section>
            <hr className="text-gray-200 block mt-6 mb-5" />
            <section className="mt-5">
                <h2 className="text-2xl font-bold pr-3 border-r-5 rounded-sm border-[#1E4C6F]">المشاريع</h2>
                {projects.length === 0 ? <div className="mt-4 rounded-2xl border border-[#E5EDF3] bg-white"><ProjectsEmptyState /></div> : <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

                </div>}
            </section>
            <section className="mt-6">
                <h2 className="text-2xl font-bold pr-3 border-r-5 rounded-sm border-[#1E4C6F]">إدارة الجلسات</h2>
                <div className="mt-4">
                    <SessionsCard
                        sessions={sessions}
                        onLogoutOne={(idx) => handleLogoutOne(idx)}
                        onLogoutAll={() => handleLogoutAll()}
                        onLogoutAllSessions={() => handleLogoutAllSessions()}
                    />
                </div>
            </section>
        </main>
    )
}

export default OwnerProfile
