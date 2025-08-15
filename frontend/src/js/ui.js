export function getElements() {
  return {
    searchInput: document.getElementById("searchInput"),
    searchBtn: document.getElementById("searchBtn"),
    userGrid: document.getElementById("userGrid"),
    loading: document.getElementById("loadingSpinner"),
    noResults: document.getElementById("noResults"),
    modal: document.getElementById("userModal"),
    modalBody: document.getElementById("modalBody"),
    modalClose: document.getElementById("modalClose"),
  };
}

export function renderUsers(users) {
  const { userGrid } = getElements();
  userGrid.innerHTML = users.map(createCardHTML).join("");
  attachCardHandlers(users);
}

function createCardHTML(user) {
  return `
    <div class="user-card" data-id="${user.id}">
      <div class="user-name">${user.name}</div>
      <div class="user-contact">${user.phone || ""}</div>
      <div class="user-contact">${user.email || ""}</div>
    </div>`;
}

function attachCardHandlers(users) {
  const { userGrid } = getElements();
  userGrid.querySelectorAll(".user-card").forEach((card) => {
    const id = +card.dataset.id;
    const user = users.find((u) => u.id === id);
    card.addEventListener("click", () => openModal(user));
  });
}

export function showLoading(flag) {
  const { loading, userGrid } = getElements();
  loading.style.display = flag ? "block" : "none";
  userGrid.style.display = flag ? "none" : "grid";
}

export function showNoResults(flag) {
  getElements().noResults.style.display = flag ? "block" : "none";
}

export function openModal(user) {
  const { modal, modalBody } = getElements();
  modalBody.innerHTML = `
    <h2>${user.name}</h2>
    <p><strong>Телефон:</strong> ${user.phone || "-"}</p>
    <p><strong>Email:</strong> ${user.email || "-"}</p>`;
  modal.style.display = "flex";
}

export function closeModal() {
  getElements().modal.style.display = "none";
}
