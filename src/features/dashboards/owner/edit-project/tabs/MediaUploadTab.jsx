"use client"
import { useState, useRef } from "react"
import { UploadCloud, Image as ImageIcon, Trash2, CheckCircle2, Star } from "lucide-react"
import SaveChangesButton from "../components/SaveChangesButton"

const MediaUploadTab = ({ onSave }) => {
    const fileInputRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [images, setImages] = useState([
        {
            id: 1,
            url: "/images/cover-image.png",
            name: "واجهة لوحة التحكم الرئيسية.png",
            size: "2.4 MB",
            isCover: true
        },
        {
            id: 2,
            url: "/images/project-success.png",
            name: "مخطط إدارة المنتجات والمخزون.png",
            size: "1.8 MB",
            isCover: false
        }
    ])

    const handleFileSelect = (files) => {
        if (!files || files.length === 0) return

        const newImages = Array.from(files).map((file, idx) => ({
            id: Date.now() + idx,
            url: URL.createObjectURL(file),
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            isCover: images.length === 0 && idx === 0
        }))

        setImages((prev) => [...prev, ...newImages])
    }

    const handleDelete = (id) => {
        setImages((prev) => {
            const filtered = prev.filter(img => img.id !== id)
            // If the deleted one was cover, set the first one as cover
            if (filtered.length > 0 && !filtered.some(img => img.isCover)) {
                filtered[0].isCover = true
            }
            return filtered
        })
    }

    const handleSetCover = (id) => {
        setImages((prev) =>
            prev.map(img => ({
                ...img,
                isCover: img.id === id
            }))
        )
    }

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            onSave?.("تم حفظ الصور والمرفقات بنجاح!")
        }, 600)
    }

    return (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0px_4px_32px_0px_rgba(30,76,111,0.06)] border border-gray-100 flex flex-col gap-8">
            {/* Header */}
            <div className="border-b border-gray-100 pb-5">
                <h2 className="text-2xl sm:text-[26px] font-bold text-[#0D202F]">
                    صور المشروع والمرفقات المرئية
                </h2>
                <p className="text-[#4B708C] text-sm sm:text-base mt-1.5">
                    أضف صوراً توضيحية لنماذج وعمليات مشروعك لزيادة الثقة لدى المستثمرين.
                </p>
            </div>

            {/* Drag & Drop Area */}
            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault()
                    setIsDragging(false)
                    handleFileSelect(e.dataTransfer.files)
                }}
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${
                    isDragging
                        ? "border-[#1E4C6F] bg-[#E9EDF1]/50 scale-[1.01]"
                        : "border-[#1E4C6F]/40 bg-[#F9FAFB] hover:border-[#1E4C6F] hover:bg-[#F0F4F8]"
                }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files)}
                />
                <div className="w-14 h-14 rounded-2xl bg-[#E9EDF1] flex items-center justify-center text-[#1E4C6F]">
                    <UploadCloud className="w-8 h-8" />
                </div>
                <div className="text-center">
                    <p className="text-[#1E4C6F] font-bold text-base sm:text-lg">
                        اسحب الصور هنا أو تصفح ملفاتك
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        دعم صيغ PNG, JPG بحد أقصى 5 ميجابايت للملف
                    </p>
                </div>
            </div>

            {/* Uploaded Images List */}
            {images.length > 0 && (
                <div className="flex flex-col gap-4">
                    <h3 className="text-base sm:text-lg font-bold text-[#0D202F]">
                        الصور المرفوعة ({images.length})
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {images.map((img) => (
                            <div
                                key={img.id}
                                className={`relative rounded-2xl overflow-hidden border transition-all duration-200 group bg-gray-50 flex flex-col ${
                                    img.isCover ? "border-[#1E4C6F] ring-2 ring-[#1E4C6F]/20" : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                                    <img
                                        src={img.url}
                                        alt={img.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        onError={(e) => {
                                            e.currentTarget.src = "/images/cover-image.png"
                                        }}
                                    />
                                    {img.isCover && (
                                        <div className="absolute top-3 right-3 bg-[#1E4C6F] text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <span>صورة الغلاف</span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-3.5 flex items-center justify-between gap-2 bg-white">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-[#0D202F] truncate">
                                            {img.name}
                                        </p>
                                        <p className="text-[11px] text-gray-500 mt-0.5">
                                            {img.size}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {!img.isCover && (
                                            <button
                                                type="button"
                                                onClick={() => handleSetCover(img.id)}
                                                className="p-1.5 text-gray-500 hover:text-[#1E4C6F] hover:bg-[#E9EDF1] rounded-lg text-xs transition-colors cursor-pointer"
                                                title="تعيين كغلاف"
                                            >
                                                <Star className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(img.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                            title="حذف الصورة"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
                <SaveChangesButton
                    label="حفظ الصور والمرفقات"
                    onClick={handleSave}
                    loading={isSaving}
                />
            </div>
        </div>
    )
}

export default MediaUploadTab
