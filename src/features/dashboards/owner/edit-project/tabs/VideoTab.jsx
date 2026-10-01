"use client"
import { useState } from "react"
import { Play, Trash2, Link as LinkIcon, Video, AlertCircle } from "lucide-react"
import SaveChangesButton from "../components/SaveChangesButton"

const VideoTab = ({ onSave }) => {
    // رابط الفيديو التجريبي المضاف مسبقاً
    const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    const [isSaving, setIsSaving] = useState(false)

    const handleRemoveVideo = () => {
        setVideoUrl("")
    }

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            onSave?.("تم حفظ رابط الفيديو بنجاح!")
        }, 600)
    }

    return (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0px_4px_32px_0px_rgba(30,76,111,0.06)] border border-gray-100 flex flex-col gap-8">
            {/* Header */}
            <div className="border-b border-gray-100 pb-5">
                <h2 className="text-2xl sm:text-[26px] font-bold text-[#0D202F]">
                    عرض الفيديو التعريفي (Video Pitch)
                </h2>
                <p className="text-[#4B708C] text-sm sm:text-base mt-1.5">
                    أضف رابط فيديو دقيقة لدقيتين تشرح فيه جوهر الفكرة للمستثمرين والحكام.
                </p>
            </div>

            {/* Video Link Input Section */}
            <div className="flex flex-col gap-3">
                <label className="text-base sm:text-lg font-semibold text-[#0D202F] flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-[#1E4C6F]" />
                    <span>رابط الفيديو (YouTube / Vimeo / Loom)</span>
                </label>
                <div className="relative">
                    <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full bg-[#FFFFFF] border border-[#E2E8F0] focus:border-[#1E4C6F] focus:ring-1 focus:ring-[#1E4C6F] outline-none px-4 py-3.5 rounded-2xl text-base text-[#0D202F] shadow-[0px_4px_20px_0px_rgba(104,135,159,0.06)] dir-ltr text-left transition-all"
                    />
                </div>
                <p className="text-xs text-gray-400">
                    ضع رابط الفيديو المباشر من منصات مشاركة الفيديو (YouTube أو Vimeo أو Loom).
                </p>
            </div>

            {/* Video Preview Frame */}
            {videoUrl ? (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <label className="text-base sm:text-lg font-semibold text-[#0D202F]">
                            معاينة الفيديو الحالي
                        </label>
                        {/* زر إزالة الفيديو القديم */}
                        <button
                            type="button"
                            onClick={handleRemoveVideo}
                            className="flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>إزالة الفيديو القديم</span>
                        </button>
                    </div>

                    {/* مشغل ومعاينة الفيديو بارتفاع 400px كما في فيجما */}
                    <div className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-200 h-[360px] sm:h-[400px] w-full flex items-center justify-center group shadow-md">
                        <img
                            src="/images/video-player.png"
                            alt="معاينة الفيديو"
                            className="w-full h-full object-cover opacity-85 group-hover:opacity-75 transition-opacity duration-300"
                            onError={(e) => {
                                e.currentTarget.src = "/images/cover-image.png"
                            }}
                        />

                        {/* زر التشغيل في المنتصف */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
                            <a
                                href={videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-20 h-20 rounded-full bg-[#1E4C6F]/90 hover:bg-[#1E4C6F] backdrop-blur-xs flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform cursor-pointer"
                                title="تشغيل الفيديو"
                            >
                                <Play className="w-10 h-10 fill-current text-white translate-x-0.5" />
                            </a>
                            <span className="text-sm font-semibold bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-xs">
                                انقر لمشاهدة الفيديو
                            </span>
                        </div>

                        {/* شريط معلومات الرابط أسفل المعاينة */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/95 bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-xl">
                            <span className="truncate max-w-[80%] dir-ltr text-left font-mono">
                                {videoUrl}
                            </span>
                            <span className="text-emerald-400 font-semibold shrink-0">
                                رابط مفعّل
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                /* حالة عدم وجود فيديو */
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-3 bg-gray-50/50">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                        <Video className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-[#0D202F] font-semibold text-base">
                            لم تقم بإضافة رابط فيديو بعد
                        </p>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1">
                            أدخل رابط الفيديو في الحقل أعلاه واضغط حفظ لتظهر لك المعاينة هنا.
                        </p>
                    </div>
                </div>
            )}

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
                <SaveChangesButton
                    label="حفظ رابط الفيديو"
                    onClick={handleSave}
                    loading={isSaving}
                />
            </div>
        </div>
    )
}

export default VideoTab
