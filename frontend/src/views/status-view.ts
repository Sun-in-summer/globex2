import { getElement } from "../utils/dom";

  const loading = getElement<HTMLDivElement>("loadingSpinner");
  const userGrid = getElement<HTMLDivElement>("userGrid");
  const noResults = getElement<HTMLDivElement>("noResults");

export function showLoading(flag: boolean): void {

 if (!loading || !userGrid) return;
 loading.classList.toggle("is-hidden", !flag);
  userGrid.classList.toggle("is-hidden", flag);
   noResults?.classList.add("is-hidden");
}

export function showNoResults(flag: boolean): void {

  if (!noResults) return;
  "NO RES";
  userGrid?.classList.add("is-hidden");
  noResults.classList.remove("is-hidden");
}

export function showError(msg: string): void {
  if (userGrid) userGrid.innerHTML = `<div class="error-message">${msg}</div>`;
}
