"use client"

import { useMemo } from "react"
import ApexChart from "./ApexChart"

const EvaluationScore = ({ score = 78, large = false }) => {
    const size = large ? 120 : 80
    const series = useMemo(() => [Math.min(100, Math.max(0, score))], [score])
    const options = useMemo(() => ({
        chart: { type: "radialBar", sparkline: { enabled: true }, fontFamily: "Cairo, sans-serif", animations: { enabled: true, speed: 350 } },
        colors: [large ? "#2F8F6F" : "#1E4C6F"],
        plotOptions: {
            radialBar: {
                hollow: { size: "78%", margin: 0 },
                track: { background: large ? "#FFFFFF" : "#F3F4F6", strokeWidth: "100%", margin: 0 },
                dataLabels: { show: false },
            },
        },
        stroke: { lineCap: "butt" },
        grid: { padding: { top: -8, bottom: -8, left: -8, right: -8 } },
    }), [large])

    return (
        <div className="relative shrink-0" style={{ width: size, height: size }}>
            <div className="absolute -inset-[7px]">
                <ApexChart type="radialBar" options={options} series={series} height={size + 14} width={size + 14} label={"التقييم " + score + " من 100"} />
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className={`${large ? "text-[27px] leading-[41px]" : "text-[22px] leading-8"} font-bold text-[#0D202F]`}>{score}</span>
                <span className={`${large ? "text-[13px] text-[#4B5563]" : "text-[11px] text-[#68879F]"}`}>{large && score >= 75 ? "درجة ممتازة" : "من 100"}</span>
            </div>
        </div>
    )
}

export default EvaluationScore
