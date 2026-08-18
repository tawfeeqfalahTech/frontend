import OwnerCards from '../../../features/dashboards/components/owner/OwnerCards'
import OwnerLineChart from '../../../features/dashboards/components/owner/OwnerLineChart'
import OwnerPieChart from '../../../features/dashboards/components/owner/OwnerPieChart'
import OwnerTable from '../../../features/dashboards/components/owner/OwnerTable'

const page = () => {
    return (
        <div className='mr-55 max-[660px]:mr-0'>
            <OwnerCards />
            <div className='grid grid-cols-3 gap-3 mt-5'>
                <div className='col-span-1 space-y-3'>
                    <OwnerLineChart />
                    <OwnerPieChart />
                </div>
                <div className='col-span-2'>
                    <h3 className='text-[#1E4C6F] text-xl font-bold'>المشاريع الأخيرة</h3>
                    <OwnerTable />
                </div>
            </div>
        </div>
    )
}

export default page