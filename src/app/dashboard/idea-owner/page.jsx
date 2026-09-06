import OwnerCards from '../../../features/dashboards/owner/home/components/OwnerCards'
import OwnerLineChart from '../../../features/dashboards/owner/home/components/OwnerLineChart'
import OwnerPieChart from '../../../features/dashboards/owner/home/components/OwnerPieChart'
import OwnerTable from '../../../features/dashboards/owner/home/components/OwnerTable'
import DashboardHeader from '../../../features/dashboards/shared/DashboardHeader'

const page = () => {
    return (
        <div className='mr-55 max-[660px]:mr-0'>
            <DashboardHeader route="الرئيسية" paragraph="مرحبا بك مجدداً, إليك نظرة عامة على مشاريعك" buttonLabel="مشروع جديد" />
            <OwnerCards />
            <div className='grid grid-cols-4 gap-3 mt-5'>
                <div className='col-span-2'>
                    <OwnerLineChart />
                </div>
                <div className='col-span-2'>
                    <OwnerPieChart />
                </div>
                <div className='col-span-4'>
                    <OwnerTable slice={3} />
                </div>
            </div>
        </div>
    )
}

export default page