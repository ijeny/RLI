// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserStats {
  totalWasteDeposited: number;
  totalSavings: number;
  totalTrainingCompleted: number;
  ecoPoints: number;
}

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  website?: string;
}

// Product Types
export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  rating: number;
  reviews: number;
  category?: string;
  seller?: {
    id: number;
    name: string;
  } | string;
  createdAt?: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  description: string;
  image: string;
}

// Education Types
export interface EducationClass {
  id: number;
  title: string;
  description: string;
  date: string;
  quota: number;
  price: number;
  name?: string;
  category?: string;
  level?: "Pemula" | "Menengah" | "Lanjutan" | string;
  mentor?: {
    id: number;
    name: string;
    bio: string;
    image: string;
  } | string;
  schedule?: string;
  duration?: string;
  enrolled?: number;
  rating?: number;
  reviews?: number;
  image?: string;
  startDate?: string;
  materialFormats?: string[];
  benefits?: string[];
  curriculum?: Curriculum[];
  createdAt?: string;
}

export interface Curriculum {
  week: string | number;
  title: string;
  topics: string[];
}

export interface EducationCategory {
  id: number;
  name: string;
  description: string;
}

export interface EducationEnrollment {
  id: number;
  classId: number;
  userId: number;
  status: "active" | "completed" | "dropped";
  progress: number;
  enrolledAt: string;
}

// Waste Bank Types
export interface WasteDeposit {
  id: number;
  wasteType: string;
  weight: number;
  pricePerKg: number;
  total: number;
  status: string;
  userId?: number;
  type?: string;
  amount?: number;
  date?: string;
}

export interface WasteWithdrawal {
  id: number;
  userId: number;
  amount: number;
  date: string;
  status: "Berhasil" | "Pending" | "Rejected";
  bankAccount?: {
    bankName: string;
    accountNumber: string;
  };
}

export interface WasteStats {
  totalKg: number;
  plasticKg: number;
  paperKg: number;
  metalKg: number;
  organicKg: number;
  totalBalance: number;
  totalEcoPoints: number;
}

export interface EcoLevel {
  id: number;
  name: string;
  progress: number;
  nextMilestone?: number;
  badge?: string;
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

// Order Types
export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  seller: string;
}

export interface Order {
  id: string;
  userId: number;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  location: string;
  date: string;
  estimatedDelivery?: string;
  paymentMethod?: string;
}

export interface OrderDetail extends Order {
  trackingNumber?: string;
  notes?: string;
  history?: OrderHistory[];
}

export interface OrderHistory {
  status: string;
  date: string;
  description: string;
}

// Dashboard Types
export interface DashboardData {
  user: UserProfile;
  stats: UserStats;
  wasteStats?: WasteStats;
  recentOrders: Order[];
  recentActivity: Activity[];
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  type: "waste" | "education" | "purchase" | "achievement";
  icon: string;
  participants?: number;
}

// Generic Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    lastPage: number;
  };
}

// Review Types
export interface Review {
  id: number;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  rating: number;
  text: string;
  date: string;
  helpful: number;
}
