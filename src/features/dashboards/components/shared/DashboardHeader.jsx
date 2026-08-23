import { LucidePlus } from 'lucide-react'
import Link from 'next/link'

const DashboardHeader = ({ route, paragraph, buttonLabel }) => {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
                <h1 className='text-[28px] font-semibold'>{route}</h1>
                <p className='text-[#B19971] font-semibold'>{paragraph}</p>
            </div>
            <div>
                {buttonLabel && (
                    <Link href="/dashboard/idea-owner/create-project" className='flex justify-center items-center gap-1 text-sm bg-[#1E4C6F] hover:bg-[#4b708c] font-semibold text-white transition-colors duration-200 h-11 w-35 cursor-pointer rounded-lg'>
                        <LucidePlus className='w-5 h-5' />
                        {buttonLabel}
                    </Link>
                )}
            </div>

        </div>
    )
}

export default DashboardHeader