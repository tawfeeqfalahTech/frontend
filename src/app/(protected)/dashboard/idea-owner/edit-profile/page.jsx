"use client"
import LinkedIcon from '@/icons/LinkedIcon'
import { BadgeCheck, Search, User2, LucideBookUser, Link2, Globe, CircleX, Plus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const Page = () => {
    const [userName, setUserName] = useState("")
    const [skill, setSkill] = useState("")
    const [skills, setSkills] = useState([])

    const addSkill = (e) => {
        if (e.key !== 'Enter') return
        e.preventDefault()
        const value = skill.trim()
        if (value && !skills.includes(value)) setSkills((prev) => [...prev, value])
        setSkill("")
    }

    const [links, setLinks] = useState([])
    const [link, setLink] = useState("")
    const [showLinkForm, setShowLinkForm] = useState(false)

    const getLinkIcon = (url) =>
        url.includes("linkedin") ? LinkedIcon : url.includes("github") ? GithubIcon : Globe

    const formatLink = (url) =>
        url.replace(/^https?:\/\/(www\.)?/, "").replace(/\.(com|net|org|io)\//, "/")

    const addLink = (e) => {
        if (e.key !== 'Enter') return
        e.preventDefault()
        const value = link.trim()
        if (value && !links.includes(value)) setLinks((prev) => [...prev, value])
        setLink("")
        setShowLinkForm(false)
    }

    const removeLink = (url) =>
        setLinks((prev) => prev.filter((l) => l !== url))

    const removeSkill = (name) =>
        setSkills((prev) => prev.filter((s) => s !== name))

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="relative size-35 rounded-full overflow-hidden ring-2 ring-[#B19971] ring-offset-4 ring-offset-white">
                <Image
                    alt="avatar"
                    src="/images/avatar.png"
                    fill
                    priority
                    unoptimized
                    className="object-cover"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full mt-6">
                <section className="space-y-5">
                    <h2 className="text-2xl font-bold ps-3 border-s-4 border-[#1E4C6F] rounded-sm">
                        المعلومات الأساسية
                    </h2>

                    <div className="space-y-2">
                        <label htmlFor="name" className="flex items-center gap-1.5 font-semibold">
                            <User2 size={20} />
                            الاسم الكامل
                        </label>
                        <div className="relative">
                            <User2 className="absolute top-1/2 -translate-y-1/2 start-3 size-5 text-slate-950 pointer-events-none" />
                            <input
                                type="text"
                                id="name"
                                className="w-full bg-white font-semibold outline-none rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] focus-visible:ring-2 focus-visible:ring-[#1E4C6F]/40 h-11 ps-10.5 pe-3"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="الاسم الكامل"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="bio" className="flex items-center gap-1.5 font-semibold">
                            <LucideBookUser size={20} />
                            النبذة
                        </label>
                        <textarea
                            id="bio"
                            rows={4}
                            className="w-full bg-white font-semibold outline-none rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] focus-visible:ring-2 focus-visible:ring-[#1E4C6F]/40 resize-none p-3"
                            placeholder="اكتب نبذة تعبر عنك"
                        />
                    </div>
                </section>

                <section className="space-y-5">
                    <h2 className="text-2xl font-bold ps-3 border-s-4 border-[#1E4C6F] rounded-sm">
                        المهارات
                    </h2>

                    <div className="space-y-2">
                        <label htmlFor="skills" className="flex items-center gap-1.5 font-semibold">
                            <BadgeCheck size={20} />
                            المهارات والكفاءات
                        </label>
                        <div className="relative">
                            <Search className="absolute top-1/2 -translate-y-1/2 start-3 size-5 text-slate-950 pointer-events-none" />
                            <input
                                type="text"
                                id="skills"
                                className="w-full bg-white font-semibold outline-none rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] focus-visible:ring-2 focus-visible:ring-[#1E4C6F]/40 h-11 ps-10.5 pe-3"
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                                onKeyDown={addSkill}
                                placeholder="اكتب المهارة واضغط Enter للحفظ"
                            />
                        </div>
                        {skills.length > 0 && (
                            <ul className="flex flex-wrap gap-2 pt-2">
                                {skills.map((s) => (
                                    <li
                                        key={s}
                                        className="flex items-center gap-2 rounded-lg bg-slate-200/60 px-3 py-2 text-sm font-medium text-slate-700"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(s)}
                                            aria-label={`حذف ${s}`}
                                            className="text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4C6F]/40 rounded-full"
                                        >
                                            <CircleX className="size-4.5" strokeWidth={1.5} />
                                        </button>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>

                <section className="space-y-5 md:col-span-2">
                    <div className="flex items-start justify-between gap-3">
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold ps-3 border-s-4 border-[#1E4C6F] rounded-sm">
                                مواقع التواصل الاجتماعي
                            </h2>
                            <p className="text-sm text-slate-600">أضف أو عدل روابط حساباتك</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowLinkForm((prev) => !prev)}
                            className="flex items-center gap-1.5 h-10 px-4 rounded-xl border border-[#1E4C6F] text-[#1E4C6F] text-sm font-semibold transition-colors hover:bg-[#1E4C6F]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4C6F]/40"
                        >
                            <Plus size={16} />
                            إضافة رابط
                        </button>
                    </div>

                    {showLinkForm && (
                        <div className="relative">
                            <Link2 className="absolute top-1/2 -translate-y-1/2 start-3 size-5 text-slate-950 pointer-events-none" />
                            <input
                                type="url"
                                dir="ltr"
                                autoFocus
                                className="w-full bg-white font-semibold outline-none rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] focus-visible:ring-2 focus-visible:ring-[#1E4C6F]/40 h-11 ps-10.5 pe-3"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                onKeyDown={addLink}
                                placeholder="https://linkedin.com/in/username ثم Enter"
                            />
                        </div>
                    )}

                    {links.length > 0 && (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                            {links.map((l) => {
                                const Icon = getLinkIcon(l)
                                return (
                                    <li
                                        key={l}
                                        className="flex items-center gap-3 h-11 px-3 bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                                    >
                                        <Icon size={20} />
                                        <span dir="ltr" className="flex-1 truncate text-center text-sm font-medium text-slate-800">
                                            {formatLink(l)}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeLink(l)}
                                            aria-label={`حذف ${l}`}
                                            className="text-slate-400 transition-colors hover:text-slate-600 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4C6F]/40"
                                        >
                                            <CircleX className="size-4.5" strokeWidth={1.5} />
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    )
}

export default Page