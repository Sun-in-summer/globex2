import { User } from '../interfaces/user';
import { userModalTemplate } from '../templates/user-modal';
import { getElement } from '../utils/dom';

export function openModal(user: User): void {
 const modal = getElement<HTMLDivElement>("userModal");
 const modalBody = getElement<HTMLDivElement>("modalBody");
  if (!modal || !modalBody) return;
  modalBody.innerHTML = userModalTemplate(user);
  modal.classList.add("is-open");
}

export function closeModal(): void {
  const modal = getElement<HTMLDivElement>("userModal");
  if (!modal) return;
  modal.classList.remove("is-open");
}
