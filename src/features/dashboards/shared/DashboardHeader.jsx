import { LucidePlus } from 'lucide-react'
import Link from 'next/link'
import { primaryClass } from './dashboardStyles'

const DashboardHeader = ({ route, paragraph, buttonLabel }) => {
    return (
        <div className='flex flex-wrap items-center justify-between gap-4'>
            <div className='flex min-w-0 flex-col'>
                <h1 className='text-[28px] font-semibold'>{route}</h1>
                <p className='text-[#B19971] font-semibold'>{paragraph}</p>
            </div>
            <div className='shrink-0'>
                {buttonLabel && (
                    <Link href="/dashboard/idea-owner/create-project" className={`${primaryClass} w-35`}>
                        <LucidePlus className='w-5 h-5' />
                        {buttonLabel}
                    </Link>
                )}
            </div>

        </div>
    )
}

export default DashboardHeader
