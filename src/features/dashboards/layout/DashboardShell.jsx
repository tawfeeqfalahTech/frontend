"use client"

import { useRef, useState } from "react"
import Navbar from "./Navbar"
import Sidebar from "@/features/dashboards/layout/Sidebar"
import LogoutConfirmModal from "./LogoutConfirmModal"
import { useAuth } from "@/contexts/AuthContext"

const DashboardShell = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const logoutInProgress = useRef(false)

    const { Logout, user } = useAuth()

    const handleOpenSidebar = () => setIsSidebarOpen(true)
    const handleCloseSidebar = () => setIsSidebarOpen(false)

    const handleOpenLogoutModal = () => setIsLogoutModalOpen(true)
    const handleCloseLogoutModal = () => {
        if (!logoutInProgress.current) setIsLogoutModalOpen(false)
    }

    const handleConfirmLogout = async () => {
        if (logoutInProgress.current) return
        logoutInProgress.current = true
        setIsLoggingOut(true)
        try {
            await Logout()
            setIsLogoutModalOpen(false)
        } finally {
            logoutInProgress.current = false
            setIsLoggingOut(false)
        }
    }

    return (
        <div>
            <Navbar
                user={user?.data?.user ?? user?.data ?? user?.user ?? user}
                onMenuClick={handleOpenSidebar}
                onLogoutClick={handleOpenLogoutModal}
            />
            {isSidebarOpen && <button type="button" aria-label="إغلاق القائمة" onClick={handleCloseSidebar} className="fixed inset-0 z-40 bg-[#0D202F]/35 min-[660px]:hidden" />}
            <Sidebar
                role={user?.role ?? user?.data?.role ?? user?.data?.user?.role ?? user?.user?.role}
                isOpen={isSidebarOpen}
                onClose={handleCloseSidebar}
                onLogoutClick={handleOpenLogoutModal}
            />
            <main>{children}</main>
            <LogoutConfirmModal
                open={isLogoutModalOpen}
                loading={isLoggingOut}
                onConfirm={handleConfirmLogout}
                onCancel={handleCloseLogoutModal}
            />
        </div>
    )
}

export default DashboardShell
