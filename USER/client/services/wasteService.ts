import { apiRequest, API_ENDPOINTS } from "@/config/api";
import {
  WasteDeposit,
  WasteWithdrawal,
  WasteStats,
  EcoLevel,
  Achievement,
  PaginatedResponse,
} from "@/types";

// Get waste deposits history
export const getWasteDeposits = async (
  page: number = 1,
  perPage: number = 10,
): Promise<PaginatedResponse<WasteDeposit>> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("per_page", perPage.toString());

  return apiRequest<PaginatedResponse<WasteDeposit>>(
    `${API_ENDPOINTS.WASTE_DEPOSITS}?${params.toString()}`,
  );
};

// Get waste withdrawals history
export const getWasteWithdrawals = async (
  page: number = 1,
  perPage: number = 10,
): Promise<PaginatedResponse<WasteWithdrawal>> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("per_page", perPage.toString());

  return apiRequest<PaginatedResponse<WasteWithdrawal>>(
    `${API_ENDPOINTS.WASTE_WITHDRAWALS}?${params.toString()}`,
  );
};

// Get waste statistics
export const getWasteStats = async (): Promise<WasteStats> => {
  return apiRequest<WasteStats>(API_ENDPOINTS.WASTE_STATS);
};

// Get waste deposit history (combined)
export const getWasteHistory = async (
  page: number = 1,
  perPage: number = 10,
): Promise<PaginatedResponse<WasteDeposit | WasteWithdrawal>> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("per_page", perPage.toString());

  return apiRequest<PaginatedResponse<WasteDeposit | WasteWithdrawal>>(
    `${API_ENDPOINTS.WASTE_HISTORY}?${params.toString()}`,
  );
};

// Create waste deposit
export const createWasteDeposit = async (
  data: Partial<WasteDeposit>,
): Promise<WasteDeposit> => {
  return apiRequest<WasteDeposit>("/waste-bank/deposit", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Create waste withdrawal
export const createWasteWithdrawal = async (
  data: Partial<WasteWithdrawal>,
): Promise<WasteWithdrawal> => {
  return apiRequest<WasteWithdrawal>("/waste-bank/withdraw", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Get eco levels
export const getEcoLevels = async (): Promise<EcoLevel[]> => {
  return apiRequest<EcoLevel[]>(API_ENDPOINTS.WASTE_LEVELS);
};

// Get achievements
export const getAchievements = async (): Promise<Achievement[]> => {
  return apiRequest<Achievement[]>("/waste-bank/achievements");
};
