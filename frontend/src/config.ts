export const { VITE_BACKEND_URL = "http://localhost:3000" } = import.meta.env;

export const userUrl = `${VITE_BACKEND_URL}/api/v1/user`;
export const imageUrl = `${VITE_BACKEND_URL}/api/v1/image`;
