const EvaluationHistoryTable = ({ evaluations, onViewReport }) => (
    <section className="overflow-hidden rounded-[14px] bg-white shadow-[0_4px_29px_#1E4C6F33]" aria-label="سجل التقييمات">
        <div className="overflow-x-auto" dir="ltr">
            <table className="w-full min-w-[576px] table-fixed text-center">
                <thead className="border border-[#E5E7EB] bg-[#F9FAFB] text-lg font-bold     leading-8 text-[#4B5563]">
                    <tr>{["تاريخ التقييم", "الدرجة الكلية", "الفرق", "الإجراء"].map(label => <th key={label} scope="col" className="p-[18px] font-semibold" dir="rtl">{label}</th>)}</tr>
                </thead>
                <tbody className="leading-[26px] text-[#111827]">
                    {[...evaluations].reverse().map((evaluation, index) => <tr key={evaluation.id} className="border-b border-[#E5E7EB] last:border-b-0">
                        <td className="p-[18px]" dir="rtl">{evaluation.date}</td>
                        <td className="p-[18px]"><span className="inline-block rounded-[7px] bg-[#F9FAFB] px-[11px] py-[4px]">{evaluation.score} / 100</span></td>
                        <td className="p-[18px]">{index > 0 && evaluation.difference != null ? <span className="rounded-[5px] bg-[#2F8F6F]/[0.08] px-[9px] py-[4px] font-mono text-[13px] font-bold text-[#2F8F6F]">▲+{evaluation.difference}</span> : <span className="sr-only">لا يوجد فرق معروض</span>}</td>
                        <td className="p-[18px]"><button type="button" onClick={() => onViewReport(evaluation)} className="cursor-pointer rounded font-semibold text-[#245173] hover:underline focus-visible:outline-2 focus-visible:outline-offset-[4px]" dir="rtl" aria-label={`عرض التقرير الكامل — ${evaluation.date}`}>عرض التقرير الكامل</button></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </section>
)

export default EvaluationHistoryTable
