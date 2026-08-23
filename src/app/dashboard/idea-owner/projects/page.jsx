import OwnerCards from '@/features/dashboards/components/owner/OwnerCards'
import DashboardHeader from '@/features/dashboards/components/shared/DashboardHeader'
import OwnerTable from '@/features/dashboards/components/owner/OwnerTable'
const page = () => {
    return (
        <div className='mr-55 max-[660px]:mr-0'>
            <DashboardHeader route="مشاريعي" paragraph="إدارة وتتبع حالة المشاريع الخاصة بك" buttonLabel="مشروع جديد" />
            {/* <OwnerCards /> */}
            <div className='mt-5'>
                <OwnerTable />
            </div>
        </div>
    )
}

export default page