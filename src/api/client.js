// Petit client fetch, base URL via .env (Vite)
const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "http://localhost:3000";
export const USE_MOCK = String(import.meta.env.VITE_USE_MOCK || "").toLowerCase() === "true";

async function http(path, init) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {"Content-Type": "application/json"},
    ...init
  });
  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${message}`);
  }
  return res.json();
}

export const api = {
  get: (path) => http(path, {method: "GET"})
};

export {BASE_URL};
