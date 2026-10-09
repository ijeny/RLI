import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell, User, ChevronDown, Recycle } from "lucide-react";
import { useState } from "react";
import CartIcon from "./CartIcon";

type NavItem = {
  label: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLainyaOpen, setIsLainyaOpen] = useState(false);

  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // =========================================================
  // MAIN NAVIGATION
  // =========================================================

  const mainNavItems: NavItem[] = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Produk IFK",
      path: "/produk",
    },
    {
      label: "Edukasi",
      path: "/education",
    },
    {
      label: "Bank Sampah",
      path: "/waste-bank",
    },
    {
      label: "Tentang",
      path: "/about",
    },
  ];

  // =========================================================
  // LAINNYA
  // =========================================================

  const lainyaItems: NavItem[] = [
    {
      label: "Komunitas",
      path: "/komunitas",
    },
    {
      label: "Sustainability",
      path: "/sustainability",
    },
    {
      label: "Kontak",
      path: "#contact",
    },
    {
      label: "FAQ",
      path: "#faq",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-effect border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* =====================================================
              LOGO
          ===================================================== */}

          <Link
            to="/"
            className="flex items-center gap-2 font-poppins font-bold text-xl text-primary hover:text-secondary transition-colors flex-shrink-0 group"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F1dcadd5bc6674a76b9d63e0664ab6749%2Ff554a236ba3342c7b046332eeb73e417?format=webp&width=800&height=1200"
              alt="IFK Logo"
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
            />

            <span className="hidden sm:inline text-lg">IFK</span>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}

          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {mainNavItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive(item.path)
                      ? "bg-primary/20 text-primary"
                      : "text-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}

                  {item.label}
                </Link>
              );
            })}

            {/* =================================================
                LAINNYA DROPDOWN
            ================================================= */}

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLainyaOpen(!isLainyaOpen)}
                className="px-4 py-2 rounded-lg font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 flex items-center gap-1 group"
              >
                Lainnya
                <ChevronDown
                  className="w-4 h-4 group-hover:text-primary transition-transform duration-200"
                  style={{
                    transform: isLainyaOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {isLainyaOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 glass-effect rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {lainyaItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsLainyaOpen(false)}
                        className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className="w-4 h-4" />}

                          {item.label}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* =================================================
                NOTIFICATION
            ================================================= */}

            <button
              type="button"
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors hidden sm:block group relative"
              aria-label="Notifikasi"
            >
              <Bell className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />

              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>

            {/* =================================================
                CART
            ================================================= */}

            <CartIcon itemCount={2} />

            {/* =================================================
                PROFILE
            ================================================= */}

            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors group"
                aria-label="Akun"
              >
                <User className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 glass-effect rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* =================================================
                      ACCOUNT SECTION
                  ================================================= */}

                  <div className="px-4 py-2 text-xs font-bold text-foreground/60 uppercase">
                    Akun Saya
                  </div>

                  <Link
                    to="/home"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    Dashboard Saya
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    Riwayat Pesanan
                  </Link>

                  <Link
                    to="/profile/education"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    Riwayat Edukasi
                  </Link>

                  <hr className="my-2 border-border" />

                  {/* =================================================
                      SETTINGS
                  ================================================= */}

                  <div className="px-4 py-2 text-xs font-bold text-foreground/60 uppercase">
                    Lainnya
                  </div>

                  <Link
                    to="/profile/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    Pengaturan Akun
                  </Link>

                  <hr className="my-2 border-border" />

                  {/* =================================================
                      LOGOUT
                  ================================================= */}

                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors font-semibold rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* =====================================================
                AUTH BUTTONS
            ===================================================== */}

            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="text-primary font-semibold hover:text-secondary transition-colors text-sm"
              >
                Masuk
              </Link>

              <Link to="/register" className="btn-primary text-sm py-2">
                Daftar
              </Link>
            </div>

            {/* =====================================================
                MOBILE MENU BUTTON
            ===================================================== */}

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Buka menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ===================================================== */}

        {isMenuOpen && (
          <div className="lg:hidden pb-4 space-y-3 border-t animate-in slide-in-from-top-2 duration-200">
            {mainNavItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive(item.path)
                      ? "bg-primary/20 text-primary"
                      : "text-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}

                  {item.label}
                </Link>
              );
            })}

            {/* =================================================
                MOBILE LAINNYA
            ================================================= */}

            <div className="px-4 py-2">
              <button
                type="button"
                onClick={() => setIsLainyaOpen(!isLainyaOpen)}
                className="w-full text-left font-medium text-foreground hover:text-primary transition-colors flex items-center justify-between"
              >
                <span>Lainnya</span>

                <ChevronDown
                  className="w-4 h-4 transition-transform duration-200"
                  style={{
                    transform: isLainyaOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {isLainyaOpen && (
                <div className="mt-2 space-y-2 ml-4 border-l-2 border-primary/20">
                  {lainyaItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsLainyaOpen(false);
                        }}
                        className="block px-3 py-1 text-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors text-sm"
                      >
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className="w-4 h-4" />}

                          {item.label}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* =================================================
                MOBILE AUTH
            ================================================= */}

            <div className="pt-3 space-y-2 border-t">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-primary font-semibold"
              >
                Masuk
              </Link>

              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="block btn-primary text-center text-sm py-2"
              >
                Daftar
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
