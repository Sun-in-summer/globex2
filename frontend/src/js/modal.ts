import { User } from '../interfaces/user';
import { getElements } from './elements';

export function openModal(user: User) : void {
  const { modal, modalBody } = getElements();
    if (!modal || !modalBody) return; 
  modalBody.innerHTML = `
    <h2>${user.name}</h2>
    <p><strong>Телефон:</strong> ${user.phone || "-"}</p>
    <p><strong>Email:</strong> ${user.email || "-"}</p>`;
  modal.style.display = "flex";
}

export function closeModal(): void {
   const { modal } = getElements();
   if (!modal) return;
  modal.style.display = "none";
}
