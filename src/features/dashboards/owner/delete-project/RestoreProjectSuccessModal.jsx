"use client";
import { useEffect } from "react";
import { CircleCheck } from "lucide-react";

export default function RestoreProjectSuccessModal({
    open,
    onContinue,
}) {
    useEffect(() => {
        if (!open) return;
        function handleEscape(e) {
            if (e.key === "Escape") onContinue?.();
        }
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [open, onContinue]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onContinue?.();
            }}
        >
            <div
                dir="rtl"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="success-modal-title"
                className="w-full max-w-[340px] rounded-2xl bg-white p-6 text-center shadow-xl"
            >
                {/* Success icon */}
                <div className="mx-auto mb-4 flex h-13 w-13 items-center justify-center rounded-full bg-[#EDF7EE]">
                    <CircleCheck size={23} className="text-emerald-600" strokeWidth={2.5} />
                </div>

                <h2
                    id="success-modal-title"
                    className="mb-6 text-lg font-bold leading-7 text-slate-900"
                >
                    تم استرجاع المشروع بنجاح.
                </h2>

                <button
                    type="button"
                    onClick={onContinue}
                    className="w-full rounded-xl bg-[#367C39] py-3 text-[15px] font-semibold text-white transition hover:bg-[#2A612D]"
                >
                    استمرار
                </button>
            </div>
        </div >
    );
}