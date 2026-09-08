export function getDashboardPath(role) {
  switch (role) {
    case "idea-owner":
      return "/dashboard/idea-owner";

    case "investor":
      return "/dashboard/investor";

    case "admin":
      return "/dashboard/admin";

    default:
      return "/";
  }
}
