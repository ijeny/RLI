import { apiRequest, API_ENDPOINTS } from "@/config/api";
import { Order, OrderDetail, CartItem, PaginatedResponse } from "@/types";

// Get user's orders
export const getOrders = async (
  page: number = 1,
  perPage: number = 10,
): Promise<PaginatedResponse<Order>> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("per_page", perPage.toString());

  return apiRequest<PaginatedResponse<Order>>(
    `${API_ENDPOINTS.ORDERS}?${params.toString()}`,
  );
};

// Get order by ID
export const getOrderById = async (id: string): Promise<OrderDetail> => {
  return apiRequest<OrderDetail>(API_ENDPOINTS.ORDERS_BY_ID(id));
};

// Create order
export const createOrder = async (data: Partial<Order>): Promise<Order> => {
  return apiRequest<Order>(API_ENDPOINTS.ORDERS, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Cancel order
export const cancelOrder = async (id: string): Promise<Order> => {
  return apiRequest<Order>(`${API_ENDPOINTS.ORDERS}/${id}/cancel`, {
    method: "POST",
  });
};

// Get cart
export const getCart = async (): Promise<CartItem[]> => {
  return apiRequest<CartItem[]>(API_ENDPOINTS.CART);
};

// Add item to cart
export const addToCart = async (
  productId: number,
  quantity: number,
): Promise<CartItem[]> => {
  return apiRequest<CartItem[]>(API_ENDPOINTS.CART_ADD, {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
};

// Remove item from cart
export const removeFromCart = async (
  productId: number,
): Promise<CartItem[]> => {
  return apiRequest<CartItem[]>(API_ENDPOINTS.CART_REMOVE, {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
};

// Update cart item quantity
export const updateCartItem = async (
  productId: number,
  quantity: number,
): Promise<CartItem[]> => {
  return apiRequest<CartItem[]>(API_ENDPOINTS.CART_UPDATE, {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
};

// Checkout
export const checkout = async (data: Partial<Order>): Promise<Order> => {
  return apiRequest<Order>("/cart/checkout", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
