import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Produk from "./pages/Produk";
import NotFound from "./pages/NotFound";
import Placeholder from "./pages/Placeholder";
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

export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Landing Page (Unauthenticated) */}
            <Route path="/" element={<Index />} />

            {/* About Page */}
          <Route path="/about" element={<About />} />

          {/* Produk IFK (Non-vendor catalog) */}
          <Route path="/produk" element={<Produk />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />

            {/* Auth routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* User Dashboard (After Login) */}
            <Route path="/home" element={<Home />} />

            {/* Education routes */}
            <Route path="/education" element={<Education />} />
            <Route path="/education/:id" element={<EducationDetail />} />
            <Route path="/education/:id/booking" element={<EducationBooking />} />

            {/* Waste Bank routes */}
            <Route path="/waste-bank" element={<WasteBankDashboard />} />
            <Route path="/waste-bank/deposit" element={<WasteBankDeposit />} />
            <Route path="/waste-bank/history" element={<WasteBankHistory />} />
            <Route path="/waste-bank/withdrawal" element={<WasteBankWithdrawal />} />

            {/* Sustainability & Community routes */}
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/komunitas" element={<Komunitas />} />

            {/* Orders & Profile */}
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile/settings" element={<ProfileSettings />} />

            {/* Placeholder routes for future implementation */}
            <Route path="/checkout" element={<Placeholder />} />
            <Route path="/profile" element={<Placeholder />} />
            <Route path="/profile/education" element={<Placeholder />} />
            <Route path="/waste-bank/rewards" element={<Placeholder />} />
            <Route path="/dashboard" element={<Placeholder />} />
            <Route path="/dashboard-seller" element={<Placeholder />} />
            <Route path="/admin" element={<Placeholder />} />
            <Route path="/transactions" element={<Placeholder />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
