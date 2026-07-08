import { apiRequest, API_ENDPOINTS } from "@/config/api";
import { User } from "@/types";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: "customer" | "farmer" | "seller";
}

interface AuthResponse {
  user: User;
  token: string;
}

// Login
export const login = async (data: LoginData): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>(API_ENDPOINTS.LOGIN, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Register
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>(API_ENDPOINTS.REGISTER, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Logout
export const logout = async (): Promise<void> => {
  return apiRequest<void>(API_ENDPOINTS.LOGOUT, {
    method: "POST",
  });
};

// Get current user
export const getCurrentUser = async (): Promise<User> => {
  return apiRequest<User>(API_ENDPOINTS.PROFILE);
};

// Verify token
export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    await apiRequest<User>("/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch {
    return false;
  }
};
