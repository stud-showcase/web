export function getCurrentTab() {
  return window.location.pathname === "/admin/myApplications" ? "my" : "all";
}
