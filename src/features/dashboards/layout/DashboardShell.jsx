"use client"

import { useState } from "react"
import Navbar from "./Navbar"
import Sidebar from "@/features/dashboards/layout/Sidebar"
import LogoutConfirmModal from "./LogoutConfirmModal"
import { useAuth } from "@/contexts/AuthContext"

const DashboardShell = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

    const { Logout } = useAuth()

    const handleOpenSidebar = () => setIsSidebarOpen(true)
    const handleCloseSidebar = () => setIsSidebarOpen(false)

    const handleOpenLogoutModal = () => setIsLogoutModalOpen(true)
    const handleCloseLogoutModal = () => setIsLogoutModalOpen(false)

    const handleConfirmLogout = async () => {
        await Logout()
        setIsLogoutModalOpen(false)
    }

    return (
        <div>
            <Navbar
                onMenuClick={handleOpenSidebar}
                onLogoutClick={handleOpenLogoutModal}
            />
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={handleCloseSidebar}
                onLogoutClick={handleOpenLogoutModal}
            />
            <main>{children}</main>
            <LogoutConfirmModal
                open={isLogoutModalOpen}
                onConfirm={handleConfirmLogout}
                onCancel={handleCloseLogoutModal}
            />
        </div>
    )
}

export default DashboardShell