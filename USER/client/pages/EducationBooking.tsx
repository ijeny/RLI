import { useState, useEffect } from "react";
import { Upload, Check, AlertCircle, Calendar, Users, Clock, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoadingState, ErrorState } from "@/components/StateComponents";
import { getEducationClassById } from "@/services/educationService";
import { EducationClass } from "@/types";

interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: string;
  uploadedFile: string | null;
  notes: string;
  agreeTerms: boolean;
}

const PAYMENT_METHODS = [
  { id: "qris", name: "QRIS", icon: "📱" },
  { id: "bank", name: "Transfer Bank", icon: "🏦" },
  { id: "dana", name: "Dana", icon: "💰" },
  { id: "ovo", name: "OVO", icon: "🔵" },
  { id: "gopay", name: "GoPay", icon: "🚗" },
  { id: "shopeepay", name: "ShopeePay", icon: "🛒" },
];

const EducationBooking = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState<"data" | "payment" | "confirm" | "success">("data");
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "",
    uploadedFile: null,
    notes: "",
    agreeTerms: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [classData, setClassData] = useState<EducationClass | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        if (!id) throw new Error("ID kelas tidak ditemukan");
        setLoading(true);
        setError(null);
        const data = await getEducationClassById(parseInt(id));
        setClassData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat data kelas");
      } finally {
        setLoading(false);
      }
    };
    fetchClass();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        uploadedFile: file.name,
      }));
    }
  };

  const isDataStepValid = formData.fullName && formData.email && formData.phone;
  const isPaymentStepValid = formData.paymentMethod && formData.uploadedFile;
  const isFormValid = isDataStepValid && isPaymentStepValid && formData.agreeTerms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && classData) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        window.location.href = "/education";
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex items-center justify-center">
          <LoadingState />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !classData) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex items-center justify-center">
          <ErrorState
            title="Kelas tidak ditemukan"
            message={error || "Detail kelas yang ingin Anda booking tidak tersedia."}
            onRetry={() => window.location.reload()}
          />
        </div>
        <Footer />
      </div>
    );
  }

  const classNameStr = classData.title || classData.name || "Kelas Edukasi";
  const mentorName = typeof classData.mentor === "object" ? classData.mentor.name : (classData.mentor || "Mentor IFK");
  const scheduleStr = classData.schedule || classData.date || "Jadwal Terbuka";
  const durationStr = classData.duration || "Sesi Terjadwal";
  const priceVal = classData.price || 0;
  const imageStr = classData.image || "🌾";

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
                Booking Berhasil! 🎉
              </h2>
              <p className="text-foreground/70 mb-4">
                {classNameStr}
              </p>
              <p className="text-sm text-foreground/60">
                Tunggu verifikasi admin. Anda akan menerima email konfirmasi dalam beberapa jam.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to={`/education/${id}`} className="text-primary font-semibold hover:text-secondary mb-4 inline-flex items-center gap-2">
            ← Kembali ke Detail Kelas
          </Link>
          <h1 className="text-4xl font-poppins font-bold text-secondary mb-2">
            Booking Kelas
          </h1>
          <p className="text-foreground/70">
            Daftar kelas untuk memulai perjalanan belajar Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Step Indicator */}
            <div className="flex gap-4 justify-between mb-8">
              {["data", "payment", "confirm"].map((step, idx) => (
                <div key={step} className="flex-1">
                  <div
                    className={`h-2 rounded-full mb-2 transition-colors ${
                      ["data", "payment", "confirm"].indexOf(currentStep) >= idx
                        ? "bg-primary"
                        : "bg-foreground/20"
                    }`}
                  ></div>
                  <p className="text-xs font-semibold text-center text-foreground/60">
                    {step === "data" && "Data Pribadi"}
                    {step === "payment" && "Pembayaran"}
                    {step === "confirm" && "Konfirmasi"}
                  </p>
                </div>
              ))}
            </div>

            {/* Step 1: Data Pribadi */}
            {currentStep === "data" && (
              <div className="glass-effect rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Data Pribadi</h2>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
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
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nomor HP *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Catatan Tambahan (Opsional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Tambahkan catatan jika ada..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep("payment")}
                  disabled={!isDataStepValid}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    isDataStepValid
                      ? "bg-primary text-white hover:bg-secondary"
                      : "bg-foreground/20 text-foreground/50 cursor-not-allowed"
                  }`}
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            )}

            {/* Step 2: Pembayaran */}
            {currentStep === "payment" && (
              <div className="glass-effect rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Metode Pembayaran</h2>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Pilih Metode Pembayaran *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: method.id }))}
                        className={`p-4 rounded-lg border-2 text-center space-y-2 transition-all ${
                          formData.paymentMethod === method.id
                            ? "border-primary bg-primary/10"
                            : "border-foreground/20 hover:border-primary/50"
                        }`}
                      >
                        <div className="text-3xl">{method.icon}</div>
                        <div className="text-xs font-semibold text-foreground">{method.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.paymentMethod && (
                  <div className="glass-effect bg-primary/10 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      Silakan transfer sesuai nominal, kemudian upload bukti pembayaran di bawah.
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Upload Bukti Pembayaran *
                  </label>
                  {formData.uploadedFile ? (
                    <div className="glass-effect rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">✓</span>
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            {formData.uploadedFile}
                          </p>
                          <p className="text-xs text-foreground/60">Berhasil diunggah</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, uploadedFile: null }))}
                        className="text-primary hover:text-secondary font-semibold text-sm"
                      >
                        Ganti
                      </button>
                    </div>
                  ) : (
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="border-2 border-dashed border-primary rounded-lg p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors space-y-2">
                        <Upload className="w-8 h-8 text-primary mx-auto" />
                        <div>
                          <p className="font-semibold text-foreground">Klik untuk upload foto</p>
                          <p className="text-xs text-foreground/60">atau drag & drop gambar</p>
                        </div>
                      </div>
                    </label>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("data")}
                    className="flex-1 border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-primary/10 transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep("confirm")}
                    disabled={!isPaymentStepValid}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                      isPaymentStepValid
                        ? "bg-primary text-white hover:bg-secondary"
                        : "bg-foreground/20 text-foreground/50 cursor-not-allowed"
                    }`}
                  >
                    Lanjut ke Konfirmasi
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Konfirmasi */}
            {currentStep === "confirm" && (
              <div className="glass-effect rounded-2xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Konfirmasi Booking</h2>

                <div className="space-y-4 bg-primary/10 rounded-lg p-6">
                  <h3 className="font-bold text-foreground">Data Booking Anda</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-foreground/70">Nama</span>
                      <span className="font-semibold text-foreground">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-foreground/70">Email</span>
                      <span className="font-semibold text-foreground">{formData.email}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-foreground/70">HP</span>
                      <span className="font-semibold text-foreground">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-foreground/70">Metode</span>
                      <span className="font-semibold text-foreground">
                        {PAYMENT_METHODS.find((m) => m.id === formData.paymentMethod)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary text-lg">
                        Rp {priceVal.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, agreeTerms: e.target.checked }))
                    }
                    className="mt-1 w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-sm text-foreground/70">
                    Saya menyetujui{" "}
                    <a href="#" className="text-primary font-semibold hover:text-secondary">
                      syarat & ketentuan
                    </a>{" "}
                    booking kelas
                  </span>
                </label>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("payment")}
                    className="flex-1 border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-primary/10 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.agreeTerms}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                      formData.agreeTerms
                        ? "bg-primary text-white hover:bg-secondary"
                        : "bg-foreground/20 text-foreground/50 cursor-not-allowed"
                    }`}
                  >
                    Konfirmasi Booking
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Right - Summary Card */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-8 space-y-6 sticky top-24 h-fit bg-primary/10">
              <div>
                <p className="text-foreground/70 text-sm mb-2">Kelas yang Anda Booking</p>
                <h3 className="text-xl font-bold text-foreground">{classNameStr}</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{imageStr}</span>
                  <div>
                    <p className="text-xs text-foreground/60">Mentor</p>
                    <p className="font-semibold text-foreground">{mentorName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <Calendar className="w-4 h-4" />
                  {scheduleStr}
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <Clock className="w-4 h-4" />
                  {durationStr}
                </div>
              </div>

              <div className="border-t border-primary/30 pt-6">
                <p className="text-foreground/70 text-sm mb-2">Total Pembayaran</p>
                <p className="text-3xl font-bold text-primary mb-4">
                  Rp {priceVal.toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-foreground/60">
                  Pembayaran hanya dilakukan sekali untuk akses seumur hidup
                </p>
              </div>

              <div className="glass-effect bg-white/50 rounded-lg p-4 space-y-2 text-sm">
                <p className="font-semibold text-foreground">Info Penting</p>
                <ul className="space-y-1 text-foreground/70 text-xs">
                  <li>✓ Akses seumur hidup</li>
                  <li>✓ Sertifikat resmi</li>
                  <li>✓ Verifikasi dalam 1 jam</li>
                  <li>✓ Garansi uang kembali</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EducationBooking;
