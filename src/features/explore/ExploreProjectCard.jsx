"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, ArrowLeft, ArrowUpRight } from "lucide-react";

export default function ExploreProjectCard({ project, viewMode = "grid" }) {
  const [isSaved, setIsSaved] = useState(false);

  if (viewMode === "list") {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.03)] hover:shadow-xl hover:border-[#1E4C6F]/30 transition-all flex flex-col md:flex-row items-center gap-6 text-right w-full group">
        <div className="relative h-44 w-full md:w-64 rounded-xl overflow-hidden shrink-0 bg-slate-100">
          <Image
            src={project.image || "/images/landing/idea-cover.png"}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0F172A]/80 backdrop-blur-md text-white text-xs font-bold font-sans">
            {project.category}
          </span>
        </div>

        <div className="flex-1 space-y-3 w-full">
          <div className="flex items-start justify-between gap-4">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved ? "bg-[#9E7F4D] text-white border-[#9E7F4D]" : "border-slate-200 text-slate-500 hover:text-[#1E4C6F]"
              }`}
              aria-label="حفظ المشروع"
            >
              <Bookmark className="size-4" fill={isSaved ? "currentColor" : "none"} />
            </button>
            <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#1E4C6F] transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {project.technologies?.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-md bg-[#E9EDF1] text-[#1E4C6F] text-xs font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-4 text-sm font-semibold text-slate-700">
              <span>{project.supporters || "5 داعمين"}</span>
              <span className="font-extrabold text-[#0F172A] font-sans">{project.target}</span>
            </div>
            <Link
              href="/dashboard/idea-owner/view-project"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1E4C6F] group-hover:text-[#9E7F4D] transition-colors"
            >
              <span>عرض التفاصيل</span>
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[20px] shadow-[0px_10px_24px_rgba(15,23,42,0.04)] hover:shadow-2xl hover:border-[#1E4C6F]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden text-right group">
      {/* Cover Image & Category Badge */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <Image
          src={project.image || "/images/landing/idea-cover.png"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-[#0F172A]/85 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold font-sans">
          {project.category}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#1E4C6F] transition-colors line-clamp-1 mb-2">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* AI Score */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-[#9E7F4D] font-sans">{project.score || "80/100"}</span>
            <span className="text-slate-500 font-normal">تقييم الذكاء الاصطناعي</span>
          </div>
          <div className="h-1.5 w-full bg-[#E9EDF1] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#9E7F4D] rounded-full transition-all duration-700"
              style={{ width: `${project.progress || 80}%` }}
            />
          </div>
        </div>

        {/* Tech Chips */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-[#E9EDF1]/80 text-[#1E4C6F] text-[11px] font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Meta: Supporters & Target */}
        <div className="flex items-center justify-between text-sm pt-3 border-t border-[#E2E8F0]/70">
          <div className="flex items-center gap-2 text-slate-700 text-xs font-medium">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="text-slate-400 hover:text-[#1E4C6F] transition-colors"
              aria-label="حفظ"
            >
              <Bookmark className={`size-4 ${isSaved ? "fill-[#9E7F4D] text-[#9E7F4D]" : ""}`} />
            </button>
            <span>{project.supporters || "5 داعمين"}</span>
          </div>
          <span className="font-extrabold text-[#0F172A] font-sans text-sm">
            {project.target}
          </span>
        </div>

        {/* Action Button */}
        <Link
          href="/dashboard/idea-owner/view-project"
          className="w-full pt-3 flex items-center justify-center gap-2 text-sm font-bold text-[#1E4C6F] group-hover:text-[#9E7F4D] border-t border-[#E2E8F0]/70 transition-colors"
        >
          <span>عرض التفاصيل</span>
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
