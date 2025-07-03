// src/utils/storage.ts

const USER_ROLE_KEY = "userRole";
const CLIENT_TYPE_KEY = "clientType";

/**
 * Guarda el rol de usuario en localStorage.
 * @param role string con rol (ej: "admin")
 */
export const setUserRole = (role: string) => {
  localStorage.setItem(USER_ROLE_KEY, role);
};

/**
 * Obtiene el rol de usuario guardado, o "agent" por defecto.
 * @returns string
 */
export const getUserRole = (): string => {
  return localStorage.getItem(USER_ROLE_KEY) || "agent";
};

/**
 * Guarda el tipo de cliente en localStorage.
 * @param type string con tipo (ej: "law-firm")
 */
export const setClientType = (type: string) => {
  localStorage.setItem(CLIENT_TYPE_KEY, type);
};

/**
 * Obtiene el tipo de cliente guardado, o "law-firm" por defecto.
 * @returns string
 */
export const getClientType = (): string => {
  return localStorage.getItem(CLIENT_TYPE_KEY) || "law-firm";
};

/**
 * Elimina ambos valores de localStorage.
 */
export const clearUserData = () => {
  localStorage.removeItem(USER_ROLE_KEY);
  localStorage.removeItem(CLIENT_TYPE_KEY);
};
