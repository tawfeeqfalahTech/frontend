import DashboardHeader from '@/features/dashboards/shared/DashboardHeader'
import OwnerTable from '@/features/dashboards/owner/home/components/OwnerTable'
import { projects } from '@/features/dashboards/owner/data/projects'
const page = async ({ searchParams }) => {
    const params = await searchParams
    return (
        <div className='pr-55 max-[660px]:pr-0'>
            <DashboardHeader route="مشاريعي" paragraph="إدارة وتتبع حالة المشاريع الخاصة بك" buttonLabel="مشروع جديد" />
            <div className='mt-5'>
                <OwnerTable projects={params?.state === "empty" ? [] : projects} />
            </div>
        </div>
    )
}

export default page
