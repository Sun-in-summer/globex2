import { User } from '../interfaces/user';
import { getElement } from '../utils/dom';

export function renderUsers(users: User[]): void {
  const userGrid = getElement<HTMLDivElement>("userGrid");
  if (!userGrid ) return;
  userGrid.innerHTML = users.map(createCardHTML).join("");
 
}

function createCardHTML(user: User): string {
  return `
    <div class="user-card" data-id="${user.id}">
      <div class="user-name">${user.name}</div>
      <div class="user-contact">${user.phone || ""}</div>
      <div class="user-contact">${user.email || ""}</div>
    </div>`;
}

