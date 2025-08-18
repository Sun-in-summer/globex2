import { User } from '../interfaces/user';
import { userCardTemplate } from '../templates/user-card';
import { getElement } from '../utils/dom';

export function renderUsers(users: User[]): void {
  const userGrid = getElement<HTMLDivElement>("userGrid");
  const noResults = getElement<HTMLDivElement>("noResults");
  if (!userGrid || !noResults) return;
  console.log(users);

  if (users.length === 0) {
    userGrid.innerHTML = "";
    userGrid.classList.add("is-hidden");
    noResults.classList.remove("is-hidden");
  } else {
    userGrid.innerHTML = users.map(userCardTemplate).join("");
    userGrid.classList.remove("is-hidden");
    noResults.classList.add("is-hidden");
 
  }

}