import { useState } from "react";
import { Eye, EyeOff, Check, AlertCircle, Leaf, Lock, Mail, User, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FormData {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  [key: string]: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap harus diisi";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username harus diisi";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username minimal 3 karakter";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor HP harus diisi";
    } else if (!/^\d+$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Nomor HP hanya boleh mengandung angka";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Alamat harus diisi";
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak sesuai";
    }

    if (!termsAgreed) {
      newErrors.terms = "Anda harus menyetujui syarat & ketentuan";
    }

    if (!privacyAgreed) {
      newErrors.privacy = "Anda harus menyetujui kebijakan privasi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        // Redirect to login page (not home)
        window.location.href = "/login";
      }, 3000);
    }, 1500);
  };

  const passwordStrength = formData.password
    ? formData.password.length >= 12
      ? "Kuat"
      : formData.password.length >= 8
      ? "Sedang"
      : "Lemah"
    : "";

  const passwordStrengthColor =
    passwordStrength === "Kuat"
      ? "text-green-600"
      : passwordStrength === "Sedang"
      ? "text-amber-600"
      : "text-red-600";

  const isFormValid =
    formData.fullName &&
    formData.username &&
    formData.email &&
    formData.phone &&
    formData.address &&
    formData.password &&
    formData.confirmPassword &&
    termsAgreed &&
    privacyAgreed &&
    Object.keys(errors).length === 0;

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
                Akun Berhasil Dibuat! 🎉
              </h2>
              <p className="text-foreground/70 mb-4">
                Selamat datang di Integrated Farming Ketapang
              </p>
              <p className="text-sm text-foreground/60">
                Silakan login untuk melanjutkan ke platform IFK
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen flex">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-4xl font-poppins font-bold text-secondary">
                Buat Akun
              </h1>
              <p className="text-foreground/70">
                Bergabunglah dengan ekosistem pertanian digital kami
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.fullName
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-soft focus:border-primary"
                  }`}
                />
                {errors.fullName && (
                  <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </div>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Pilih username unik"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.username
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-soft focus:border-primary"
                  }`}
                />
                {errors.username && (
                  <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.username}
                  </div>
                )}
              </div>

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

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Nomor HP
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.phone
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-soft focus:border-primary"
                  }`}
                />
                {errors.phone && (
                  <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Alamat
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Masukkan alamat lengkap Anda"
                  rows={2}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.address
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-soft focus:border-primary"
                  }`}
                />
                {errors.address && (
                  <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.address}
                  </div>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimal 8 karakter"
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
                {formData.password && (
                  <div className={`text-xs font-semibold mt-2 ${passwordStrengthColor}`}>
                    Kekuatan: {passwordStrength}
                  </div>
                )}
                {errors.password && (
                  <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi password Anda"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors pr-10 ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-600"
                        : "border-gray-soft focus:border-primary"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.password === formData.confirmPassword && (
                    <div className="flex items-center gap-1 text-green-600 text-xs mt-1">
                      <Check className="w-3 h-3" />
                      Password cocok
                    </div>
                  )}
                {errors.confirmPassword && (
                  <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* Terms & Privacy */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={(e) => {
                      setTermsAgreed(e.target.checked);
                      if (e.target.checked) {
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.terms;
                          return newErrors;
                        });
                      }
                    }}
                    className="mt-1 w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-sm text-foreground/70">
                    Saya setuju dengan{" "}
                    <a href="#" className="text-primary font-semibold hover:text-secondary">
                      syarat & ketentuan
                    </a>{" "}
                    platform
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyAgreed}
                    onChange={(e) => {
                      setPrivacyAgreed(e.target.checked);
                      if (e.target.checked) {
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.privacy;
                          return newErrors;
                        });
                      }
                    }}
                    className="mt-1 w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-sm text-foreground/70">
                    Saya setuju dengan{" "}
                    <a href="#" className="text-primary font-semibold hover:text-secondary">
                      kebijakan privasi
                    </a>{" "}
                    data
                  </span>
                </label>

                {(errors.terms || errors.privacy) && (
                  <div className="flex items-center gap-1 text-red-600 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    {errors.terms || errors.privacy}
                  </div>
                )}
              </div>

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
                    Membuat Akun...
                  </>
                ) : (
                  "Buat Akun"
                )}
              </button>
            </form>

            {/* Social Login */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-foreground/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-foreground/60">atau daftar dengan</span>
              </div>
            </div>

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

            {/* Login Link */}
            <p className="text-center text-foreground/70">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-primary font-bold hover:text-secondary">
                Masuk sekarang
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary via-secondary to-primary/80 items-center justify-center p-8 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center space-y-8 max-w-md text-white">
            <div className="space-y-4">
              <div className="text-6xl">🌱</div>
              <h2 className="text-4xl font-poppins font-bold">
                Bergabung dengan IFK
              </h2>
              <p className="text-lg text-white/80">
                Bangun ekosistem pertanian dan lingkungan digital bersama
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-8">
              {[
                { icon: "🌾", text: "Pertanian Cerdas" },
                { icon: "💰", text: "Bank Sampah Digital" },
                { icon: "📚", text: "Platform Edukasi" },
                { icon: "♻️", text: "Ramah Lingkungan" },
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-xs text-white/70">Pengguna</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1K+</div>
                <div className="text-xs text-white/70">Kg Sampah</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-xs text-white/70">Petani</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
