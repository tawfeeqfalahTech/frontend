"use client";

import { useState, useMemo } from "react";
import Navbar from "@/features/landing/Navbar";
import Footer from "@/features/landing/Footer";
import DevQuickAccess from "@/features/landing/DevQuickAccess";
import ExploreProjectCard from "@/features/explore/ExploreProjectCard";
import ExploreFiltersSidebar from "@/features/explore/ExploreFiltersSidebar";
import { Search, Grid, List, ChevronDown, SlidersHorizontal, Sparkles } from "lucide-react";

const initialProjects = [
  {
    id: "1",
    category: "تجارة",
    title: "مشروع إدارة المتاجر",
    description: "هو مشروع قائم على إدارة المخزون التجاري والصادر والوارد وتوقع نفاد البضائع باستخدام خوارزميات التنبؤ.",
    score: "80/100",
    ratingNum: 80,
    progress: 80,
    supporters: "5 داعمين",
    target: "$4,000",
    targetNum: 4000,
    domain: "العقارات",
    status: "يحتاج تمويل",
    technologies: ["React", "Laravel"],
    image: "/images/landing/idea-cover.png",
  },
  {
    id: "2",
    category: "تقنية مالية",
    title: "منصة المدفوعات السريعة",
    description: "بوابة دفع إلكتروني مخصصة للتجار والمتاجر المتوسطة مع تسوية فورية للعمليات ونظام فوترة ذكي.",
    score: "92/100",
    ratingNum: 92,
    progress: 92,
    supporters: "14 داعماً",
    target: "$12,500",
    targetNum: 12500,
    domain: "التقنية المالية",
    status: "يحتاج تطوير",
    technologies: ["React", "Python", "AI/ML"],
    image: "/images/landing/idea-cover.png",
  },
  {
    id: "3",
    category: "صحة ورعاية",
    title: "منظومة العيادات الافتراضية",
    description: "حل رقمي شامل لحجز المواعيد والاستشارات الطبية المباشرة وأرشفة التقارير الصحية السحابية.",
    score: "85/100",
    ratingNum: 85,
    progress: 85,
    supporters: "9 داعمين",
    target: "$8,000",
    targetNum: 8000,
    domain: "الصحة",
    status: "يحتاج تمويل",
    technologies: ["Flutter", "Laravel"],
    image: "/images/landing/idea-cover.png",
  },
  {
    id: "4",
    category: "لوجستيات",
    title: "تطبيق التوصيل التشاركي الذكي",
    description: "خوارزمية لتجميع شحنات المتاجر وتوزيعها بالمسار الأمثل لتخفيض تكلفة الوقود وزمن التوصيل.",
    score: "78/100",
    ratingNum: 78,
    progress: 78,
    supporters: "7 داعمين",
    target: "$6,500",
    targetNum: 6500,
    domain: "اللوجستيات",
    status: "يحتاج تطوير",
    technologies: ["Swift", "Python"],
    image: "/images/landing/idea-cover.png",
  },
  {
    id: "5",
    category: "تعليم",
    title: "أكاديمية الذكاء الاصطناعي للأطفال",
    description: "منهج تعليمي تفاعلي مبسط لتعليم التفكير المنطقي والبرمجة باللعب والتمارين الحية.",
    score: "88/100",
    ratingNum: 88,
    progress: 88,
    supporters: "11 داعماً",
    target: "$5,000",
    targetNum: 5000,
    domain: "التعليم",
    status: "مكتمل",
    technologies: ["React", "AI/ML"],
    image: "/images/landing/idea-cover.png",
  },
  {
    id: "6",
    category: "تجارة",
    title: "سوق المنتجات المحلية والحرفية",
    description: "ربط الحرفيين المحليين بأسواق التصدير مع فحص الجودة وتأمين المعاملات والمدفوعات.",
    score: "82/100",
    ratingNum: 82,
    progress: 82,
    supporters: "6 داعمين",
    target: "$3,800",
    targetNum: 3800,
    domain: "العقارات",
    status: "يحتاج تمويل",
    technologies: ["Laravel", "Flutter"],
    image: "/images/landing/idea-cover.png",
  },
  {
    id: "7",
    category: "صحة ورعاية",
    title: "تحليل الأشعة والتشخيص المبكر",
    description: "نموذج رؤية حاسوبية لمساعدة الأطباء في رصد التغيرات الدقيقة في صور الرنين والأشعة السينية.",
    score: "95/100",
    ratingNum: 95,
    progress: 95,
    supporters: "19 داعماً",
    target: "$25,000",
    targetNum: 25000,
    domain: "الصحة",
    status: "يحتاج تمويل",
    technologies: ["Python", "AI/ML"],
    image: "/images/landing/idea-cover.png",
  },
  {
    id: "8",
    category: "تقنية مالية",
    title: "إدارة الفواتير والاشتراكات المتكررة",
    description: "منصة ذكية للشركات الناشئة لمتابعة المصاريف الشهرية وتحسين الإنفاق والتنبؤ بالسيولة.",
    score: "76/100",
    ratingNum: 76,
    progress: 76,
    supporters: "4 داعمين",
    target: "$4,200",
    targetNum: 4200,
    domain: "التقنية المالية",
    status: "مكتمل",
    technologies: ["React", "Laravel"],
    image: "/images/landing/idea-cover.png",
  },
  {
    id: "9",
    category: "لوجستيات",
    title: "إدارة المخازن المبردة والمواد الحساسة",
    description: "أجهزة استشعار إنترنت الأشياء متصلة بسحابة تنبيه فوري لأي تغير في درجات الحرارة والرطوبة.",
    score: "89/100",
    ratingNum: 89,
    progress: 89,
    supporters: "13 داعماً",
    target: "$15,000",
    targetNum: 15000,
    domain: "اللوجستيات",
    status: "يحتاج تطوير",
    technologies: ["Python", "Flutter"],
    image: "/images/landing/idea-cover.png",
  },
];

