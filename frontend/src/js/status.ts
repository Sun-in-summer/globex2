import { getElements } from "./elements";

export function showLoading(flag: boolean): void {
  const { loading, userGrid } = getElements();
  if (!loading || !userGrid) return;
  loading.style.display = flag ? "block" : "none";
  userGrid.style.display = flag ? "none" : "grid";
}

export function showNoResults(flag: boolean): void {
  const { noResults } = getElements();
  if (!noResults) return;
  noResults.style.display = flag ? "block" : "none";
}

export function showError(message: string): void {
  const { userGrid } = getElements();
  if (!userGrid) return;
  userGrid.innerHTML = `<div class="error-message">${message}</div>`;
}
