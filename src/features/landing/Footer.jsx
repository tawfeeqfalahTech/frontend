import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#15364F] text-[#E9EDF1] pt-16 pb-8 border-t border-[#1E4C6F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-right">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative size-10 shrink-0">
                <Image
                  src="/images/landing/logo-brand.png"
                  alt="شعار إحياء"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold font-sans text-[#E9EDF1]">
                إحياء
              </span>
            </Link>

            <p className="text-sm sm:text-base text-[#B9C8D2] leading-relaxed max-w-sm">
              منصة سوق إلكتروني آمنة تسخر أدوات تقييم الذكاء الاصطناعي لربط رواد الأعمال بالمستثمرين المعتمدين محلياً وعالمياً.
            </p>

            <div className="space-y-2 text-sm text-[#B9C8D2]">
              <div className="flex items-center justify-end gap-2.5">
                <span>support@ehyaa.com</span>
                <Mail className="size-4 text-[#9E7F4D]" />
              </div>
              <div className="flex items-center justify-end gap-2.5">
                <span dir="ltr">+970 59 123 4567</span>
                <Phone className="size-4 text-[#9E7F4D]" />
              </div>
              <div className="flex items-center justify-end gap-2.5">
                <span>غزة، فلسطين</span>
                <MapPin className="size-4 text-[#9E7F4D]" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#E9EDF1] border-b border-white/10 pb-2">
              روابط سريعة
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B9C8D2]">
              <li>
                <Link href="#hero" className="hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/dashboard/idea-owner/projects" className="hover:text-white transition-colors">
                  استكشف المشاريع
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-white transition-colors">
                  كيف نعمل
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-white transition-colors">
                  لماذا إحياء
                </Link>
              </li>
            </ul>
          </div>

          {/* Idea Owner Routes */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#E9EDF1] border-b border-white/10 pb-2">
              رواد الأعمال
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B9C8D2]">
              <li>
                <Link href="/dashboard/idea-owner" className="hover:text-white transition-colors">
                  لوحة التحكم
                </Link>
              </li>
              <li>
                <Link href="/dashboard/idea-owner/projects" className="hover:text-white transition-colors">
                  إدارة المشاريع
                </Link>
              </li>
              <li>
                <Link href="/dashboard/idea-owner/create-project" className="hover:text-white transition-colors">
                  إضافة مشروع جديد
                </Link>
              </li>
              <li>
                <Link href="/dashboard/investor" className="hover:text-white transition-colors text-xs text-[#9E7F4D]">
                  بوابة المستثمرين
                </Link>
              </li>
            </ul>
          </div>

          {/* Auth Routes & Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#E9EDF1] border-b border-white/10 pb-2">
              الحساب والأمان
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B9C8D2]">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  تسجيل الدخول
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors">
                  إنشاء حساب جديد
                </Link>
              </li>
              <li>
                <Link href="/forgot-password" className="hover:text-white transition-colors">
                  استعادة كلمة المرور
                </Link>
              </li>
              <li>
                <span className="text-xs text-slate-400">
                  شروط الاستخدام والخصوصية
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B9C8D2]/70">
          <p>© ٢٠٢٦ منصة إحياء الاستثمارية. جميع الحقوق محفوظة.</p>
          <span className="font-mono text-[11px] bg-white/5 px-3 py-1 rounded-full">
            v1.2 — Arabic MVP
          </span>
        </div>

      </div>
    </footer>
  );
}
