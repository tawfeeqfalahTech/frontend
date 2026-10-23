import { HomeIcon } from '@/icons/HomeIcon'
import { cardSurfaceClass } from '@/features/dashboards/shared/dashboardStyles'

const OwnerCards = ({ projects = [] }) => {
    const cards = [
        { id: 1, head: "إجمالي المشاريع", value: projects.length },
        { id: 2, head: "المشاريع النشطة", value: projects.filter(project => project.status === "نشط").length },
        { id: 3, head: "قيد التقييم", value: projects.filter(project => project.evaluationStatus === "evaluating").length },
        { id: 4, head: "طلبات الاهتمام", value: projects.reduce((sum, project) => sum + (Number(project.Leads) || 0), 0) },
    ]
    return (
        <>
            <div className='grid grid-cols-4 max-[1020px]:grid-cols-2 gap-5 mt-5'>
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`${cardSurfaceClass} rounded-2xl p-5 max-[1095px]:px-3 max-[1095px]:py-5 hover:shadow-md transition-shadow duration-200`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="text-sm font-semibold text-slate-500 mb-1">
                                    {card.head}
                                </h4>
                                <span className="text-4xl font-extrabold text-slate-900 tracking-tight block">
                                    {card.value}
                                </span>
                            </div>

                            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors">
                                <HomeIcon className="w-5 h-5" />
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </>
    )
}

export default OwnerCards
