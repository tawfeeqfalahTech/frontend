import Image from "next/image"
import EvaluationScore from "./EvaluationScore"
import EvaluationDimensionsChart from "./EvaluationDimensionsChart"

const EvaluationDetails = ({ evaluation, first = false }) => (
    <section className="rounded-[14px] bg-white p-[18px] shadow-[0_4px_29px_#1E4C6F33] sm:p-6">
        <h2 className="mb-[18px] text-[17px] font-bold leading-8 text-[#0D202F] sm:text-xl">{first ? "تفاصيل تقييم الدورة الأولى" : "تفاصيل التقييم"} — {evaluation.date}</h2>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
            <div className="flex shrink-0 flex-col items-center gap-3 rounded-[14px] bg-[#F9FAFB] p-6 lg:w-[260px]">
                <h3 className="text-xl font-semibold text-[#4B5563]">التقييم الإجمالي</h3>
                <EvaluationScore score={evaluation.score} large />
                <p className="text-[13px] text-[#9CA3AF]">تاريخ التقييم: {evaluation.date}</p>
            </div>
            <div className="min-w-0 flex-1 overflow-hidden" dir="ltr">
                <EvaluationDimensionsChart evaluation={evaluation} />
            </div>
        </div>
        {first && <div className="mt-[22px] flex items-center gap-[9px] rounded-[9px] bg-[#B8862E]/[0.06] p-[14px] text-[13px] text-[#B8862E]">
            <Image src="/images/evaluations/lightbulb-off.svg" width={18} height={18} alt="" />
            <p>أعد تقييم مشروعك لاحقاً لرؤية تطورك عبر الزمن</p>
        </div>}
    </section>
)

export default EvaluationDetails
