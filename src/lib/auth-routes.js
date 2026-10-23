export function getUserRole(user) {
  return user?.data?.user?.role ?? user?.data?.role ?? user?.user?.role ?? user?.role;
}

export function getDashboardPath(role) {
  switch (role) {
    case "idea_owner":
      return "/dashboard/idea-owner";

    case "investor":
      return "/dashboard/investor";

    case "admin":
      return "/dashboard/admin";

    default:
      return "/";
  }
}
