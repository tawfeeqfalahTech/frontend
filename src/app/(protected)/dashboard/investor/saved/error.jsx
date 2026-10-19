"use client";

import { SavedProjectsError, SavedProjectsLayout } from "@/features/dashboards/investor/saved/SavedProjectsStates";

export default function Error({ retry }) {
    return <SavedProjectsLayout><SavedProjectsError onRetry={retry} /></SavedProjectsLayout>;
}
