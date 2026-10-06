import EvaluationsPage from "@/features/dashboards/owner/evaluations/EvaluationsPage"

export const metadata = { title: "سجل التقييمات | إحياء" }

const page = async ({ searchParams }) => {
    const params = await searchParams
    const state = ["single", "cooldown", "empty"].includes(params.state) ? params.state : "history"

    const openEmptyReport = params.report === "empty"

    return <EvaluationsPage key={`${state}-${openEmptyReport}`} state={state} openEmptyReport={openEmptyReport} />
}

export default page
