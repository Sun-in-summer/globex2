import { getElement } from "../utils/dom";

export function showLoading(flag: boolean): void {
  const loading = getElement<HTMLDivElement>("loadingSpinner");
  const userGrid = getElement<HTMLDivElement>("userGrid");
  if (!loading || !userGrid) return;

  loading.style.display = flag ? "block" : "none";
  userGrid.style.display = flag ? "none" : "grid";
}

export function showNoResults(flag: boolean): void {
  const noResults = getElement<HTMLDivElement>("noResults");
  if (noResults) noResults.style.display = flag ? "block" : "none";
}

export function showError(msg: string): void {
  const userGrid = getElement<HTMLDivElement>("userGrid");
  if (userGrid) userGrid.innerHTML = `<div class="error-message">${msg}</div>`;
}
