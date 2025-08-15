const API_BASE = "http://localhost:3000";

export async function fetchUsers(term = "") {
  const url = term ? `${API_BASE}?term=${encodeURIComponent(term)}` : API_BASE;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Ошибка ${res.status}`);
  const data = await res.json();
  return data.success && data.data ? data.data : data;
}
