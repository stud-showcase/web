export function getCurrentTab() {
  return window.location.pathname === "/myProjects" ? "my" : "all";
}
