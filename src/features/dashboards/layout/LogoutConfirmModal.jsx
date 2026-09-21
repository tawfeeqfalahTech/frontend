"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function LogoutConfirmModal({
    open,
    onConfirm,
    onCancel,
}) {
    const cardRef = useRef(null);

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
            className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl bg-slate-900/40 px-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onCancel?.();
            }}
        >
            <div
                ref={cardRef}
                dir="rtl"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="logout-confirm-title"
                className="w-92.5 rounded-2xl bg-white px-3.5 py-3.5 text-center shadow-2xl"
            >
                <div className="mx-auto mb-1.5 flex h-28 items-center justify-center">
                    <Image
                        src="/images/logout-icon.png"
                        alt="logout"
                        width={96}
                        priority
                        height={96}
                        unoptimized
                        className="h-24 w-auto object-contain"
                    />
                </div>

                <h2
                    id="logout-confirm-title"
                    className="mb-6 text-2xl font-semibold leading-8 text-slate-800"
                >
                    هل تريد حقا تسجيل الخروج والمغادرة؟
                </h2>

                <div className="flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="w-full rounded-xl bg-[#1E4C6F] cursor-pointer py-3 text-[15px] font-semibold text-white transition hover:bg-[#0e3450]"
                    >
                        تأكيد
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full rounded-xl border border-slate-300 bg-white py-3 text-[15px] font-semibold text-slate-600 transition hover:bg-slate-100"
                    >
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
    );
}