const domainsList = [
  { name: "الصحة", count: 42 },
  { name: "التقنية المالية", count: 35 },
  { name: "التعليم", count: 28 },
  { name: "العقارات", count: 22 },
  { name: "اللوجستيات", count: 18 },
];

const techList = ["React", "Laravel", "Flutter", "AI/ML", "Python", "Swift"];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState("latest"); // 'latest' | 'rating' | 'funding'
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [filters, setFilters] = useState({
    selectedDomains: [],
    selectedStatuses: [],
    selectedTechs: [],
    minRating: 0,
    maxFunding: 5000000,
  });

  const handleResetFilters = () => {
    setFilters({
      selectedDomains: [],
      selectedStatuses: [],
      selectedTechs: [],
      minRating: 0,
      maxFunding: 5000000,
    });
    setSearchQuery("");
  };

  // Filtered and Sorted Projects
  const filteredProjects = useMemo(() => {
    return initialProjects
      .filter((project) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = project.title.toLowerCase().includes(q);
          const matchDesc = project.description.toLowerCase().includes(q);
          const matchCategory = project.category.toLowerCase().includes(q);
          const matchTech = project.technologies?.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchCategory && !matchTech) return false;
        }

        // Domain filter
        if (filters.selectedDomains.length > 0) {
          if (!filters.selectedDomains.includes(project.domain)) return false;
        }

        // Status filter
        if (filters.selectedStatuses.length > 0) {
          if (!filters.selectedStatuses.includes(project.status)) return false;
        }

        // Tech filter
        if (filters.selectedTechs.length > 0) {
          const hasSelectedTech = project.technologies?.some((t) =>
            filters.selectedTechs.includes(t)
          );
          if (!hasSelectedTech) return false;
        }

        // Min rating
        if (project.ratingNum < filters.minRating) return false;

        // Max funding
        if (project.targetNum > filters.maxFunding) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.ratingNum - a.ratingNum;
        if (sortBy === "funding") return b.targetNum - a.targetNum;
        return Number(b.id) - Number(a.id); // latest
      });
  }, [searchQuery, filters, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-[#9E7F4D] selection:text-white">
      {/* 1. Shared Navigation */}
      <Navbar />

      {/* 2. Main Explore Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Top Search Bar */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="ابحث عن تقنية، مجال، أو فكرة مشروع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pr-12 pl-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm text-sm sm:text-base text-right focus:outline-none focus:ring-2 focus:ring-[#1E4C6F] focus:border-transparent transition-all"
          />
          <Search className="size-5 text-[#4B708C] absolute top-4.5 right-4 pointer-events-none" />
        </div>

        {/* Action Controls & Sort Bar */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-[0px_4px_10px_rgba(104,135,159,0.06)] flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: View Mode Toggle & Mobile Filter Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-[#1E4C6F]"
            >
              <SlidersHorizontal className="size-3.5" />
              <span>الفلاتر</span>
            </button>

            <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-white text-[#1E4C6F] shadow-sm" : "text-slate-400 hover:text-slate-700"
                }`}
                aria-label="عرض قائمة"
              >
                <List className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-white text-[#1E4C6F] shadow-sm" : "text-slate-400 hover:text-slate-700"
                }`}
                aria-label="عرض شبكة"
              >
                <Grid className="size-4" />
              </button>
            </div>
          </div>

          {/* Right: Results Count & Sort Dropdown */}
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <span className="text-slate-500 font-medium">
              تم العثور على <strong className="text-[#0D202F] font-bold font-sans">{filteredProjects.length}</strong> فرصة
            </span>

            <div className="flex items-center gap-2 text-[#4B708C]">
              <span>ترتيب حسب:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="font-bold text-[#0D202F] bg-transparent border-0 focus:ring-0 cursor-pointer text-xs sm:text-sm"
              >
                <option value="latest">الأحدث</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="funding">الأعلى تمويلاً</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="flex flex-col lg:flex-row-reverse items-start gap-8">
          
          {/* Right Sidebar: Filters (Hidden on small screens unless toggled) */}
          <div className={`w-full lg:w-72 shrink-0 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
            <ExploreFiltersSidebar
              filters={filters}
              setFilters={setFilters}
              domainsList={domainsList}
              techList={techList}
              onReset={handleResetFilters}
            />
          </div>

          {/* Left Area: Project Cards Grid */}
          <div className="flex-1 w-full space-y-6">
            {filteredProjects.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
                <div className="size-16 rounded-full bg-[#E9EDF1] text-[#1E4C6F] flex items-center justify-center mx-auto">
                  <Sparkles className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0D202F]">
                  لا توجد نتائج تطابق معايير البحث الحالية
                </h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                  جرب تقليل الفلاتر المحددة أو إدخال كلمات بحث عامة للوصول للمشاريع المطلوبة.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#1E4C6F] text-white text-xs font-bold hover:bg-[#15364F] transition-all"
                >
                  إعادة تعيين كافة الفلاتر
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {filteredProjects.map((project) => (
                  <ExploreProjectCard
                    key={project.id}
                    project={project}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Dev Floating Helper */}
      <DevQuickAccess />
    </div>
  );
}
