import { fetchUsers } from "./api.js";
import {
  getElements,
  renderUsers,
  showLoading,
  showNoResults,
  closeModal,
} from "./ui.js";

let currentTerm = "";
let  timeoutId;

function init() {
  const { searchInput, searchBtn, modal, modalClose } = getElements();
  loadAndRender();

  searchInput.addEventListener("input", () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      currentTerm = searchInput.value.trim();
      loadAndRender(currentTerm);
    }, 300);
  });

  searchBtn.addEventListener("click", () => {
    currentTerm = searchInput.value.trim();
    loadAndRender(currentTerm);
  });

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

async function loadAndRender(term = "") {
  showLoading(true);
  showNoResults(false);
  try {
    const users = await fetchUsers(term);
    showLoading(false);
    if (users.length === 0) {
      showNoResults(true);
    } else {
      renderUsers(users);
    }
  } catch {
    showLoading(false);
    // можно вывести сообщение об ошибке
  }
}

export {init} 