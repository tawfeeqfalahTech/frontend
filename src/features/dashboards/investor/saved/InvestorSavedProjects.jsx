"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useInvestorProfile from "../profile/useInvestorProfile";
import useSavedProjects from "../home/useSavedProjects";
import { ProjectCard, ProjectDialog } from "../home/components";
import { SavedProjectsEmpty, SavedProjectsError, SavedProjectsLayout, SavedProjectsLoading } from "./SavedProjectsStates";
import styles from "./SavedProjects.module.css";

export default function InvestorSavedProjects({ data, previewState = "" }) {
    const { email } = useInvestorProfile();
    const availableProjects = data.projects;
    const seed = previewState === "complete" ? availableProjects.slice(0, 8).map((project) => project.id) : data.savedIds;
    const { ids, toggle } = useSavedProjects(seed, email || "current", Boolean(previewState));
    const [selection, setSelection] = useState(null);
    const [notice, setNotice] = useState("");
    const [saveError, setSaveError] = useState("");
    const [removedProject, setRemovedProject] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    const projects = ids.map((id) => availableProjects.find((project) => project.id === id)).filter(Boolean);

    const remove = (id) => {
        try {
            toggle(id);
            setRemovedProject(availableProjects.find((project) => project.id === id));
            setNotice("تمت إزالة المشروع من المحفوظات");
            setSaveError("");
        } catch {
            setSaveError("تعذر إلغاء حفظ المشروع. تحقق من إعدادات التخزين في المتصفح وحاول مجددًا.");
        }
    };
    const undo = () => {
        try {
            if (!ids.includes(removedProject.id)) toggle(removedProject.id);
            setNotice("تمت إعادة المشروع إلى المحفوظات");
            setRemovedProject(null);
            setSaveError("");
        } catch {
            setSaveError("تعذر استعادة المشروع. تحقق من إعدادات التخزين في المتصفح وحاول مجددًا.");
        }
    };

    if (previewState === "loading") return <SavedProjectsLoading />;

    return <SavedProjectsLayout>
        {previewState === "error" ? <SavedProjectsError onRetry={() => router.replace(pathname, { scroll: false })} /> : <>
            {projects.length ? <div className={styles.grid}>
                {projects.map((project) => <ProjectCard key={project.id} project={project} saved onSave={remove} onDetails={(project) => setSelection({ project })} />)}
            </div> : <SavedProjectsEmpty />}
            <div className={styles.feedback}>
                <p role="status" aria-live="polite">{notice}</p>
                {removedProject && <button type="button" className={styles.undo} aria-label={`التراجع عن إزالة ${removedProject.title}`} onClick={undo}>تراجع</button>}
            </div>
            {saveError && <p role="alert" className={styles.saveError}>{saveError}</p>}
            <ProjectDialog selection={selection} onClose={() => setSelection(null)} />
        </>}
    </SavedProjectsLayout>;
}
