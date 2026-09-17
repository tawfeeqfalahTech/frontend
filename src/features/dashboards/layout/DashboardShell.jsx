"use client"

import { useState } from "react"
import Navbar from "./Navbar"
import Sidebar from "@/features/dashboards/layout/Sidebar"

const DashboardShell = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div>
            <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <main>{children}</main>
        </div>
    )
}

export default DashboardShell