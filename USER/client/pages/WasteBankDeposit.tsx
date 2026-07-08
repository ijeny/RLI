import { useState } from "react";
import { Upload, AlertCircle, Check, Calendar, MapPin, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WASTE_TYPES = [
  { id: 1, name: "Plastik", price: 10000, icon: "♻️", color: "bg-blue-50 border-blue-300" },
  { id: 2, name: "Kertas", price: 8000, icon: "📄", color: "bg-amber-50 border-amber-300" },
  { id: 3, name: "Logam/Kaleng", price: 15000, icon: "🔧", color: "bg-gray-50 border-gray-300" },
  { id: 4, name: "Botol Kaca", price: 5000, icon: "🍾", color: "bg-green-50 border-green-300" },
  { id: 5, name: "Elektronik", price: 20000, icon: "💻", color: "bg-purple-50 border-purple-300" },
  { id: 6, name: "Organik", price: 3000, icon: "🌱", color: "bg-lime-50 border-lime-300" },
];

const LOCATIONS = [
  { id: 1, name: "Lokasi Pusat - Jl. Diponegoro", address: "Ketapang Pusat" },
  { id: 2, name: "Lokasi Barat - Jl. Ahmad Yani", address: "Ketapang Barat" },
  { id: 3, name: "Lokasi Timur - Jl. Sudirman", address: "Ketapang Timur" },
];

const WasteBankDeposit = () => {
  const [selectedWaste, setSelectedWaste] = useState<number | null>(null);
  const [weight, setWeight] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "info">("form");

  const selectedWasteData = WASTE_TYPES.find((w) => w.id === selectedWaste);
  const estimatedAmount = selectedWasteData && weight ? parseInt(weight) * selectedWasteData.price : 0;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWaste && weight && selectedDate && selectedLocation && uploadedImage) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form
        setSelectedWaste(null);
        setWeight("");
        setUploadedImage(null);
        setSelectedDate("");
        setSelectedLocation(null);
        setNotes("");
      }, 3000);
    }
  };

  const isFormValid = selectedWaste && weight && selectedDate && selectedLocation && uploadedImage;

  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-teal-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center space-y-6">
          <div className="text-6xl mb-4">♻️</div>
          <h1 className="text-5xl md:text-6xl font-poppins font-bold text-secondary">
            Setor Sampah Anda
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Ubah sampah menjadi nilai dan bantu menjaga lingkungan bumi kita
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 justify-center max-w-md mx-auto mt-8">
            <div className="glass-effect rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">1000+</div>
              <p className="text-xs text-foreground/60">Kg Terkumpul</p>
            </div>
            <div className="glass-effect rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">500+</div>
              <p className="text-xs text-foreground/60">Pengguna Aktif</p>
            </div>
            <div className="glass-effect rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">Rp 50M+</div>
              <p className="text-xs text-foreground/60">Saldo Terbagi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab("form")}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === "form"
                ? "text-primary border-b-2 border-primary"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Formulir Setor
          </button>
          <button
            onClick={() => setActiveTab("info")}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === "info"
                ? "text-primary border-b-2 border-primary"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Informasi & Edukasi
          </button>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass-effect rounded-2xl p-8 max-w-sm w-full text-center space-y-6 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-2">
                  Setoran Berhasil!
                </h2>
                <p className="text-foreground/70 mb-4">
                  Estimasi saldo Anda: <span className="font-bold text-primary">Rp {estimatedAmount.toLocaleString("id-ID")}</span>
                </p>
                <p className="text-sm text-foreground/60">
                  Tunggu verifikasi admin untuk konfirmasi saldo
                </p>
              </div>
              <Link to="/waste-bank/history" className="btn-primary w-full">
                Lihat Riwayat Setoran
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            {/* Step 1: Waste Type */}
            <div className="glass-effect rounded-2xl p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground">
                  1. Pilih Jenis Sampah
                </h2>
                <p className="text-sm text-foreground/60">
                  Pilih jenis sampah yang ingin disetor
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {WASTE_TYPES.map((waste) => (
                  <button
                    key={waste.id}
                    type="button"
                    onClick={() => setSelectedWaste(waste.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center space-y-2 ${
                      selectedWaste === waste.id
                        ? `border-primary ${waste.color} bg-opacity-100`
                        : `border-foreground/20 hover:border-primary/50`
                    }`}
                  >
                    <div className="text-4xl">{waste.icon}</div>
                    <div className="font-semibold text-sm text-foreground">
                      {waste.name}
                    </div>
                    <div className="text-xs text-foreground/60">
                      Rp {waste.price.toLocaleString("id-ID")}/kg
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedWaste && (
              <>
                {/* Step 2: Weight */}
                <div className="glass-effect rounded-2xl p-8 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-foreground">
                      2. Berat Sampah
                    </h2>
                    <p className="text-sm text-foreground/60">
                      Masukkan berat sampah dalam kilogram
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Berat (kg) *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="Contoh: 5.5"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className="flex-1 px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                        />
                        <span className="px-4 py-3 bg-foreground/10 rounded-lg font-semibold text-foreground">
                          kg
                        </span>
                      </div>
                    </div>

                    {weight && (
                      <div className="glass-effect rounded-lg p-4 space-y-2 bg-primary/10">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-foreground/70">Harga per kg</span>
                          <span className="font-semibold text-foreground">
                            Rp {selectedWasteData?.price.toLocaleString("id-ID")}
                          </span>
                        </div>
                        <div className="border-t border-primary/20 pt-2 flex items-center justify-between">
                          <span className="font-bold text-foreground">Total Estimasi</span>
                          <span className="text-2xl font-bold text-primary">
                            Rp {estimatedAmount.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 3: Photo Upload */}
                <div className="glass-effect rounded-2xl p-8 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-foreground">
                      3. Upload Foto Sampah
                    </h2>
                    <p className="text-sm text-foreground/60">
                      Upload foto sampah untuk verifikasi
                    </p>
                  </div>

                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img
                        src={uploadedImage}
                        alt="Uploaded waste"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setUploadedImage(null)}
                        className="w-full border-2 border-primary text-primary py-2 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                      >
                        Ganti Foto
                      </button>
                    </div>
                  ) : (
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="border-2 border-dashed border-primary rounded-xl p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors space-y-4">
                        <Upload className="w-8 h-8 text-primary mx-auto" />
                        <div>
                          <div className="font-semibold text-foreground">
                            Klik untuk upload foto
                          </div>
                          <div className="text-sm text-foreground/60">
                            atau drag & drop gambar
                          </div>
                        </div>
                      </div>
                    </label>
                  )}
                </div>

                {/* Step 4: Schedule & Location */}
                <div className="glass-effect rounded-2xl p-8 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-foreground">
                      4. Jadwal & Lokasi Setor
                    </h2>
                    <p className="text-sm text-foreground/60">
                      Pilih jadwal dan lokasi pengambilan
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Tanggal Setor *
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Lokasi Setor *
                      </label>
                      <select
                        value={selectedLocation || ""}
                        onChange={(e) => setSelectedLocation(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                      >
                        <option value="">Pilih lokasi...</option>
                        {LOCATIONS.map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {selectedLocation && (
                    <div className="glass-effect bg-primary/10 rounded-lg p-4">
                      <p className="text-sm text-foreground">
                        {LOCATIONS.find((l) => l.id === selectedLocation)?.address}
                      </p>
                    </div>
                  )}
                </div>

                {/* Step 5: Notes */}
                <div className="glass-effect rounded-2xl p-8 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-foreground">
                      5. Catatan Tambahan (Opsional)
                    </h2>
                  </div>

                  <textarea
                    placeholder="Tambahkan catatan atau keterangan khusus tentang sampah Anda..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                    isFormValid
                      ? "bg-primary text-white hover:bg-secondary"
                      : "bg-foreground/20 text-foreground/50 cursor-not-allowed"
                  }`}
                >
                  Konfirmasi Setoran
                </button>
              </>
            )}
          </form>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="glass-effect rounded-2xl p-6 space-y-4 bg-primary/10">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Informasi Penting
              </h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Pastikan sampah bersih dan kering</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Foto sampah harus jelas dan terlihat</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Verifikasi admin memerlukan 1-2 jam</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Saldo akan ditambah setelah verified</span>
                </li>
              </ul>
            </div>

            {/* Waste Prices */}
            <div className="glass-effect rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-foreground">Harga Sampah</h3>
              <div className="space-y-2">
                {WASTE_TYPES.map((waste) => (
                  <div key={waste.id} className="flex items-center justify-between py-2 border-b border-foreground/10">
                    <span className="text-sm text-foreground/70 flex items-center gap-2">
                      {waste.icon} {waste.name}
                    </span>
                    <span className="font-semibold text-primary">
                      Rp {waste.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Estimation */}
            {estimatedAmount > 0 && (
              <div className="glass-effect rounded-2xl p-6 space-y-4 bg-accent/10">
                <h3 className="font-bold text-foreground">Estimasi Anda</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Jenis</span>
                    <span className="font-semibold text-foreground">
                      {selectedWasteData?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Berat</span>
                    <span className="font-semibold text-foreground">
                      {weight} kg
                    </span>
                  </div>
                  <div className="border-t border-accent/30 pt-3 flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-accent">
                      Rp {estimatedAmount.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WasteBankDeposit;
