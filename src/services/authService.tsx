import axios from "axios";
import { IFormLogin } from "../types/User";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const authService = async (credentials: IFormLogin) => {
  try {
    const response = await axios.get(API_URL);
    const users = response.data;

    const user = users.find(
      (user: { username: string; password: string }) =>
        user.username === credentials.username && user.password === credentials.password
    );

    if (user) {
      return {
        id: user.id,
        username: user.username,
        isAuthenticated: true,
        accessToken: "fake-access-token",
      };
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw new Error("Authentication failed");
  }
};
