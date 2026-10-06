"use client"

import dynamic from "next/dynamic"
import { memo } from "react"

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

const ApexChart = ({ options, series, type, height, width = "100%", label }) => (
    <div dir="ltr" role="img" aria-label={label} style={{ height, width }}>
        <ReactApexChart options={options} series={series} type={type} height={height} width={width} />
    </div>
)

export default memo(ApexChart)
