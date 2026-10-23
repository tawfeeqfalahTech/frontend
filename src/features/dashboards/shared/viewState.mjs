// State comes from service data. URL parameters never participate in these rules.
export function getEvaluationStatus({ status, result } = {}) {
    if (status === "queued" || status === "evaluating") return "evaluating";
    if (status === "failed") return "failed";
    if (result && Number.isFinite(result.score)) return "completed";
    return "unevaluated";
}

export function getEvaluationHistoryView(reports = []) {
    return reports.length === 0 ? "empty" : reports.length === 1 ? "single" : "history";
}

export function getRemainingSeconds(nextEvaluationAt, now = Date.now()) {
    const deadline = Date.parse(nextEvaluationAt);
    return Number.isFinite(deadline) ? Math.max(0, Math.ceil((deadline - now) / 1000)) : 0;
}

export function isInvestorProfileComplete(profile) {
    if (profile.minInvestment == null || profile.maxInvestment == null) return false;
    const min = Number(profile.minInvestment);
    const max = Number(profile.maxInvestment);
    return Boolean(profile.investmentType && String(profile.minInvestment).trim() && String(profile.maxInvestment).trim()
        && Number.isFinite(min) && Number.isFinite(max) && min >= 0 && max >= min
        && profile.bio?.trim() && profile.sectors?.length);
}
