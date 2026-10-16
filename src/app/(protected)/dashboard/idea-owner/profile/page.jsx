import OwnerProfile from "@/features/dashboards/owner/profile/OwnerProfile"

export default async function Page({ searchParams }) {
    const params = await searchParams
    return <OwnerProfile key={params?.state === "empty" ? "empty" : "default"} empty={params?.state === "empty"} />
}
