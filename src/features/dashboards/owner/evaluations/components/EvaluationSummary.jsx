import Image from "next/image"
import EvaluationScore from "./EvaluationScore"

const EvaluationSummary = ({ remaining, onReevaluate, latest }) => {
    const totalMinutes = Math.ceil(remaining / 60)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    const time = `${hours} ساعات و${minutes} دقيقة`

    return (
        <section className="flex flex-col gap-4 rounded-[14px] bg-white px-4 py-[18px] shadow-[0_4px_29px_#1E4C6F33] sm:px-5 md:flex-row md:items-center md:justify-between" aria-label="ملخص تقييم المشروع">
            <div className="flex min-w-0 items-center gap-4 max-sm:gap-3">
                <EvaluationScore score={latest.score} />
                <div className="flex min-w-0 flex-col gap-1">
                    <h2 className="text-[17px] font-bold leading-7 text-[#0D202F] sm:text-xl">مؤشر الأداء العام للمشروع</h2>
                    <p className="text-xs leading-6 text-[#68879F] sm:text-[15px]">آخر تقييم: {latest.date} — {remaining > 0 ? `التقييم التالي متاح في: ${time}` : "التقييم التالي متاح الآن"}</p>
                </div>
            </div>
            <div className="flex w-full shrink-0 flex-col items-stretch gap-2.5 sm:w-[270px]">
                {remaining > 0 && <span className="flex items-center justify-center gap-1 rounded-[7px] border border-[#B8862E] bg-[#B8862E]/[0.06] px-2 py-1 text-[11px] text-[#B8862E]">
                    <Image src="/images/evaluations/clock.svg" width={13} height={13} alt="" />
                    التقييم القادم متاح خلال {time}
                </span>}
                <button type="button" onClick={onReevaluate} disabled={remaining > 0} aria-disabled={remaining > 0} className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-[#1E4C6F] px-4 text-[17px] font-semibold text-white transition-colors duration-200 hover:bg-[#163852] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F] disabled:cursor-not-allowed disabled:bg-[#BEBEBE] disabled:text-[#575757] disabled:shadow-none disabled:hover:bg-[#BEBEBE]">
                    إعادة التقييم
                </button>
            </div>
        </section>
    )
}

export default EvaluationSummary
