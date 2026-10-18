"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Globe, Moon } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "استكشف الفرص", href: "/explore" },
    { label: "كيف نعمل", href: "/#how-it-works" },
    { label: "لماذا إحياء", href: "/#features" },
    { label: "آراء الشركاء", href: "/#testimonials" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#B9C8D2]/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Right side: Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative size-12 shrink-0 flex items-center justify-center">
            <Image
              src="/images/landing/logo-brand.png"
              alt="شعار إحياء"
              width={48}
              height={48}
              className="object-contain transition-transform group-hover:scale-105"
              priority
            />
          </div>
          <span className="text-3xl font-bold font-sans text-[#9E7F4D] tracking-tight">
            إحياء
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[17px] font-semibold text-[#1E4C6F] hover:text-[#9E7F4D] transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Left side: Action Buttons & Auth */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-xl border border-[#1E4C6F] text-[#1E4C6F] font-semibold text-base hover:bg-[#E9EDF1] transition-all"
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/dashboard/idea-owner/create-project"
            className="px-6 py-2.5 rounded-xl bg-[#1E4C6F] text-white font-semibold text-base shadow-sm hover:bg-[#15364F] transition-all flex items-center gap-2 group"
          >
            <span>أضف مشروعك</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Quick utility controls */}
          <div className="flex items-center gap-2 pr-2 border-r border-slate-200">
            <button
              aria-label="تغيير المظهر"
              className="size-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Moon className="size-4" />
            </button>
            <button
              aria-label="تغيير اللغة"
              className="size-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Globe className="size-4" />
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#1E4C6F] hover:bg-[#E9EDF1] transition-colors"
            aria-label="فتح القائمة"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-semibold text-[#1E4C6F] hover:bg-[#E9EDF1]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-[#1E4C6F] text-[#1E4C6F] font-semibold"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/dashboard/idea-owner/create-project"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-[#1E4C6F] text-white font-semibold"
            >
              أضف مشروعك الآن
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-sm text-[#9E7F4D] font-semibold hover:underline"
            >
              إنشاء حساب جديد
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
