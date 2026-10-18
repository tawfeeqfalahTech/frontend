"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp, Search, RotateCcw } from "lucide-react";

export default function ExploreFiltersSidebar({
  filters,
  setFilters,
  domainsList,
  techList,
  onReset,
}) {
  const [openSections, setOpenSections] = useState({
    domain: true,
    rating: true,
    status: true,
    tech: true,
    funding: true,
  });

  const [techQuery, setTechQuery] = useState("");

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleDomain = (domainName) => {
    setFilters((prev) => {
      const exists = prev.selectedDomains.includes(domainName);
      return {
        ...prev,
        selectedDomains: exists
          ? prev.selectedDomains.filter((d) => d !== domainName)
          : [...prev.selectedDomains, domainName],
      };
    });
  };

  const toggleStatus = (statusName) => {
    setFilters((prev) => {
      const exists = prev.selectedStatuses.includes(statusName);
      return {
        ...prev,
        selectedStatuses: exists
          ? prev.selectedStatuses.filter((s) => s !== statusName)
          : [...prev.selectedStatuses, statusName],
      };
    });
  };

  const toggleTech = (techName) => {
    setFilters((prev) => {
      const exists = prev.selectedTechs.includes(techName);
      return {
        ...prev,
        selectedTechs: exists
          ? prev.selectedTechs.filter((t) => t !== techName)
          : [...prev.selectedTechs, techName],
      };
    });
  };

  const filteredTechs = techList.filter((t) =>
    t.toLowerCase().includes(techQuery.toLowerCase())
  );

  return (
    <aside className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-[0px_4px_16px_rgba(30,76,111,0.06)] text-right space-y-6 w-full lg:w-72 shrink-0">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-[#9E7F4D] flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="size-3.5" />
          <span>إعادة تعيين</span>
        </button>

        <div className="flex items-center gap-2 text-[#0D202F] font-bold text-base">
          <span>تصفية النتائج</span>
          <SlidersHorizontal className="size-4 text-[#1E4C6F]" />
        </div>
      </div>

      {/* 1. المجال (Domain) */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("domain")}
          className="w-full flex items-center justify-between text-sm font-bold text-[#0D202F] hover:text-[#1E4C6F]"
        >
          {openSections.domain ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
          <span>المجال</span>
        </button>

        {openSections.domain && (
          <div className="space-y-2 pt-1 animate-in fade-in duration-200">
            {domainsList.map((domain) => {
              const isChecked = filters.selectedDomains.includes(domain.name);
              return (
                <label
                  key={domain.name}
                  className="flex items-center justify-between cursor-pointer text-xs font-semibold text-[#4B708C] hover:text-[#1E4C6F] transition-colors py-0.5"
                >
                  <span className="text-slate-400 font-sans">({domain.count})</span>
                  <div className="flex items-center gap-2.5">
                    <span>{domain.name}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleDomain(domain.name)}
                      className="size-4 rounded border-slate-300 text-[#1E4C6F] focus:ring-[#1E4C6F] cursor-pointer"
                    />
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div className="h-px bg-slate-100" />

      {/* 2. التقييم (Rating / AI Score) */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("rating")}
          className="w-full flex items-center justify-between text-sm font-bold text-[#0D202F] hover:text-[#1E4C6F]"
        >
          {openSections.rating ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
          <span>التقييم بالذكاء الاصطناعي</span>
        </button>

        {openSections.rating && (
          <div className="space-y-2.5 pt-1 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-bold text-[#1E4C6F] font-sans">
              <span>{filters.minRating} / 100</span>
              <span className="text-slate-400 font-normal">الحد الأدنى</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.minRating}
              onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
              className="w-full accent-[#1E4C6F] cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="h-px bg-slate-100" />

      {/* 3. حالة المشروع (Project Status) */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("status")}
          className="w-full flex items-center justify-between text-sm font-bold text-[#0D202F] hover:text-[#1E4C6F]"
        >
          {openSections.status ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
          <span>حالة المشروع</span>
        </button>

        {openSections.status && (
          <div className="space-y-2 pt-1 animate-in fade-in duration-200">
            {["يحتاج تمويل", "يحتاج تطوير", "مكتمل"].map((status) => {
              const isChecked = filters.selectedStatuses.includes(status);
              return (
                <label
                  key={status}
                  className="flex items-center justify-end gap-2.5 cursor-pointer text-xs font-semibold text-[#4B708C] hover:text-[#1E4C6F] transition-colors py-0.5"
                >
                  <span>{status}</span>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleStatus(status)}
                    className="size-4 rounded border-slate-300 text-[#1E4C6F] focus:ring-[#1E4C6F] cursor-pointer"
                  />
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div className="h-px bg-slate-100" />

      {/* 4. التقنيات (Technologies) */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("tech")}
          className="w-full flex items-center justify-between text-sm font-bold text-[#0D202F] hover:text-[#1E4C6F]"
        >
          {openSections.tech ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
          <span>التقنيات المستخدمة</span>
        </button>

        {openSections.tech && (
          <div className="space-y-3 pt-1 animate-in fade-in duration-200">
            {/* Tech Search mini-input */}
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن تقنية..."
                value={techQuery}
                onChange={(e) => setTechQuery(e.target.value)}
                className="w-full text-xs py-2 pr-8 pl-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#1E4C6F]"
              />
              <Search className="size-3.5 text-slate-400 absolute top-2.5 right-2.5" />
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {filteredTechs.map((tech) => {
                const isSelected = filters.selectedTechs.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#1E4C6F] text-white shadow-sm"
                        : "bg-white border border-[#E9EDF1] text-[#4B708C] hover:border-[#1E4C6F] hover:text-[#1E4C6F]"
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="h-px bg-slate-100" />

      {/* 5. نطاق التمويل (Funding Range) */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("funding")}
          className="w-full flex items-center justify-between text-sm font-bold text-[#0D202F] hover:text-[#1E4C6F]"
        >
          {openSections.funding ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
          <span>نطاق التمويل</span>
        </button>

        {openSections.funding && (
          <div className="space-y-2.5 pt-1 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-bold text-[#1E4C6F] font-sans">
              <span>{filters.maxFunding.toLocaleString()} $</span>
              <span>0 $</span>
            </div>
            <input
              type="range"
              min="1000"
              max="5000000"
              step="50000"
              value={filters.maxFunding}
              onChange={(e) => setFilters({ ...filters, maxFunding: Number(e.target.value) })}
              className="w-full accent-[#1E4C6F] cursor-pointer"
            />
          </div>
        )}
      </div>

    </aside>
  );
}
