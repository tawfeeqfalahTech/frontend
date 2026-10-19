"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/features/dashboards/layout/Navbar";
import LogoutConfirmModal from "@/features/dashboards/layout/LogoutConfirmModal";

export default function ExploreNavbar({ role }) {
  const { user, Logout } = useAuth();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const logoutInProgress = useRef(false);
  const account = user?.data?.user ?? user?.data ?? user?.user ?? user;

  async function handleLogout() {
    if (logoutInProgress.current) return;
    logoutInProgress.current = true;
    setIsLoggingOut(true);
    try {
      await Logout();
      setIsLogoutOpen(false);
    } finally {
      logoutInProgress.current = false;
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      <Navbar standalone user={account} role={role} onLogoutClick={() => setIsLogoutOpen(true)} />
      <LogoutConfirmModal
        open={isLogoutOpen}
        loading={isLoggingOut}
        onConfirm={handleLogout}
        onCancel={() => { if (!logoutInProgress.current) setIsLogoutOpen(false); }}
      />
    </>
  );
}
