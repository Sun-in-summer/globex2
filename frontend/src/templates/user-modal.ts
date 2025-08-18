import { User } from '../interfaces/user';

export function userModalTemplate(user: User): string {
    return    ` <h2 class="modal-card-user">${user.name}</h2>
   <div> 
    <p><strong>Телефон:</strong> ${user.phone || "-"}</p>
    <p><strong>Почта</strong> ${user.email || "-"}</p>
    <p><strong>Дата приёма</strong> ${user.hire_date || "-"}</p>
    <p><strong>Должность</strong> ${user.position_name || "-"}</p>
    <p><strong>Подразделение</strong> ${user.department || "-"}</p>
    </div>
    <div>
    <p><strong>Дополнительная информация:</strong> </p>
    <p>${user.additionalInfo || "-"}</p>
    </div>       `;
}