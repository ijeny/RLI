import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import About from "./pages/About";
import Produk from "./pages/Produk";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import Education from "./pages/Education";
import EducationDetail from "./pages/EducationDetail";
import EducationBooking from "./pages/EducationBooking";

import WasteBankDashboard from "./pages/WasteBankDashboard";
import WasteBankDeposit from "./pages/WasteBankDeposit";
import WasteBankHistory from "./pages/WasteBankHistory";
import WasteBankWithdrawal from "./pages/WasteBankWithdrawal";

import Sustainability from "./pages/Sustainability";
import Komunitas from "./pages/Komunitas";

import Orders from "./pages/Orders";
import ProfileSettings from "./pages/ProfileSettings";

import NotFound from "./pages/NotFound";
import Placeholder from "./pages/Placeholder";

export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {/* =====================================================
                PUBLIC LANDING PAGE
            ===================================================== */}

            <Route path="/" element={<Index />} />

            {/* =====================================================
                ABOUT
            ===================================================== */}

            <Route path="/about" element={<About />} />

            {/* =====================================================
                PRODUK IFK
            ===================================================== */}

            {/* Halaman semua produk */}
            <Route path="/produk" element={<Produk />} />

            {/* Detail produk */}
            <Route path="/produk/:id" element={<ProductDetail />} />

            {/* Keranjang */}
            <Route path="/cart" element={<Cart />} />

            {/* =====================================================
                AUTH
            ===================================================== */}

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* =====================================================
                USER DASHBOARD
            ===================================================== */}

            <Route path="/home" element={<Home />} />

            {/* =====================================================
                EDUCATION
            ===================================================== */}

            <Route path="/education" element={<Education />} />

            <Route path="/education/:id" element={<EducationDetail />} />

            <Route
              path="/education/:id/booking"
              element={<EducationBooking />}
            />

            {/* =====================================================
                WASTE BANK
            ===================================================== */}

            <Route path="/waste-bank" element={<WasteBankDashboard />} />

            <Route path="/waste-bank/deposit" element={<WasteBankDeposit />} />

            <Route path="/waste-bank/history" element={<WasteBankHistory />} />

            <Route
              path="/waste-bank/withdrawal"
              element={<WasteBankWithdrawal />}
            />

            {/* =====================================================
                SUSTAINABILITY & COMMUNITY
            ===================================================== */}

            <Route path="/sustainability" element={<Sustainability />} />

            <Route path="/komunitas" element={<Komunitas />} />

            {/* =====================================================
                ORDERS & PROFILE
            ===================================================== */}

            <Route path="/orders" element={<Orders />} />

            <Route path="/profile/settings" element={<ProfileSettings />} />

            {/* =====================================================
                CHECKOUT
            ===================================================== */}

            <Route path="/checkout" element={<Placeholder />} />

            {/* =====================================================
                OTHER PROFILE ROUTES
            ===================================================== */}

            <Route path="/profile" element={<Placeholder />} />

            <Route path="/profile/education" element={<Placeholder />} />

            {/* =====================================================
                WASTE BANK REWARDS
            ===================================================== */}

            <Route path="/waste-bank/rewards" element={<Placeholder />} />

            {/* =====================================================
                DASHBOARD
            ===================================================== */}

            <Route path="/dashboard" element={<Placeholder />} />

            <Route path="/dashboard-seller" element={<Placeholder />} />

            {/* =====================================================
                ADMIN
            ===================================================== */}

            <Route path="/admin" element={<Placeholder />} />

            {/* =====================================================
                TRANSACTIONS
            ===================================================== */}

            <Route path="/transactions" element={<Placeholder />} />

            {/* =====================================================
                404
            ===================================================== */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
