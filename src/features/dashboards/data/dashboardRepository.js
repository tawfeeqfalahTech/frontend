import "server-only";
import { projects } from "../owner/data/projects";
import { projectDetails } from "../owner/project/projectDetails";
import { getEvaluationProject } from "../owner/evaluations/data/evaluationReport";
import { initialRequests as ownerRequests } from "../owner/interest-requests/data/mockRequests";
import { initialRequests as investorRequests } from "../investor/requests/data";
import { getDashboardData } from "../investor/home/data";
import { getAdminDashboardData } from "../admin/home/data";
import { demoUsers } from "../admin/users/data";

// Temporary fixture adapter. Replace these functions with authenticated backend
// requests once the endpoints and response contracts are available. Failed reads
// must throw; only a successful response with an empty list means "empty".
export async function getOwnerProjects() {
    return projects;
}

export async function getOwnerOverview() {
    return {
        projects: await getOwnerProjects(),
        interestHistory: [24, 40, 18, 32, 55, 48, 70],
    };
}

export async function getOwnerProject(projectId = projectDetails.id) {
    const evaluationProject = getEvaluationProject(projectId);
    if (!evaluationProject) return null;
    const summary = projects.find(project => project.id === projectId);
    return {
        ...projectDetails,
        id: evaluationProject.id,
        title: evaluationProject.name,
        reports: evaluationProject.reports,
        isSanad: evaluationProject.isSanad,
        evaluationStatus: summary?.evaluationStatus ?? "completed",
        evaluation: evaluationProject.reports.length ? { ...projectDetails.evaluation, score: evaluationProject.reports.at(-1).score } : null,
        nextEvaluationAt: null,
        images: [{ id: "cover", url: projectDetails.cover, name: "صورة الغلاف", isCover: true }],
    };
}

export async function getOwnerProfile(user) {
    const account = user?.data?.user ?? user?.data ?? user?.user ?? user;
    const profile = account?.owner_profile;
    return {
        name: account?.name || "صاحب الفكرة",
        avatar: account?.avatar_url || "/images/avatar.png",
        bio: profile?.bio || "",
        skills: profile?.skills ?? [],
        links: profile?.links ?? [],
        sessions: account?.sessions ?? [],
    };
}

export async function getOwnerRequests() { return ownerRequests; }
export async function getInvestorRequests() { return investorRequests; }
export async function getInvestorDashboard() { return getDashboardData(); }
export async function getAdminDashboard() { return getAdminDashboardData(); }
export async function getAdminUsers() { return demoUsers; }
