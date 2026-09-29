"use client"
import DeleteConfirmModal from '@/features/dashboards/owner/delete-project/DeleteConfirmModal'
import RestoreProjectSuccessModal from '@/features/dashboards/owner/delete-project/RestoreProjectSuccessModal'
import DashboardHeader from '@/features/dashboards/shared/DashboardHeader'
import { Clock } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const Page = () => {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showRestoreProjectSuccessModal, setShowRestoreProjectSuccessModal] = useState(false)

    const projects = [
        { id: 1, title: "مشروع تطبيق تدوير لإعادة تصنيع النفايات الصلبة", time: 17, img: "/images/Rectangle 16.png", t: "project" },
        { id: 2, title: "مشروع تطبيق تدوير لإعادة تصنيع النفايات الصلبة", time: 1, img: "/images/Rectangle 16.png", t: "project" },
    ]
    return (
        <main className='px-60 py-6'>
            <DashboardHeader route="سلة المحذوفات" paragraph="المشاريع المحذوفة تُحفظ هنا 30 يوما قبل حذفها نهائياً" />
            <section className='mt-5 flex flex-col space-y-3'>
                {projects.map((pro) => (

                    <div key={pro.id} className='bg-white shadow-lg border border-slate-100 p-2.5 rounded-xl w-full grid grid-cols-2 justify-between'>
                        <div className='flex items-center gap-3'>

                            <div className="w-full relative lg:w-40 h-28 rounded-xl overflow-hidden shrink-0 shadow-sm bg-slate-900">
                                <Image
                                    alt={pro.t}
                                    src={pro.img}
                                    fill
                                    priority
                                    unoptimized
                                    className="absolute object-cover"
                                />
                            </div>
                            <div className='flex flex-col justify-between h-full py-1.5'>
                                <h2 className='font-bold text-xl w-full'>{pro.title}</h2>
                                <div className='px-2.5 h-7 rounded-md flex items-center gap-1.5 w-fit text-[#4B708C] bg-[#E9EDF1]'>
                                    <Clock size={13.5} />
                                    <p className='text-xs'>
                                        متبقي <span>{pro.time}</span> يوم للإسترجاع
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col justify-center-safe items-end gap-3'>
                            <button onClick={() => setShowRestoreProjectSuccessModal(true)} className="bg-[#1E4C6F] w-85 text-white text-lg h-11 rounded-xl cursor-pointer hover:-translate-y-0.5 hover:bg-[#163852] transition-all duration-300">

                                إسترجاع
                            </button>
                            <button onClick={() => setShowDeleteModal(true)} className="bg-transparent w-85 text-red-600 border border-red-600 text-lg h-11 rounded-xl cursor-pointer hover:-translate-y-0.5 hover:bg-red-50 transition-all duration-300">

                                حذف نهائي
                            </button>
                        </div>

                    </div>
                ))}
            </section>
            <DeleteConfirmModal
                open={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
            />
            *   <RestoreProjectSuccessModal
                open={showRestoreProjectSuccessModal}
                title="تم استرجاع المشروع بنجاح"
                onContinue={() => setShowRestoreProjectSuccessModal(false)}
            />
        </main>
    )
}

export default Page