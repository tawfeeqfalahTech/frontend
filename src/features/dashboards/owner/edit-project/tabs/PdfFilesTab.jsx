"use client"
import { useState, useRef } from "react"
import { UploadCloud, FileText, Trash2, Download, ExternalLink } from "lucide-react"
import SaveChangesButton from "../components/SaveChangesButton"

const PdfFilesTab = ({ onSave }) => {
    const fileInputRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [documents, setDocuments] = useState([
        {
            id: 1,
            name: "دراسة الجدوى الاقتصادية الشاملة 2026.pdf",
            size: "4.2 MB",
            date: "15 يناير 2026",
            type: "feasibility"
        },
        {
            id: 2,
            name: "عرض تقديم فكرة المشروع للمستثمرين (Pitch Deck).pdf",
            size: "8.7 MB",
            date: "20 فبراير 2026",
            type: "pitch_deck"
        }
    ])

    const handleFileSelect = (files) => {
        if (!files || files.length === 0) return

        const newFiles = Array.from(files).map((file, idx) => ({
            id: Date.now() + idx,
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            date: "اليوم",
            type: "document"
        }))

        setDocuments((prev) => [...prev, ...newFiles])
    }

    const handleDelete = (id) => {
        setDocuments((prev) => prev.filter(doc => doc.id !== id))
    }

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            onSave?.("تم حفظ ملفات PDF بنجاح!")
        }, 600)
    }

    return (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0px_4px_32px_0px_rgba(30,76,111,0.06)] border border-gray-100 flex flex-col gap-8">
            {/* Header */}
            <div className="border-b border-gray-100 pb-5">
                <h2 className="text-2xl sm:text-[26px] font-bold text-[#0D202F]">
                    ملفات PDF والمستندات
                </h2>
                <p className="text-[#4B708C] text-sm sm:text-base mt-1.5">
                    أرفق دراسات الجدوى، خطط العمل، أو العروض التقديمية (Pitch Deck) لتمكين المستثمرين من دراسة المشروع.
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
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files)}
                />
                <div className="w-14 h-14 rounded-2xl bg-[#E9EDF1] flex items-center justify-center text-[#1E4C6F]">
                    <UploadCloud className="w-8 h-8" />
                </div>
                <div className="text-center">
                    <p className="text-[#1E4C6F] font-bold text-base sm:text-lg">
                        اسحب ملفات PDF هنا أو تصفح جهازك
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        دعم ملفات PDF فقط بحد أقصى 25 ميجابايت للملف
                    </p>
                </div>
            </div>

            {/* Uploaded Documents List */}
            {documents.length > 0 && (
                <div className="flex flex-col gap-4">
                    <h3 className="text-base sm:text-lg font-bold text-[#0D202F]">
                        المستندات الحالية ({documents.length})
                    </h3>

                    <div className="flex flex-col gap-3">
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-[#1E4C6F]/50 hover:shadow-xs transition-all duration-200"
                            >
                                <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-[#0D202F] truncate">
                                            {doc.name}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            الحجم: {doc.size} • تاريخ الإضافة: {doc.date}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        type="button"
                                        className="p-2 text-gray-500 hover:text-[#1E4C6F] hover:bg-[#E9EDF1] rounded-lg transition-colors cursor-pointer"
                                        title="تحميل الملف"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(doc.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                        title="حذف الملف"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
                <SaveChangesButton
                    label="حفظ ملفات PDF"
                    onClick={handleSave}
                    loading={isSaving}
                />
            </div>
        </div>
    )
}

export default PdfFilesTab
