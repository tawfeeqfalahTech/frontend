"use client";

import { useState } from "react";
import Image from "next/image";
import { surfaceClass } from "@/features/dashboards/shared/dashboardStyles";
import { SectionHeading } from "../home/components";
import styles from "./InvestorProjects.module.css";

const assets = "/images/investor-projects";
export const domains = ["الصحة", "التقنية المالية", "التعليم", "العقارات", "اللوجستيات"];
export const technologies = ["React", "Laravel", "Flutter", "AI/ML", "Python", "Swift"];
export const projectStatuses = ["يحتاج تمويل", "يحتاج تطوير", "مكتمل"];

export function DesignIcon({ name, size = 12 }) {
    return <Image src={`${assets}/${name}.svg`} alt="" width={size} height={size} unoptimized />;
}

function FilterSection({ title, children, className = "" }) {
    return <details open className={`${styles.filterSection} ${className}`}>
        <summary><span>{title}</span><DesignIcon name="chevron" /></summary>
        <div className={styles.filterContent}>{children}</div>
    </details>;
}

function Checkboxes({ options, selected, onChange, counts }) {
    return <div className={styles.checkboxes}>{options.map((option) => <label key={option}>
        <span>{option}{counts && ` (${counts[option] || 0})`}</span>
        <input type="checkbox" checked={selected.includes(option)} onChange={() => onChange(selected.includes(option) ? selected.filter((value) => value !== option) : [...selected, option])} />
    </label>)}</div>;
}

function RangeFilter({ label, value, onChange, max, step = 1, currency = false }) {
    const format = (number) => `${number.toLocaleString("en-US")}${currency ? " $" : ""}`;
    return <div className={styles.rangeFilter}>
        <div className={styles.rangeValues}><output>{format(value[0])}</output><output>{format(value[1])}</output></div>
        <div className={styles.rangeTrack} dir="rtl" style={{ "--range-start": `${value[0] / max * 100}%`, "--range-end": `${value[1] / max * 100}%` }}>
            <span className={styles.rangeActive} />
            <input aria-label={`الحد الأدنى ${label}`} type="range" min="0" max={max} step={step} value={value[0]} onChange={(event) => onChange([Math.min(Number(event.target.value), value[1]), value[1]])} />
            <input aria-label={`الحد الأعلى ${label}`} type="range" min="0" max={max} step={step} value={value[1]} onChange={(event) => onChange([value[0], Math.max(Number(event.target.value), value[0])])} />
        </div>
    </div>;
}

export default function ProjectFilters({ filters, setFilter, counts, onReset, active }) {
    const [techQuery, setTechQuery] = useState("");
    const matchingTechnologies = technologies.filter((tech) => tech.toLowerCase().includes(techQuery.toLowerCase().trim()));
    return <aside className={`${surfaceClass} ${styles.filters}`} aria-label="تصفية المشاريع">
        <div className={styles.filterHeading}><SectionHeading id="project-filters-title" title="تصفية النتائج" /><DesignIcon name="sliders" size={16} /></div>
        <FilterSection title="المجال" className={styles.domainSection}><Checkboxes options={domains} counts={counts} selected={filters.domains} onChange={(value) => setFilter("domains", value)} /></FilterSection>
        <FilterSection title="التقييم"><RangeFilter label="للتقييم" value={filters.rating} onChange={(value) => setFilter("rating", value)} max={100} /></FilterSection>
        <FilterSection title="حالة المشروع"><Checkboxes options={projectStatuses} selected={filters.statuses} onChange={(value) => setFilter("statuses", value)} /></FilterSection>
        <FilterSection title="التقنيات">
            <div className={styles.searchField}><DesignIcon name="search" /><input aria-label="البحث في التقنيات" placeholder="ابحث عن تقنية..." value={techQuery} onChange={(event) => setTechQuery(event.target.value)} /></div>
            <div className={styles.techChips} dir="ltr">{matchingTechnologies.map((tech) => <button key={tech} type="button" aria-pressed={filters.technologies.includes(tech)} onClick={() => setFilter("technologies", filters.technologies.includes(tech) ? filters.technologies.filter((value) => value !== tech) : [...filters.technologies, tech])}>{tech}</button>)}</div>
            {matchingTechnologies.length === 0 && <div role="status" className="text-xs leading-6 text-[#68879F]"><p>لا توجد تقنيات تطابق البحث.</p><button type="button" className={styles.resetFilters} onClick={() => setTechQuery("")}>عرض جميع التقنيات</button></div>}
        </FilterSection>
        <FilterSection title="نطاق التمويل"><RangeFilter label="للتمويل" value={filters.funding} onChange={(value) => setFilter("funding", value)} max={5000000} step={1000} currency /></FilterSection>
        {active && <button type="button" className={styles.resetFilters} onClick={() => { setTechQuery(""); onReset(); }}>إعادة تعيين الفلاتر</button>}
    </aside>;
}
