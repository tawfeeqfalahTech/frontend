import { HomeIcon } from '@/icons/HomeIcon'

const OwnerCards = () => {
    const cards = [
        { id: 1, head: "إجمالي المشاريع", value: "24", icon: <HomeIcon />, span: "12" },
        { id: 2, head: "إجمالي المشاريع", value: "24", icon: <HomeIcon />, span: "12" },
        { id: 3, head: "إجمالي المشاريع", value: "24", icon: <HomeIcon />, span: "12" },
        { id: 4, head: "إجمالي المشاريع", value: "24", icon: <HomeIcon />, span: "12" },
    ]
    return (
        <>
            <div className='grid grid-cols-4 max-[1020px]:grid-cols-2 gap-5 mt-5'>
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="bg-white rounded-2xl p-5 max-[1095px]:px-3 max-[1095px]:py-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="text-sm font-semibold text-slate-500 mb-1">
                                    إجمالي المشاريع
                                </h4>
                                <span className="text-4xl font-extrabold text-slate-900 tracking-tight block">
                                    24
                                </span>
                            </div>

                            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors">
                                <HomeIcon className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold">
                                {card.span}%
                            </span>
                            <span>عن الشهر الماضي</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default OwnerCards