"use client";
import { useState, useRef } from "react";

export default function OtpInput({ length = 6, onComplete, onSubmit, loading = false, cooldown, isChecking, isResending }) {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length && onComplete) {
            onComplete(combinedOtp);
        }

        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();

        if (!/^\d+$/.test(pastedData)) return;

        const digits = pastedData.slice(0, length).split("");
        const newOtp = [...otp];

        digits.forEach((digit, i) => {
            newOtp[i] = digit;
        });

        setOtp(newOtp);

        const focusIndex = Math.min(digits.length, length - 1);
        inputRefs.current[focusIndex]?.focus();

        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length && onComplete) {
            onComplete(combinedOtp);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const combinedOtp = otp.join("");
        if (combinedOtp.length === length && onSubmit) {
            onSubmit(combinedOtp);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between" dir="ltr">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        disabled={loading}
                        ref={(el) => (inputRefs.current[index] = el)}
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        className="w-13 h-13 text-center text-xl shadow-xl font-bold rounded-xl border border-slate-200 bg-white text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:opacity-50"
                    />
                ))}
            </div>
            <button
                type="submit"
                onClick={onSubmit}
                disabled={loading || cooldown > 0}
                className="bg-[#1E4C6F] w-full mt-4 text-white text-lg py-2 rounded-xl cursor-pointer shadow-xl hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isChecking ? (
                    <>
                        جاري التحقق...
                        <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </>
                ) : isResending ? (
                    <>
                        جاري إرسال رمز جديد...
                        <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </>
                ) : (
                    <>
                        إرسال رمز جديد
                    </>
                )}
            </button>
        </form>
    );
}