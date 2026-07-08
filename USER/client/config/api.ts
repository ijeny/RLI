// API Configuration
// Update these constants based on your backend environment
export const API_BASE_URL = "http://localhost:3000/api";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  PROFILE: "/auth/profile",

  // User
  USER_STATS: "/user/stats",
  USER_PROFILE: "/user/profile",
  USER_UPDATE: "/user/profile",

  // Products
  PRODUCTS: "/products",
  PRODUCTS_BY_ID: (id: number) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,

  // Education
  EDUCATION_CLASSES: "/education/classes",
  EDUCATION_CLASSES_BY_ID: (id: number) => `/education/classes/${id}`,
  EDUCATION_CATEGORIES: "/education/categories",
  EDUCATION_ENROLL: "/education/enroll",

  // Waste Bank
  WASTE_DEPOSITS: "/waste-bank/deposits",
  WASTE_WITHDRAWALS: "/waste-bank/withdrawals",
  WASTE_HISTORY: "/waste-bank/history",
  WASTE_STATS: "/waste-bank/stats",
  WASTE_LEVELS: "/waste-bank/levels",

  // Orders
  ORDERS: "/orders",
  ORDERS_BY_ID: (id: string) => `/orders/${id}`,

  // Dashboard
  DASHBOARD: "/dashboard",

  // Cart
  CART: "/cart",
  CART_ADD: "/cart/add",
  CART_REMOVE: "/cart/remove",
  CART_UPDATE: "/cart/update",
};

// Request Headers
export const getHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// API Error Handler
export class APIError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any,
  ) {
    super(message);
    this.name = "APIError";
  }
}

// API Request Handler
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new APIError(
      response.status,
      data.message || response.statusText,
      data,
    );
  }

  return response.json();
};
