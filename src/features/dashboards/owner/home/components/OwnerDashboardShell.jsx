"use client"

import { useState } from "react"
import OwnerNavbar from "../../../layout/Navbar"
import OwnerSidebar from "../../../layout/Sidebar"

const OwnerDashboardShell = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen flex flex-col">
            <OwnerNavbar onMenuClick={() => setIsSidebarOpen(true)} />
            <OwnerSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <main className="flex-1 p-6 max-[660px]:p-4">{children}</main>
        </div>
    )
}

export default OwnerDashboardShell