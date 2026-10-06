"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { useAuth } from "@/contexts/AuthContext";

const emptyAccount = {};

const subscribe = (callback) => {
  window.addEventListener("storage", callback);
  window.addEventListener("investor-profile-updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("investor-profile-updated", callback);
  };
};

export default function useInvestorProfile() {
  const { user } = useAuth();
  const account = user?.data?.user ?? user?.data ?? user?.user ?? user ?? emptyAccount;
  const key = `ihyaa:investor-profile:${account.id ?? account.email ?? "current"}`;
  const getSnapshot = useCallback(() => {
    try { return localStorage.getItem(key); } catch { return null; }
  }, [key]);
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const profile = useMemo(() => {
    const initial = {
      name: account.name || "المستثمر",
      bio: "",
      investmentType: "",
      minInvestment: "",
      maxInvestment: "",
      sectors: [],
      links: { website: "", linkedin: "", github: "" },
      avatar: account.avatar_url || "/images/avatar.png",
    };
    try {
      const saved = raw ? JSON.parse(raw) : account.investor_profile;
      if (!saved || typeof saved !== "object") return initial;
      return { ...initial, ...saved, sectors: Array.isArray(saved.sectors) ? saved.sectors : [], links: { ...initial.links, ...saved.links } };
    } catch { return initial; }
  }, [raw, account]);
  const save = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("investor-profile-updated"));
  };
  return { profile, save, email: account.email || "" };
}
