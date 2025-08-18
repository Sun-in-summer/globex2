import { fetchUsers } from '../api/user-service';
import { User } from '../interfaces/user';
import { getElement } from '../utils/dom';
import { closeModal, openModal } from '../views/modal-view';
import { showError, showLoading, showNoResults } from '../views/status-view';
import { renderUsers } from '../views/user-view';


let currentTerm = "";
let timeoutId: ReturnType<typeof setTimeout> | null = null;

export function init(): void {
  const searchInput = getElement<HTMLInputElement>("searchInput");
  const searchBtn = getElement<HTMLButtonElement>("searchBtn");
  const modal = getElement<HTMLDivElement>("userModal");
  const modalClose = getElement<HTMLButtonElement>("modalClose");

  if (!searchInput || !searchBtn || !modal || !modalClose) return;
  
  loadAndRender();

  searchInput.addEventListener("input", () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      currentTerm = searchInput.value.trim();
      loadAndRender(currentTerm);
    }, 300);
  });

  searchBtn.addEventListener("click", () => {
    currentTerm = searchInput!.value.trim();
    loadAndRender(currentTerm);
  });

  modalClose.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target === modal || target.classList.contains("modal-overlay")) {//
      closeModal();
    }
  });
    
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

async function loadAndRender(term = ""): Promise<void> {
  showLoading(true);
  showNoResults(false);
  try {
    const users = await fetchUsers(term);
    console.log(users);
    showLoading(false);
    if (users.length === 0) {
      showNoResults(true);
    } else {
        renderUsers(users);
        attachCardHandlers(users);
    }
  } catch {
    showLoading(false);
    showError("Ошибка загрузки данных");
  }
}


function attachCardHandlers(users: User[]): void {
  const userGrid = document.getElementById("userGrid");
  if (!userGrid) return;
  userGrid.querySelectorAll(".user-card").forEach((card) => {
    const id = Number((card as HTMLElement).dataset.id);
    const user = users.find((u) => u.id === id);
    if (user) {
      card.addEventListener("click", () => openModal(user));
    }
  });
}


