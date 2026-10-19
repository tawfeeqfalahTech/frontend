import { BarChart3, Bookmark, Compass, FolderOpen, HeartHandshake, Home, Sparkles, Trash2, Users } from "lucide-react";

const dashboardLinks = {
  admin: [
    { name: "التحليلات", href: "/dashboard/admin", icon: BarChart3 },
    { name: "المستخدمون", href: "/dashboard/admin/users", icon: Users },
    { name: "المشاريع", href: "/dashboard/admin#projects", icon: FolderOpen },
    { name: "تقييمات AI", href: "/dashboard/admin#ai", icon: Sparkles },
    { name: "طلبات الاهتمام", href: "/dashboard/admin#requests", icon: HeartHandshake },
  ],
  investor: [
    { name: "الرئيسية", href: "/dashboard/investor", icon: Home },
    { name: "استكشاف المشاريع", href: "/dashboard/investor/projects", icon: Compass },
    { name: "المشاريع المحفوظة", href: "/dashboard/investor/saved", icon: Bookmark },
    { name: "طلباتي", href: "/dashboard/investor/requests", icon: HeartHandshake },
  ],
  idea_owner: [
    { name: "الرئيسية", href: "/dashboard/idea-owner", icon: Home },
    { name: "مشاريعي", href: "/dashboard/idea-owner/projects", icon: FolderOpen },
    { name: "طلبات الإهتمام", href: "/dashboard/idea-owner/eoi-requests", icon: HeartHandshake },
    { name: "سلة المحذوفات", href: "/dashboard/idea-owner/deleted", icon: Trash2 },
  ],
};

export function getDashboardLinks(role) {
  return dashboardLinks[role] ?? [];
}
