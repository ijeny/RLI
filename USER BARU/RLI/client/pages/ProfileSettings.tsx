import { useState } from "react";
import { Save, Camera, Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "preferences">("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Ahmad Firdaus",
    username: "ahmad.firdaus",
    email: "ahmad@ifk.id",
    phone: "+62 812-3456-7890",
    address: "Jl. Diponegoro No. 123, Ketapang",
    bio: "Petani modern yang peduli keberlanjutan",
    avatar: "👤",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="w-full">
      <Navbar />

      {/* Header */}
      <section className="relative py-12 bg-gradient-to-br from-white via-cyan-50 to-teal-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-2">
            Pengaturan Akun
          </h1>
          <p className="text-foreground/70">
            Kelola profil dan preferensi akun Anda
          </p>
        </div>
      </section>

      {/* Settings */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b">
            {[
              { id: "profile", label: "Profil" },
              { id: "security", label: "Keamanan" },
              { id: "preferences", label: "Preferensi" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 font-semibold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "text-primary border-primary"
                    : "text-foreground/60 border-transparent hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              {/* Avatar */}
              <div>
                <h3 className="font-poppins font-bold text-secondary mb-4">Foto Profil</h3>
                <div className="flex items-center gap-6">
                  <div className="text-6xl">{formData.avatar}</div>
                  <button className="btn-outline flex items-center justify-center gap-2">
                    <Camera className="w-5 h-5" />
                    Ubah Foto
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <h3 className="font-poppins font-bold text-secondary">Informasi Dasar</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Username *
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Nomor HP *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Alamat
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Bio Singkat
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none resize-none"
                  />
                </div>

                <button
                  onClick={handleSave}
                  className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto"
                >
                  <Save className="w-5 h-5" />
                  {isSaved ? "Tersimpan ✓" : "Simpan Perubahan"}
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h3 className="font-poppins font-bold text-secondary mb-6">Keamanan Akun</h3>

              <div className="glass-effect rounded-xl p-6">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Password Saat Ini
                </label>
                <div className="relative mb-6">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                  />
                  <button className="absolute right-4 top-3">
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-foreground/60" />
                    ) : (
                      <Eye className="w-5 h-5 text-foreground/60" />
                    )}
                  </button>
                </div>

                <label className="block text-sm font-semibold text-foreground mb-2">
                  Password Baru
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none mb-6"
                />

                <label className="block text-sm font-semibold text-foreground mb-2">
                  Konfirmasi Password Baru
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none mb-6"
                />

                <button className="btn-primary">
                  Ubah Password
                </button>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <h3 className="font-poppins font-bold text-secondary mb-6">Preferensi</h3>

              <div className="space-y-4">
                <div className="glass-effect rounded-xl p-6 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">Email Notifikasi</h4>
                    <p className="text-sm text-foreground/70">Terima notifikasi via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
                </div>

                <div className="glass-effect rounded-xl p-6 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">Promosi & Penawaran</h4>
                    <p className="text-sm text-foreground/70">Terima informasi promosi terbaru</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
                </div>

                <div className="glass-effect rounded-xl p-6 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">Newsletter Edukasi</h4>
                    <p className="text-sm text-foreground/70">Terima tips dan panduan farming</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
                </div>
              </div>

              <button className="btn-primary">
                Simpan Preferensi
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
