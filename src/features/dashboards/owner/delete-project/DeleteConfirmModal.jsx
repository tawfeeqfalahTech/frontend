"use client";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function DeleteProjectModal({
    open,
    onConfirm,
    onCancel,
}) {

    useEffect(() => {
        if (!open) return;
        function handleEscape(e) {
            if (e.key === "Escape") onCancel?.();
        }
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [open, onCancel]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onCancel?.();
            }}
        >
            <div
                dir="rtl"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-confirm-title"
                aria-describedby="delete-confirm-desc"
                className="w-full max-w-[380px] rounded-2xl bg-white p-6 text-center shadow-xl"
            >
                <div className="mx-auto mb-4 flex h-13 w-13 items-center justify-center rounded-full bg-[#FEECEB]">
                    <AlertTriangle size={26} className="text-[#AD3026]" strokeWidth={2} />
                </div>

                <h2
                    id="delete-confirm-title"
                    className=" mb-1 text-[16px] font-bold leading-7 text-slate-900"
                >
                    هذا الإجراء لا يمكن التراجع عنه
                </h2>

                <p
                    id="delete-confirm-desc"
                    className="mb-6 text-[13.5px] leading-6 text-slate-600 font-semibold"
                >
                    سيتم حذف المشروع وكل ملفاته نهائيًا من خوادم منصة إحياء دون إمكانية استرجاعه مجددًا.
                </p>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-[14px] font-semibold text-slate-500 transition hover:bg-slate-50"
                    >
                        إلغلء الأمر
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex-1 rounded-xl bg-[#c0392b] cursor-pointer py-3 text-[14px] font-semibold text-white transition hover:bg-[#a83224]"
                    >
                        نعم، احذف نهائيًا
                    </button>
                </div>
            </div>
        </div>
    );
}