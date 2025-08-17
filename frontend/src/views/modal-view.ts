import { User } from '../interfaces/user';
import { getElement } from '../utils/dom';

export function openModal(user: User): void {
 const modal = getElement<HTMLDivElement>("userModal");
 const modalBody = getElement<HTMLDivElement>("modalBody");
  if (!modal || !modalBody) return;
  modalBody.innerHTML = `
    <h2>${user.name}</h2>
    <p><strong>Телефон:</strong> ${user.phone || "-"}</p>
    <p><strong>Email:</strong> ${user.email || "-"}</p>`;
  modal.style.display = "flex";
}

export function closeModal(): void {
  const modal = getElement<HTMLDivElement>("userModal");
  if (!modal) return;
  modal.style.display = "none";
}
