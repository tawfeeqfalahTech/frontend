import OwnerCards from "@/features/dashboards/owner/home/components/OwnerCards"
import OwnerLineChart from "@/features/dashboards/owner/home/components/OwnerLineChart"
import OwnerPieChart from "@/features/dashboards/owner/home/components/OwnerPieChart"
import OwnerTable from "@/features/dashboards/owner/home/components/OwnerTable"
import DashboardHeader from "@/features/dashboards/shared/DashboardHeader"
import { projects } from "@/features/dashboards/owner/data/projects"

export default async function Page({ searchParams }) {
    const params = await searchParams
    const dashboardProjects = params?.state === "empty" ? [] : projects

    return (
        <div className="min-w-0 pr-55 text-[#0D202F] max-[660px]:pr-0" dir="rtl">
            <DashboardHeader route="الرئيسية" paragraph="مرحباً بك مجدداً، إليك نظرة عامة على مشاريعك" buttonLabel="مشروع جديد" />
            <OwnerCards projects={dashboardProjects} />
            <div className="mt-5 grid min-w-0 grid-cols-1 items-stretch gap-3 min-[1100px]:grid-cols-2">
                <OwnerLineChart empty={dashboardProjects.length === 0} />
                <OwnerPieChart empty={dashboardProjects.length === 0} />
            </div>
            <div className="mt-5 min-w-0">
                <OwnerTable slice={4} projects={dashboardProjects} />
            </div>
        </div>
    )
}
