import { api } from "./axios";
export async function getNotes() {
  const response = await api.get("/cards");
  return response.data;
}
export async function getUser() {
  const response = await api.get("/user");
  return response.data;
}
export async function getFavorites() {
  const response = await api.get("/cards/favorites");
  return response.data;
}

export async function login(credentials) {
  const response = await api.post("/auth/login", credentials);
  return response.data;
}
export async function registerUser(credentials) {
  const response = await api.post("/auth/register", credentials);
  return response.data;
}

export async function logout() {
  const response = await api.post("/auth/logout");
  return response.data;
}
export async function createNote(credentials) {
  const response = await api.post("/cards", credentials);
  return response.data;
}
export async function toggleFavorite(id) {
  const response = await api.patch(`/cards/${id}/favorite`);
  return response.data;
}

export async function deleteNote(id) {
  const response = await api.delete(`/cards/${id}`);
  return response.data;
}
