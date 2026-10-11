"use client";

import { AdminError } from "@/features/dashboards/admin/home/states";

export default function Error({ retry }) {
    return <AdminError onRetry={retry} />;
}
