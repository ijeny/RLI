import { apiRequest, API_ENDPOINTS } from "@/config/api";
import { UserProfile, UserStats } from "@/types";

// Get current user profile
export const getUserProfile = async (): Promise<UserProfile> => {
  return apiRequest<UserProfile>(API_ENDPOINTS.PROFILE);
};

// Get user statistics
export const getUserStats = async (): Promise<UserStats> => {
  return apiRequest<UserStats>(API_ENDPOINTS.USER_STATS);
};

// Update user profile
export const updateUserProfile = async (
  data: Partial<UserProfile>,
): Promise<UserProfile> => {
  return apiRequest<UserProfile>(API_ENDPOINTS.USER_UPDATE, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// Get user by ID
export const getUserById = async (id: number): Promise<UserProfile> => {
  return apiRequest<UserProfile>(`/users/${id}`);
};
