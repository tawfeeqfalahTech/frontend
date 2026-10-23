import { requierRole } from "@/lib/auth";
import DashboardHeader from '@/features/dashboards/shared/DashboardHeader'
import OwnerTable from '@/features/dashboards/owner/home/components/OwnerTable'
import { getOwnerProjects } from '@/features/dashboards/data/dashboardRepository'
const page = async () => {
    await requierRole("idea_owner");
    const projects = await getOwnerProjects()
    return (
        <div className='pr-55 max-[660px]:pr-0'>
            <DashboardHeader route="مشاريعي" paragraph="إدارة وتتبع حالة المشاريع الخاصة بك" buttonLabel="مشروع جديد" />
            <div className='mt-5'>
                <OwnerTable projects={projects} />
            </div>
        </div>
    )
}

export default page
