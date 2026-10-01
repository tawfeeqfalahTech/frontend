"use client"
import { useState } from "react"
import { X, Plus } from "lucide-react"

const TagInput = ({ tags = [], onChange }) => {
    const [inputValue, setInputValue] = useState("")

    const handleAddTag = () => {
        const trimmed = inputValue.trim()
        if (trimmed && !tags.includes(trimmed)) {
            onChange?.([...tags, trimmed])
            setInputValue("")
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleAddTag()
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        onChange?.(tags.filter(t => t !== tagToRemove))
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
                {tags.map((tag, idx) => (
                    <span
                        key={idx}
                        className="inline-flex items-center gap-2 bg-[#F9FAFB] border border-[#E9EDF1] text-[#0D202F] px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all hover:border-[#B9C8D2]"
                    >
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                        <span>{tag}</span>
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-2 max-w-md">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="أضف وسماً واضغط Enter..."
                    className="flex-1 bg-white border border-[#E9EDF1] focus:border-[#1E4C6F] focus:ring-1 focus:ring-[#1E4C6F] outline-none px-4 py-2.5 rounded-xl text-sm text-[#0D202F] transition-all"
                />
                <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-[#E9EDF1] hover:bg-[#d8e2ea] text-[#1E4C6F] px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    <span>إضافة</span>
                </button>
            </div>
        </div>
    )
}

export default TagInput
