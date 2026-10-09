import { useState } from "react";
import { Eye, EyeOff, AlertCircle, Check, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  [key: string]: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        // Redirect to home/dashboard
        window.location.href = "/home";
      }, 2000);
    }, 1500);
  };

  const isFormValid = formData.email && formData.password && Object.keys(errors).length === 0;

  return (
    <div className="w-full">
      <Navbar />

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-2xl p-8 max-w-sm w-full text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-2">
                Masuk Berhasil! 🎉
              </h2>
              <p className="text-foreground/70">
                Selamat datang kembali di Integrated Farming Ketapang
              </p>
            </div>
            <div className="text-sm text-foreground/60">
              Mengarahkan Anda ke beranda...
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen flex">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary via-secondary to-primary/80 items-center justify-center p-8 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center space-y-8 max-w-md text-white">
            <div className="space-y-4">
              <div className="text-6xl">🌾</div>
              <h2 className="text-4xl font-poppins font-bold">
                Selamat Datang Kembali!
              </h2>
              <p className="text-lg text-white/80">
                Kelola pertanian, edukasi, dan lingkungan lebih mudah dengan IFK
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-8">
              {[
                { icon: "💰", text: "Kelola Tabungan Sampah" },
                { icon: "🛒", text: "Akses Marketplace Produk" },
                { icon: "📚", text: "Ikuti Kelas Edukasi" },
                { icon: "📊", text: "Lihat Analitik & Progress" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="glass-effect bg-white/10 rounded-lg p-4 flex items-center gap-4 border border-white/20"
                >
                  <span className="text-3xl">{feature.icon}</span>
                  <span className="font-semibold text-white">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="pt-8 border-t border-white/30">
              <p className="italic text-white/80">
                "Tumbuh bersama, berkelanjutan untuk masa depan"
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-4xl font-poppins font-bold text-secondary">
                Masuk
              </h1>
              <p className="text-foreground/70">
                Masuk ke akun Anda untuk melanjutkan
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-soft focus:border-primary"
                  }`}
                />
                {errors.email && (
                  <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:text-secondary font-semibold"
                  >
                    Lupa password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukkan password Anda"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors pr-10 ${
                      errors.password
                        ? "border-red-500 focus:border-red-600"
                        : "border-gray-soft focus:border-primary"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-primary rounded"
                />
                <span className="text-sm text-foreground/70">
                  Ingat saya di perangkat ini
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full py-3 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  isFormValid && !isLoading
                    ? "bg-primary text-white hover:bg-secondary cursor-pointer"
                    : "bg-foreground/20 text-foreground/50 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : (
                  "Masuk Sekarang"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-foreground/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-foreground/60">atau masuk dengan</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="glass-effect rounded-lg py-3 font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                <span>🔵</span>
                Google
              </button>
              <button className="glass-effect rounded-lg py-3 font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                <span>👤</span>
                Facebook
              </button>
            </div>

            {/* Register Link */}
            <p className="text-center text-foreground/70">
              Belum punya akun?{" "}
              <Link to="/register" className="text-primary font-bold hover:text-secondary">
                Daftar sekarang
              </Link>
            </p>

            {/* Help Text */}
            <div className="glass-effect bg-primary/10 rounded-lg p-4 text-sm text-foreground/70">
              <p className="mb-2 font-semibold text-foreground">Butuh bantuan?</p>
              <p>
                Hubungi dukungan kami di support@ifk.id atau lihat{" "}
                <a href="#" className="text-primary font-semibold hover:text-secondary">
                  FAQ
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
