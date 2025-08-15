export function getElements() {
  return {
    searchInput: document.getElementById(
      "searchInput"
    ) as HTMLInputElement | null,
    searchBtn: document.getElementById("searchBtn") as HTMLElement | null,
    userGrid: document.getElementById("userGrid") as HTMLElement | null,
    loading: document.getElementById("loadingSpinner") as HTMLElement | null,
    noResults: document.getElementById("noResults") as HTMLElement | null,
    modal: document.getElementById("userModal") as HTMLElement | null,
    modalBody: document.getElementById("modalBody") as HTMLElement | null,
    modalClose: document.getElementById("modalClose") as HTMLElement | null,
  };
}

