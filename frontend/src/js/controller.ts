import { getElements } from './elements';
import { showLoading, showNoResults, showError } from "./status";
import { closeModal, openModal } from "./modal";
import { fetchUsers } from "./api"; 
import { User } from '../interfaces/user';



let currentTerm = "";
let timeoutId: ReturnType<typeof setTimeout> | null = null;

export function init(): void {
  const { searchInput, searchBtn, modal, modalClose } = getElements();


  if (!(searchInput instanceof HTMLInputElement)) return;
  if (!(searchBtn instanceof HTMLElement)) return;
  if (!(modal instanceof HTMLElement)) return;
  if (!(modalClose instanceof HTMLElement)) return;
  
  loadAndRender();

  searchInput?.addEventListener("input", () => {
     if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      currentTerm = searchInput.value.trim();
      loadAndRender(currentTerm);
    }, 300);
  });

  searchBtn?.addEventListener("click", () => {
    currentTerm = searchInput!.value.trim();
    loadAndRender(currentTerm);
  });

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target === modal || target.classList.contains("modal-overlay")) {
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


export function renderUsers(users: User[]): void {
  const { userGrid } = getElements();
  if (!(userGrid instanceof HTMLElement)) return;
  userGrid.innerHTML = users.map(createCardHTML).join("");
  attachCardHandlers(users);
}

function createCardHTML(user: User): string {
  return `
    <div class="user-card" data-id="${user.id}">
      <div class="user-name">${user.name}</div>
      <div class="user-contact">${user.phone || ""}</div>
      <div class="user-contact">${user.email || ""}</div>
    </div>`;
}

function attachCardHandlers(users: User[]): void {
  const { userGrid } = getElements();
  if (!(userGrid instanceof HTMLElement)) return;
  userGrid.querySelectorAll(".user-card").forEach((card) => {
    if (!(card instanceof HTMLElement)) return;
    const idStr = card.dataset.id;
    if (!idStr) return;
    const id = Number(idStr);
    const user = users.find((u) => u.id === id);
    if (user) {
      card.addEventListener("click", () => openModal(user));
    }
  });
}

