"use client";

import { useMemo, useState } from "react";
import { Grid2X2, List, SlidersHorizontal } from "lucide-react";
import useInvestorProfile from "../profile/useInvestorProfile";
import useSavedProjects from "../home/useSavedProjects";
import { suggestedProjects } from "../home/data";
import { EmptyState, ProjectCard, ProjectDialog } from "../home/components";
import ProjectFilters, { DesignIcon, domains } from "./ProjectFilters";
import styles from "./InvestorProjects.module.css";

const initialFilters = { domains: [], statuses: [], rating: [0, 100], funding: [0, 5000000], technologies: ["React", "AI/ML"] };
const normalize = (value) => value.normalize("NFKD").replace(/[\u064B-\u065F]/g, "").replace(/[أإآ]/g, "ا").toLowerCase().trim();

export default function InvestorProjects({ data, query }) {
    const { email } = useInvestorProfile();
    const { ids: savedIds, toggle } = useSavedProjects(data.savedIds, email || "current", false);
    const [filters, setFilters] = useState(initialFilters);
    const [search, setSearch] = useState(query);
    const [sort, setSort] = useState("newest");
    const [view, setView] = useState("grid");
    const [mobileFilters, setMobileFilters] = useState(false);
    const [selection, setSelection] = useState(null);
    const [notice, setNotice] = useState("");
    const availableProjects = data.projects ?? suggestedProjects;
    const counts = useMemo(() => Object.fromEntries(domains.map((domain) => [domain, availableProjects.filter((project) => project.domain === domain).length])), [availableProjects]);
    const active = JSON.stringify(filters) !== JSON.stringify(initialFilters);
    const projects = useMemo(() => availableProjects.filter((project) => {
        const matchesSearch = normalize(`${project.title} ${project.description} ${project.sector} ${project.domain} ${project.technologies.join(" ")}`).includes(normalize(search));
        return matchesSearch && (!filters.domains.length || filters.domains.includes(project.domain)) && (!filters.statuses.length || filters.statuses.includes(project.status)) && project.score >= filters.rating[0] && project.score <= filters.rating[1] && project.funding >= filters.funding[0] && project.funding <= filters.funding[1] && (!filters.technologies.length || project.technologies.some((tech) => filters.technologies.includes(tech)));
    }).sort((a, b) => sort === "rating" ? b.score - a.score : sort === "funding-low" ? a.funding - b.funding : sort === "funding-high" ? b.funding - a.funding : b.publishedAt.localeCompare(a.publishedAt)), [availableProjects, filters, search, sort]);
    const save = (id) => {
        try { toggle(id); setNotice(savedIds.includes(id) ? "تمت إزالة المشروع من المحفوظات" : "تم حفظ المشروع"); }
        catch { setNotice("تعذر حفظ المشروع. حاول مجددًا بعد السماح بالتخزين في المتصفح."); }
    };
    return <div className={`${styles.page} min-w-0 text-[#0D202F]`} dir="rtl">
        <button type="button" className={styles.mobileFilterToggle} aria-expanded={mobileFilters} aria-controls="project-filters" onClick={() => setMobileFilters((open) => !open)}><SlidersHorizontal size={18} />تصفية النتائج</button>
        <div className={styles.layout}>
            <div id="project-filters" className={`${styles.filterWrapper} ${mobileFilters ? styles.filtersOpen : ""}`}><ProjectFilters filters={filters} counts={counts} active={active} setFilter={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} onReset={() => setFilters(initialFilters)} /></div>
            <section className={styles.results} aria-label="استكشاف المشاريع">
                <div className={`${styles.searchField} ${styles.projectSearch}`}><DesignIcon name="search" /><input type="search" aria-label="ابحث في المشاريع" placeholder="ابحث باسم المشروع أو المجال أو التقنية" value={search} onChange={(event) => setSearch(event.target.value)} /></div>
                <div className={styles.sortBar}>
                    <label className={styles.sortLabel}>ترتيب حسب:<select aria-label="ترتيب المشاريع" value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">الأحدث</option><option value="rating">الأعلى تقييمًا</option><option value="funding-low">الأقل تمويلًا</option><option value="funding-high">الأعلى تمويلًا</option></select></label>
                    <div className={styles.viewToggles}><button type="button" aria-label="عرض شبكي" aria-pressed={view === "grid"} onClick={() => setView("grid")}><Grid2X2 size={18} /></button><button type="button" aria-label="عرض قائمة" aria-pressed={view === "list"} onClick={() => setView("list")}><List size={18} /></button></div>
                </div>
                <p className="sr-only" role="status">{projects.length} مشاريع مطابقة</p>
                {projects.length ? <div className={`${styles.projectGrid} ${view === "list" ? styles.listView : ""}`}>{projects.map((project) => <ProjectCard key={project.id} project={project} saved={savedIds.includes(project.id)} onSave={save} onDetails={(project) => setSelection({ project })} />)}</div> : <div className={styles.empty}><EmptyState title={availableProjects.length ? "لا توجد مشاريع مطابقة" : "لا توجد مشاريع متاحة حالياً"} description={availableProjects.length ? "جرّب تغيير كلمات البحث أو الفلاتر لعرض فرص أخرى." : "ستظهر الفرص الاستثمارية هنا بمجرد نشر مشاريع جديدة على المنصة."} />{availableProjects.length > 0 && <button type="button" className={styles.resetFilters} onClick={() => { setFilters({ ...initialFilters, technologies: [] }); setSearch(""); }}>عرض جميع المشاريع</button>}</div>}
            </section>
        </div>
        <p role="status" aria-live="polite" className={styles.notice}>{notice}</p>
        <ProjectDialog selection={selection} onClose={() => setSelection(null)} />
    </div>;
}
