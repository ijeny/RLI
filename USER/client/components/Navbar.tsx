import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import CartIcon from "./CartIcon";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLainyaOpen, setIsLainyaOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const mainNavItems = [
    { label: "Home", path: "/" },
    { label: "Produk IFK", path: "/produk" },
    { label: "Edukasi", path: "/education" },
    { label: "Setor Sampah", path: "/waste-bank/deposit" },
    { label: "Tentang", path: "/about" },
  ];

  const lainyaItems = [
    { label: "Komunitas", path: "/komunitas" },
    { label: "Sustainability", path: "/sustainability" },
    { label: "Kontak", path: "#contact" },
    { label: "FAQ", path: "#faq" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-effect border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-primary/20 text-primary"
                    : "text-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Lainnya Dropdown */}
            <div className="relative">
              <button
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
                  {lainyaItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsLainyaOpen(false)}
                      className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Icons & Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Notification Bell */}
            <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors hidden sm:block group relative">
              <Bell className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>

            {/* Cart Icon */}
            <CartIcon itemCount={2} />

            {/* Profile Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors group"
              >
                <User className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 glass-effect rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Account Section */}
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

                  {/* Sampah Section */}
                  <div className="px-4 py-2 text-xs font-bold text-foreground/60 uppercase">
                    Bank Sampah
                  </div>
                  <Link
                    to="/waste-bank"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    Tabungan Sampah
                  </Link>
                  <Link
                    to="/waste-bank/history"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    Riwayat Setoran
                  </Link>
                  <Link
                    to="/waste-bank/withdrawal"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    Penarikan Saldo
                  </Link>

                  <hr className="my-2 border-border" />

                  {/* Settings Section */}
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

                  <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors font-semibold rounded-b-lg">
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Auth Buttons - Desktop */}
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 space-y-3 border-t animate-in slide-in-from-top-2 duration-200">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(item.path)
                    ? "bg-primary/20 text-primary"
                    : "text-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Lainnya */}
            <div className="px-4 py-2">
              <button
                onClick={() => setIsLainyaOpen(!isLainyaOpen)}
                className="w-full text-left font-medium text-foreground hover:text-primary transition-colors flex items-center justify-between"
              >
                Lainnya
                <ChevronDown
                  className="w-4 h-4 transition-transform duration-200"
                  style={{
                    transform: isLainyaOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {isLainyaOpen && (
                <div className="mt-2 space-y-2 ml-4 border-l-2 border-primary/20">
                  {lainyaItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsLainyaOpen(false);
                      }}
                      className="block px-3 py-1 text-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 space-y-2 border-t">
              <Link
                to="/login"
                className="block px-4 py-2 text-primary font-semibold"
              >
                Masuk
              </Link>
              <Link
                to="/register"
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
