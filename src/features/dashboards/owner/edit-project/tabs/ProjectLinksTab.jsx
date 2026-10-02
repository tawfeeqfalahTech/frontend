"use client"
import { useState } from "react"
import { Globe } from "lucide-react"
import GithubIcon from "@/icons/GithubIcon"
import LinkedIcon from "@/icons/LinkedIcon"
import SaveChangesButton from "../components/SaveChangesButton"

const TwitterXIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

const FigmaIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
        <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
        <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
        <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
)

const ProjectLinksTab = () => {
    const [links, setLinks] = useState({
        website: "https://smartstore-demo.com",
        prototype: "https://www.figma.com/proto/smartstore-prototype",
        linkedin: "https://linkedin.com/company/smartstore-app",
        twitter: "https://x.com/smartstore_app",
        github: "https://github.com/tawfeeq/smartstore-core"
    })

    const [isSaving, setIsSaving] = useState(false)

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
        }, 600)
    }

    return (
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0px_4px_32px_0px_rgba(30,76,111,0.06)] border border-gray-100 flex flex-col gap-6">
            {/* Header */}
            <div className="border-b border-gray-100 pb-4">
                <h2 className="text-xl sm:text-[22px] font-bold text-[#0D202F]">
                    روابط المشروع والمنصات
                </h2>
                <p className="text-[#4B708C] text-sm mt-1.5">
                    أضف الروابط الرسمية لمشروعك، مثل الموقع الإلكتروني والنموذج الأولي وحسابات التواصل لمساعدة المستثمرين في التعرف عليك.
                </p>
            </div>

            {/* Links List */}
            <div className="flex flex-col gap-5">
                {/* الموقع الإلكتروني */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm sm:text-base font-semibold text-[#0D202F] flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#1E4C6F]" />
                        <span>رابط الموقع الإلكتروني الرسمي</span>
                    </label>
                    <input
                        type="url"
                        value={links.website}
                        onChange={(e) => setLinks({ ...links, website: e.target.value })}
                        placeholder="https://yourproject.com"
                        className="w-full bg-[#FFFFFF] border border-[#E2E8F0] focus:border-[#1E4C6F] focus:ring-1 focus:ring-[#1E4C6F] outline-none px-3.5 py-3 rounded-xl text-sm text-[#0D202F] shadow-[0px_4px_20px_0px_rgba(104,135,159,0.06)] dir-ltr text-left"
                    />
                </div>

                {/* النموذج الأولي / Figma */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm sm:text-base font-semibold text-[#0D202F] flex items-center gap-2">
                        <FigmaIcon className="w-4 h-4 text-[#1E4C6F]" />
                        <span>رابط النموذج الأولي أو التجريبي (Prototype / Demo)</span>
                    </label>
                    <input
                        type="url"
                        value={links.prototype}
                        onChange={(e) => setLinks({ ...links, prototype: e.target.value })}
                        placeholder="https://figma.com/proto/... أو رابط تجريبي"
                        className="w-full bg-[#FFFFFF] border border-[#E2E8F0] focus:border-[#1E4C6F] focus:ring-1 focus:ring-[#1E4C6F] outline-none px-3.5 py-3 rounded-xl text-sm text-[#0D202F] shadow-[0px_4px_20px_0px_rgba(104,135,159,0.06)] dir-ltr text-left"
                    />
                </div>

                {/* LinkedIn */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm sm:text-base font-semibold text-[#0D202F] flex items-center gap-2">
                        <LinkedIcon className="w-4 h-4 text-[#0A66C2]" />
                        <span>صفحة LinkedIn الخاصة بالمشروع</span>
                    </label>
                    <input
                        type="url"
                        value={links.linkedin}
                        onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/company/..."
                        className="w-full bg-[#FFFFFF] border border-[#E2E8F0] focus:border-[#1E4C6F] focus:ring-1 focus:ring-[#1E4C6F] outline-none px-3.5 py-3 rounded-xl text-sm text-[#0D202F] shadow-[0px_4px_20px_0px_rgba(104,135,159,0.06)] dir-ltr text-left"
                    />
                </div>

                {/* X / Twitter */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm sm:text-base font-semibold text-[#0D202F] flex items-center gap-2">
                        <TwitterXIcon className="w-4 h-4 text-gray-800" />
                        <span>حساب منصة X (تويتر سابقاً)</span>
                    </label>
                    <input
                        type="url"
                        value={links.twitter}
                        onChange={(e) => setLinks({ ...links, twitter: e.target.value })}
                        placeholder="https://x.com/yourproject"
                        className="w-full bg-[#FFFFFF] border border-[#E2E8F0] focus:border-[#1E4C6F] focus:ring-1 focus:ring-[#1E4C6F] outline-none px-3.5 py-3 rounded-xl text-sm text-[#0D202F] shadow-[0px_4px_20px_0px_rgba(104,135,159,0.06)] dir-ltr text-left"
                    />
                </div>

                {/* GitHub */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm sm:text-base font-semibold text-[#0D202F] flex items-center gap-2">
                        <GithubIcon className="w-4 h-4 text-gray-800" />
                        <span>مستودع الكود البرمجي (GitHub / GitLab - اختياري)</span>
                    </label>
                    <input
                        type="url"
                        value={links.github}
                        onChange={(e) => setLinks({ ...links, github: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full bg-[#FFFFFF] border border-[#E2E8F0] focus:border-[#1E4C6F] focus:ring-1 focus:ring-[#1E4C6F] outline-none px-3.5 py-3 rounded-xl text-sm text-[#0D202F] shadow-[0px_4px_20px_0px_rgba(104,135,159,0.06)] dir-ltr text-left"
                    />
                </div>
            </div>

            {/* Save Button */}
            <div className="pt-3 border-t border-gray-100 flex justify-end">
                <SaveChangesButton
                    label="حفظ روابط المشروع"
                    onClick={handleSave}
                    loading={isSaving}
                    compact
                />
            </div>
        </div>
    )
}

export default ProjectLinksTab
