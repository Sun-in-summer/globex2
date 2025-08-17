import { ApiResponse } from "../interfaces/api";
import { User } from "../interfaces/user";

const API_BASE = "http://localhost:3000";

export async function fetchUsers(term = ""): Promise<User[]> {
  const url = term ? `${API_BASE}?term=${encodeURIComponent(term)}` : API_BASE;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Ошибка ${res.status}`);

  const data: ApiResponse<User[]> | User[] = await res.json();
  if (Array.isArray(data)) {
    return data;
  }

  if (data.success && data.data) {
    return data.data;
  }

  return [];
}
