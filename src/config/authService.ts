import { request } from "./api.config";

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await request.post(`/auth/login`, credentials);
  return response.data;
};

export const registerUser = async (userData: {
  email: string;
  password: string;
}) => {
  const response = await request.post(`/auth/register`, userData);
  return response.data;
};

export const logoutUser = async () => {
  await request.post(`/auth/logout`);
};
