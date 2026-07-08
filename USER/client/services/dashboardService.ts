import { apiRequest, API_ENDPOINTS } from "@/config/api";
import { DashboardData } from "@/types";

// Get complete dashboard data
export const getDashboard = async (): Promise<DashboardData> => {
  return apiRequest<DashboardData>(API_ENDPOINTS.DASHBOARD);
};

// Get dashboard summary (lighter than full dashboard)
export const getDashboardSummary = async (): Promise<
  Partial<DashboardData>
> => {
  return apiRequest<Partial<DashboardData>>("/dashboard/summary");
};
