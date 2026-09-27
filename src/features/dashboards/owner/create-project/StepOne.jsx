import { X } from 'lucide-react'
import { useCallback, useRef, useState, useEffect } from 'react'

const StepOne = ({ formData, setFormData, errors = {} }) => {
    const value = formData?.image || null
    const label = "صورة الغلاف"
    const hint = "اسحب صورة أو انقر للاختيار"
    const maxSizeMB = 5
    const accept = "image/png,image/jpeg,image/webp"

    const inputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");
    const [techInput, setTechInput] = useState("");

    // تحديث المعاينة تلقائياً عند تغيير صورة الغلاف في بيانات النموذج
    useEffect(() => {
        if (!value) {
            setPreview(null);
            return;
        }

        if (typeof value === 'string') {
            setPreview(value);
        } else if (value instanceof File || value instanceof Blob) {
            const objectUrl = URL.createObjectURL(value);
            setPreview(objectUrl);

            // تنظيف الذاكرة عند التفكيك أو التغيير
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [value]);

    const onChange = useCallback((file) => {
        setFormData?.(prev => ({ ...prev, image: file }));
    }, [setFormData]);

    const validateAndSet = useCallback(
        (selectedFile) => {
            setError("");

            if (!selectedFile) return;

            if (!selectedFile.type.startsWith("image/")) {
                setError("الرجاء اختيار ملف صورة صالح");
                return;
            }

            const sizeMB = selectedFile.size / (1024 * 1024);
            if (sizeMB > maxSizeMB) {
                setError(`حجم الصورة يجب ألا يتجاوز ${maxSizeMB} ميجابايت`);
                return;
            }

            onChange?.(selectedFile);
        },
        [maxSizeMB, onChange]
    );

    const handleInputChange = (e) => {
        const selectedFile = e.target.files?.[0];
        validateAndSet(selectedFile);
        e.target.value = "";
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files?.[0];
        validateAndSet(droppedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        setPreview(null);
        setError("");
        onChange?.(null);
    };

    const openFilePicker = () => inputRef.current?.click();

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openFilePicker();
        }
    };

    // إدارة إضافة وحذف التقنيات (Tags)
    const techList = Array.isArray(formData?.tech) ? formData.tech : [];

    const handleAddTech = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmed = techInput.trim();
            if (!trimmed) return;

            if (techList.length >= 10) return;

            if (!techList.includes(trimmed)) {
                setFormData?.(prev => ({ ...prev, tech: [...techList, trimmed] }));
            }
            setTechInput("");
        }
    };

    const handleRemoveTech = (indexToRemove) => {
        setFormData?.(prev => ({
            ...prev,
            tech: techList.filter((_, idx) => idx !== indexToRemove)
        }));
    };

    return (
        <div className="space-y-5 dir-rtl" dir="rtl">
            <div className="flex flex-col md:flex-row items-start gap-5">
                {/* حقول العنوان والوصف */}
                <div className="w-full flex-1">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="title" className="font-semibold text-slate-800 text-sm">عنوان المشروع</label>
                        <input
                            id="title"
                            value={formData?.title || ''}
                            onChange={(e) =>
                                setFormData?.((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                            type="text"
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 text-sm transition-all duration-300 outline-none hover:border-slate-300 focus:border-[#1E4C6F] focus:ring-4 focus:ring-[#1E4C6F]/10 placeholder:text-slate-400"
                            placeholder="مثال: تطبيق إدارة المهام الذكي"
                        />
                        {errors.title && <p className="form-error text-xs font-medium text-red-500">{errors.title}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5 mt-3">
                        <label htmlFor="shortDescription" className="font-semibold text-slate-800 text-sm">وصف مختصر</label>
                        <textarea
                            id="shortDescription"
                            maxLength={200}
                            rows={4}
                            value={formData?.shortDescription || ''}
                            onChange={(e) =>
                                setFormData?.((prev) => ({
                                    ...prev,
                                    shortDescription: e.target.value,
                                }))
                            }
                            className="w-full resize-none p-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-800 text-sm leading-relaxed placeholder:text-slate-400 transition-all duration-300 outline-none hover:border-slate-300 focus:border-[#1E4C6F] focus:ring-4 focus:ring-[#1E4C6F]/10"
                            placeholder="صف مشروعك، المشكلة التي يحلها، الفئة المستهدفة، المميزات الرئيسية، وأي تفاصيل أخرى..."
                        />
                        <div className="flex items-center justify-between text-xs px-0.5">
                            <p className="text-emerald-600 font-medium">عدد الأحرف المسموح به 50 - 200</p>
                            <span className="text-slate-400 font-medium">{formData?.shortDescription?.length || 0} / 200</span>
                        </div>
                        {errors.shortDescription && <p className="form-error text-xs font-medium text-red-500">{errors.shortDescription}</p>}
                    </div>
                </div>

                {/* حقل رفع صورة الغلاف */}
                <div className="w-full md:w-60 text-right shrink-0">
                    <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                        {label}
                    </label>

                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        onChange={handleInputChange}
                        className="hidden"
                    />

                    <div
                        role="button"
                        tabIndex={0}
                        onClick={openFilePicker}
                        onKeyDown={handleKeyDown}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        aria-label={label}
                        className={`
                            relative flex h-[195px] w-full cursor-pointer flex-col items-center justify-center gap-2
                            overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300
                            ${isDragging ? "border-[#1E4C6F] bg-[#1E4C6F]/5" : "border-slate-300 bg-white"}
                            ${!preview ? "hover:border-[#1E4C6F]/50 hover:bg-slate-50" : ""}
                            focus:outline-none focus:ring-4 focus:ring-[#1E4C6F]/10
                        `}
                    >
                        {preview ? (
                            <>
                                <img
                                    src={preview}
                                    alt="معاينة صورة الغلاف"
                                    className="h-full w-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemove}
                                    aria-label="إزالة الصورة"
                                    className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/70 text-white transition-all hover:bg-slate-900 hover:scale-110"
                                >
                                    <X size={15} />
                                </button>
                            </>
                        ) : (
                            <>
                                <img src="/images/dragImage.png" alt="" className="w-14 h-14 object-contain opacity-80" />
                                <span className="px-3 text-center text-xs font-medium text-slate-600 leading-relaxed">
                                    {hint}
                                </span>
                            </>
                        )}
                    </div>

                    {error && <p className="form-error mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
                    {errors.image && !error && <p className="form-error mt-1.5 text-xs text-red-500 font-medium">{errors.image}</p>}

                    {value && value.name && !error && (
                        <p className="mt-1.5 truncate text-xs text-slate-400 font-medium">{value.name}</p>
                    )}
                </div>
            </div>

            {/* باقي الحقول: الفئة والتقنيات */}
            <div className="space-y-3">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="category" className="font-semibold text-slate-800 text-sm">الفئة / المجال</label>
                    <input
                        id="category"
                        type="text"
                        value={formData?.category || ''}
                        onChange={(e) => setFormData?.(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 text-sm transition-all duration-300 outline-none hover:border-slate-300 focus:border-[#1E4C6F] focus:ring-4 focus:ring-[#1E4C6F]/10 placeholder:text-slate-400"
                        placeholder="أدخل المجال / الفئة التي ينتمي إليها المشروع"
                    />
                    {errors.category && <p className="form-error text-xs font-medium text-red-500">{errors.category}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="tech" className="font-semibold text-slate-800 text-sm">التقنيات المستخدمة</label>
                    <input
                        id="tech"
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={handleAddTech}
                        disabled={techList.length >= 10}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 text-sm transition-all duration-300 outline-none hover:border-slate-300 focus:border-[#1E4C6F] focus:ring-4 focus:ring-[#1E4C6F]/10 placeholder:text-slate-400 disabled:bg-slate-100 disabled:cursor-not-allowed"
                        placeholder={techList.length >= 10 ? "وصلت للحد الأقصى (10 تقنيات)" : "اكتب التقنية واضغط Enter لإضافتها"}
                    />

                    {techList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                            {techList.map((item, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1E4C6F]/10 text-[#1E4C6F] rounded-lg text-xs font-semibold"
                                >
                                    {item}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTech(idx)}
                                        className="hover:text-red-500 transition-colors"
                                    >
                                        <X size={13} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="text-slate-500 text-xs font-medium">الحد الأقصى 10 تقنيات — يمكنك كتابة أي تقنية غير مقترحة</p>
                </div>
            </div>
        </div>
    )
}

export default StepOne;