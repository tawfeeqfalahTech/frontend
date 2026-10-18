"use client";

import { useState } from "react";
import Link from "next/link";
import { Code2, ChevronUp, ChevronDown, ExternalLink } from "lucide-react";

export default function DevQuickAccess() {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    {
      title: "صفحات أصحاب الأفكار (Idea Owner)",
      links: [
        { label: "Owner Dashboard", href: "/dashboard/idea-owner" },
        { label: "Projects Dashboard", href: "/dashboard/idea-owner/projects" },
        { label: "Create Project", href: "/dashboard/idea-owner/create-project" },
      ],
    },
    {
      title: "صفحات المصادقة (Auth)",
      links: [
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
        { label: "Forgot Password", href: "/forgot-password" },
      ],
    },
    {
      title: "لوحات الأدوار الأخرى (Other Dashboards)",
      links: [
        { label: "Investor Dashboard", href: "/dashboard/investor" },
        { label: "Admin Dashboard", href: "/dashboard/admin" },
      ],
    },
  ];

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {/* Expanded Panel */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-2xl p-5 text-right space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-[#1E4C6F]/10 text-[#1E4C6F]">
              Dev Navigation Helper
            </span>
            <span className="text-sm font-bold text-slate-800">
              روابط التطوير السريعة
            </span>
          </div>

          <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            {sections.map((sec, idx) => (
              <div key={idx} className="space-y-1.5">
                <span className="text-xs font-bold text-[#9E7F4D] block">
                  {sec.title}
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {sec.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-[#E9EDF1] text-xs font-semibold text-[#1E4C6F] flex items-center justify-between group transition-colors"
                    >
                      <ExternalLink className="size-3 text-slate-400 group-hover:text-[#1E4C6F]" />
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 text-center">
            نسخة الصفحة السابقة محفوظة في <code className="text-[#1E4C6F]">page.backup.js</code>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0D202F] text-white shadow-xl hover:bg-[#1E4C6F] border border-white/10 transition-all cursor-pointer group"
        aria-label="روابط التطوير"
      >
        <Code2 className="size-4 text-[#9E7F4D] group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold font-sans">روابط التطوير</span>
        {isOpen ? <ChevronDown className="size-4 text-slate-300" /> : <ChevronUp className="size-4 text-slate-300" />}
      </button>
    </div>
  );
}
