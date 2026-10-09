import { useEffect, useState } from "react";
import {
  Check,
  Calendar,
  Clock,
  ArrowRight,
  Building2,
  Smartphone,
  WalletCards,
  Copy,
  Timer,
  ShieldCheck,
  XCircle,
  CreditCard,
  Users,
  Phone,
  FileText,
  User,
  ChevronLeft,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BookingFormData {
  fullName: string;
  institution: string;
  bookingDate: string;
  participantCount: number;
  phone: string;
  paymentMethod: string;
  notes: string;
  agreeTerms: boolean;
}

type PaymentStatus = "idle" | "waiting" | "paid" | "expired" | "failed";

const PAYMENT_METHODS = [
  {
    id: "qris",
    name: "QRIS",
    description: "Bayar menggunakan QRIS",
    icon: Smartphone,
  },
  {
    id: "bank",
    name: "Transfer Bank",
    description: "Transfer melalui rekening bank",
    icon: Building2,
  },
  {
    id: "dana",
    name: "DANA",
    description: "Bayar menggunakan DANA",
    icon: WalletCards,
  },
  {
    id: "ovo",
    name: "OVO",
    description: "Bayar menggunakan OVO",
    icon: WalletCards,
  },
  {
    id: "gopay",
    name: "GoPay",
    description: "Bayar menggunakan GoPay",
    icon: WalletCards,
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    description: "Bayar menggunakan ShopeePay",
    icon: WalletCards,
  },
];

const EducationBooking = () => {
  const { id } = useParams();

  const [currentStep, setCurrentStep] = useState<
    "data" | "payment" | "confirm"
  >("data");

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    institution: "",
    bookingDate: "",
    participantCount: 1,
    phone: "",
    paymentMethod: "",
    notes: "",
    agreeTerms: false,
  });

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");

  const [paymentDeadline, setPaymentDeadline] = useState<number | null>(null);

  const [remainingTime, setRemainingTime] = useState(0);

  const [copied, setCopied] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  /*
   * ============================================================
   * MOCK CLASS DATA
   * ============================================================
   *
   * Nanti data ini bisa diganti dengan data dari API/database.
   */

  const classData = {
    id: 1,
    name: "Pertanian Modern & Sustainable",
    mentor: "Dr. Bambang Sutrisno",
    schedule: "Setiap Minggu, 10:00 AM",
    duration: "8 minggu",
    price: 150000,
    image: "🌾",
  };

  /*
   * ============================================================
   * HANDLE FORM CHANGE
   * ============================================================
   */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "participantCount" ? Number(value) : value,
    }));
  };

  /*
   * ============================================================
   * VALIDATION DATA
   * ============================================================
   */

  const isDataStepValid =
    formData.fullName.trim() !== "" &&
    formData.institution.trim() !== "" &&
    formData.bookingDate !== "" &&
    formData.participantCount > 0 &&
    formData.phone.trim() !== "";

  /*
   * ============================================================
   * PAYMENT TIMER
   * ============================================================
   *
   * Timer dimulai ketika user memilih metode pembayaran.
   *
   * Untuk frontend:
   * 30 menit dihitung menggunakan Date.now().
   *
   * Nanti ketika API sudah tersedia, deadline sebaiknya
   * berasal dari backend/server.
   */

  useEffect(() => {
    if (paymentStatus !== "waiting" || !paymentDeadline) {
      return;
    }

    const timer = setInterval(() => {
      const difference = paymentDeadline - Date.now();

      if (difference <= 0) {
        clearInterval(timer);

        setRemainingTime(0);
        setPaymentStatus("expired");

        return;
      }

      setRemainingTime(Math.ceil(difference / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [paymentStatus, paymentDeadline]);

  /*
   * ============================================================
   * SELECT PAYMENT METHOD
   * ============================================================
   */

  const handleSelectPaymentMethod = (methodId: string) => {
    const deadline = Date.now() + 30 * 60 * 1000;

    setFormData((prev) => ({
      ...prev,
      paymentMethod: methodId,
    }));

    setPaymentDeadline(deadline);
    setRemainingTime(30 * 60);

    setPaymentStatus("waiting");
  };

  /*
   * ============================================================
   * FORMAT TIMER
   * ============================================================
   */

  const formatRemainingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  /*
   * ============================================================
   * SIMULATE PAYMENT
   * ============================================================
   *
   * HANYA UNTUK FRONTEND TESTING.
   *
   * Nanti saat API/payment gateway sudah ada,
   * fungsi ini dihapus.
   */

  const handleSimulatePayment = () => {
    if (paymentStatus !== "waiting") {
      return;
    }

    setPaymentStatus("paid");
  };

  /*
   * ============================================================
   * RESET PAYMENT
   * ============================================================
   */

  const resetPayment = () => {
    setPaymentStatus("idle");
    setPaymentDeadline(null);
    setRemainingTime(0);

    setFormData((prev) => ({
      ...prev,
      paymentMethod: "",
    }));
  };

  /*
   * ============================================================
   * COPY REKENING
   * ============================================================
   */

  const handleCopyAccount = async (accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Gagal menyalin nomor rekening:", error);
    }
  };

  /*
   * ============================================================
   * SUBMIT BOOKING
   * ============================================================
   */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /*
     * Booking tidak boleh dikonfirmasi
     * sebelum pembayaran berhasil.
     */

    if (paymentStatus !== "paid" || !formData.agreeTerms) {
      return;
    }

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      window.location.href = "/education";
    }, 3000);
  };

  /*
   * ============================================================
   * PAYMENT METHOD NAME
   * ============================================================
   */

  const selectedPaymentMethod = PAYMENT_METHODS.find(
    (method) => method.id === formData.paymentMethod,
  );

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <div className="w-full">
      <Navbar />

      {/* ======================================================
          SUCCESS MODAL
          ====================================================== */}

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-2xl p-8 max-w-sm w-full text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-accent" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary mb-2">
                Booking Berhasil!
              </h2>

              <p className="text-foreground/70 mb-4">{classData.name}</p>

              <p className="text-sm text-foreground/60">
                Pembayaran berhasil diterima dan booking Anda telah
                dikonfirmasi.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          MAIN CONTENT
          ====================================================== */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* HEADER */}

        <div className="mb-8">
          <Link
            to={`/education/${id}`}
            className="text-primary font-semibold hover:text-secondary mb-4 inline-flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Detail Kelas
          </Link>

          <h1 className="text-4xl font-poppins font-bold text-secondary mb-2">
            Booking Kelas
          </h1>

          <p className="text-foreground/70">
            Daftar kelas untuk memulai perjalanan belajar Anda
          </p>
        </div>

        {/* ====================================================
            GRID
            ==================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================================================
              LEFT FORM
              ================================================== */}

          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* ==================================================
                STEP INDICATOR
                ================================================== */}

            <div className="flex gap-4 justify-between mb-8">
              {["data", "payment", "confirm"].map((step, idx) => {
                const steps = ["data", "payment", "confirm"];

                const currentIndex = steps.indexOf(currentStep);

                return (
                  <div key={step} className="flex-1">
                    <div
                      className={`h-2 rounded-full mb-2 transition-colors ${
                        currentIndex >= idx ? "bg-primary" : "bg-foreground/20"
                      }`}
                    />

                    <p className="text-xs font-semibold text-center text-foreground/60">
                      {step === "data" && "Data Pribadi"}

                      {step === "payment" && "Pembayaran"}

                      {step === "confirm" && "Konfirmasi"}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* ==================================================
                STEP 1 - DATA PRIBADI
                ================================================== */}

            {currentStep === "data" && (
              <div className="glass-effect rounded-2xl p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Data Pribadi
                  </h2>

                  <p className="text-sm text-foreground/60 mt-1">
                    Lengkapi data untuk melakukan booking kelas.
                  </p>
                </div>

                {/* NAMA */}

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nama Lengkap *
                  </label>

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* INSTANSI */}

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nama Instansi *
                  </label>

                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />

                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      placeholder="Contoh: SMKN 1 Banyuwangi"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* TANGGAL */}

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Tanggal Kunjungan *
                  </label>

                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />

                    <input
                      type="date"
                      name="bookingDate"
                      value={formData.bookingDate}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* JUMLAH PESERTA */}

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Kapasitas Peserta *
                  </label>

                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />

                    <input
                      type="number"
                      min={1}
                      name="participantCount"
                      value={formData.participantCount}
                      onChange={handleChange}
                      placeholder="Jumlah peserta"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* NOMOR HP */}

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nomor HP *
                  </label>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="08xxxxxxxxxx"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* CATATAN */}

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Catatan Tambahan
                    <span className="font-normal text-foreground/50">
                      {" "}
                      (Opsional)
                    </span>
                  </label>

                  <div className="relative">
                    <FileText className="absolute left-4 top-4 w-4 h-4 text-foreground/40" />

                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Tambahkan catatan jika ada..."
                      rows={4}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* NEXT */}

                <button
                  type="button"
                  onClick={() => setCurrentStep("payment")}
                  disabled={!isDataStepValid}
                  className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                    isDataStepValid
                      ? "bg-primary text-white hover:bg-secondary"
                      : "bg-foreground/20 text-foreground/50 cursor-not-allowed"
                  }`}
                >
                  Lanjut ke Pembayaran
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* ==================================================
                STEP 2 - PEMBAYARAN
                ================================================== */}

            {currentStep === "payment" && (
              <div className="glass-effect rounded-2xl p-8 space-y-6">
                {/* HEADER */}

                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Pembayaran
                  </h2>

                  <p className="text-sm text-foreground/60 mt-1">
                    Pilih metode pembayaran yang ingin digunakan.
                  </p>
                </div>

                {/* =================================================
                    IDLE - PILIH METODE
                    ================================================= */}

                {paymentStatus === "idle" && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Pilih Metode Pembayaran
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {PAYMENT_METHODS.map((method) => {
                        const Icon = method.icon;

                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => handleSelectPaymentMethod(method.id)}
                            className="p-5 rounded-xl border-2 border-foreground/10 hover:border-primary hover:bg-primary/5 transition-all text-left"
                          >
                            <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 mb-3">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>

                            <p className="font-bold text-foreground">
                              {method.name}
                            </p>

                            <p className="text-xs text-foreground/60 mt-1">
                              {method.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentStep("data")}
                      className="mt-6 flex items-center gap-2 text-primary font-semibold hover:text-secondary"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Kembali ke Data
                    </button>
                  </div>
                )}

                {/* =================================================
                    WAITING PAYMENT
                    ================================================= */}

                {paymentStatus === "waiting" && (
                  <div className="space-y-6">
                    {/* TIMER */}

                    <div className="rounded-xl border border-orange-300 bg-orange-50 p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center">
                          <Timer className="w-5 h-5 text-orange-600" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-orange-800">
                            Selesaikan pembayaran dalam
                          </p>

                          <p className="text-3xl font-bold text-orange-600 tracking-wider">
                            {formatRemainingTime(remainingTime)}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-orange-700 mt-3">
                        Jika pembayaran tidak diselesaikan dalam 30 menit,
                        booking akan otomatis dibatalkan.
                      </p>
                    </div>

                    {/* DETAIL PAYMENT */}

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <p className="text-xs text-foreground/60">
                            Metode pembayaran
                          </p>

                          <p className="text-lg font-bold text-foreground">
                            {selectedPaymentMethod?.name}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-primary">
                          <ShieldCheck className="w-5 h-5" />

                          <span className="text-sm font-semibold">
                            Menunggu pembayaran
                          </span>
                        </div>
                      </div>

                      {/* QRIS */}

                      {formData.paymentMethod === "qris" && (
                        <div className="text-center">
                          <div className="bg-white rounded-xl p-5 inline-block shadow-sm">
                            <img
                              src="/payment/qris.png"
                              alt="QRIS pembayaran"
                              className="w-56 h-56 object-contain mx-auto"
                            />
                          </div>

                          <div className="mt-5">
                            <p className="text-sm text-foreground/60">
                              Total pembayaran
                            </p>

                            <p className="text-3xl font-bold text-primary">
                              Rp {classData.price.toLocaleString("id-ID")}
                            </p>
                          </div>

                          <p className="text-xs text-foreground/60 mt-3">
                            Scan QRIS menggunakan aplikasi pembayaran yang
                            mendukung QRIS.
                          </p>
                        </div>
                      )}

                      {/* BANK */}

                      {formData.paymentMethod === "bank" && (
                        <div className="space-y-5">
                          <div className="rounded-lg bg-white/70 p-5">
                            <p className="text-sm text-foreground/60">Bank</p>

                            <p className="font-bold text-lg">Bank BCA</p>

                            <div className="flex items-center justify-between mt-4">
                              <div>
                                <p className="text-sm text-foreground/60">
                                  Nomor Rekening
                                </p>

                                <p className="text-2xl font-bold tracking-wide">
                                  1234567890
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleCopyAccount("1234567890")}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                              >
                                <Copy className="w-4 h-4" />

                                {copied ? "Tersalin" : "Salin"}
                              </button>
                            </div>

                            <p className="text-sm text-foreground/60 mt-4">
                              Atas nama
                            </p>

                            <p className="font-semibold">
                              Integrated Farming Ketapang
                            </p>
                          </div>

                          <div className="text-center">
                            <p className="text-sm text-foreground/60">
                              Total transfer
                            </p>

                            <p className="text-3xl font-bold text-primary">
                              Rp {classData.price.toLocaleString("id-ID")}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* E-WALLET */}

                      {["dana", "ovo", "gopay", "shopeepay"].includes(
                        formData.paymentMethod,
                      ) && (
                        <div className="text-center">
                          <div className="rounded-xl bg-white/70 p-6">
                            <p className="text-sm text-foreground/60">
                              Nomor pembayaran
                            </p>

                            <p className="text-2xl font-bold mt-2">
                              081234567890
                            </p>

                            <p className="text-sm text-foreground/60 mt-3">
                              a.n. IFK Banyuwangi
                            </p>
                          </div>

                          <div className="mt-5">
                            <p className="text-sm text-foreground/60">
                              Total pembayaran
                            </p>

                            <p className="text-3xl font-bold text-primary">
                              Rp {classData.price.toLocaleString("id-ID")}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SECURITY INFO */}

                    <div className="rounded-xl bg-blue-50 border border-blue-200 p-5">
                      <div className="flex gap-3">
                        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />

                        <div>
                          <p className="font-semibold text-blue-900">
                            Pembayaran aman
                          </p>

                          <p className="text-sm text-blue-800 mt-1">
                            Booking Anda sedang menunggu pembayaran. Selesaikan
                            pembayaran sebelum waktu habis.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* FRONTEND TEST */}

                    <div className="rounded-xl border border-dashed border-primary/30 p-4">
                      <p className="text-xs text-foreground/50 mb-3">
                        MODE FRONTEND / TESTING
                      </p>

                      <button
                        type="button"
                        onClick={handleSimulatePayment}
                        className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition-colors"
                      >
                        Simulasikan Pembayaran Berhasil
                      </button>

                      <p className="text-xs text-foreground/50 mt-2 text-center">
                        Tombol ini hanya untuk testing. Nantinya status
                        pembayaran akan diterima otomatis dari API/payment
                        gateway.
                      </p>
                    </div>

                    {/* CHANGE PAYMENT */}

                    <button
                      type="button"
                      onClick={() => {
                        resetPayment();
                      }}
                      className="w-full border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-primary/10 transition-colors"
                    >
                      Ganti Metode Pembayaran
                    </button>
                  </div>
                )}

                {/* =================================================
                    PAYMENT SUCCESS
                    ================================================= */}

                {paymentStatus === "paid" && (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-6 h-6 text-green-600" />
                      </div>

                      <div>
                        <p className="font-bold text-green-800 text-lg">
                          Pembayaran Berhasil
                        </p>

                        <p className="text-sm text-green-700">
                          Pembayaran Anda telah diterima.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-5 border-t border-green-200 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700">
                          Metode pembayaran
                        </span>

                        <span className="font-semibold text-green-800">
                          {selectedPaymentMethod?.name}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm text-green-700">
                          Total pembayaran
                        </span>

                        <span className="font-bold text-green-800">
                          Rp {classData.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentStep("confirm")}
                      className="w-full mt-5 bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
                    >
                      Lanjut ke Konfirmasi
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* =================================================
                    PAYMENT EXPIRED
                    ================================================= */}

                {paymentStatus === "expired" && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                      <XCircle className="w-7 h-7 text-red-600" />
                    </div>

                    <h3 className="text-xl font-bold text-red-800 mt-4">
                      Waktu Pembayaran Habis
                    </h3>

                    <p className="text-sm text-red-700 mt-2">
                      Pembayaran tidak diselesaikan dalam waktu 30 menit.
                      Booking ini otomatis dibatalkan.
                    </p>

                    <button
                      type="button"
                      onClick={resetPayment}
                      className="mt-5 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-secondary transition-colors"
                    >
                      Pilih Metode Pembayaran Lagi
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ==================================================
                STEP 3 - KONFIRMASI
                ================================================== */}

            {currentStep === "confirm" && (
              <div className="glass-effect rounded-2xl p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Konfirmasi Booking
                  </h2>

                  <p className="text-sm text-foreground/60 mt-1">
                    Periksa kembali data Anda sebelum menyelesaikan booking.
                  </p>
                </div>

                {/* PAYMENT STATUS */}

                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>

                    <div>
                      <p className="font-bold text-green-800">
                        Pembayaran Berhasil
                      </p>

                      <p className="text-xs text-green-700">
                        Metode: {selectedPaymentMethod?.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* DATA BOOKING */}

                <div className="space-y-4 bg-primary/10 rounded-lg p-6">
                  <h3 className="font-bold text-foreground">
                    Data Booking Anda
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between gap-4 pb-3 border-b">
                      <span className="text-foreground/70">Nama</span>

                      <span className="font-semibold text-foreground text-right">
                        {formData.fullName}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 pb-3 border-b">
                      <span className="text-foreground/70">Instansi</span>

                      <span className="font-semibold text-foreground text-right">
                        {formData.institution}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 pb-3 border-b">
                      <span className="text-foreground/70">Tanggal</span>

                      <span className="font-semibold text-foreground text-right">
                        {formData.bookingDate}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 pb-3 border-b">
                      <span className="text-foreground/70">Jumlah Peserta</span>

                      <span className="font-semibold text-foreground text-right">
                        {formData.participantCount} Orang
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 pb-3 border-b">
                      <span className="text-foreground/70">Nomor HP</span>

                      <span className="font-semibold text-foreground text-right">
                        {formData.phone}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 pb-3 border-b">
                      <span className="text-foreground/70">
                        Metode Pembayaran
                      </span>

                      <span className="font-semibold text-foreground text-right">
                        {selectedPaymentMethod?.name}
                      </span>
                    </div>

                    {formData.notes && (
                      <div className="flex justify-between gap-4 pb-3 border-b">
                        <span className="text-foreground/70">Catatan</span>

                        <span className="font-semibold text-foreground text-right max-w-[60%]">
                          {formData.notes}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between font-bold">
                      <span className="text-foreground">Total</span>

                      <span className="text-primary text-lg">
                        Rp {classData.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* TERMS */}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreeTerms: e.target.checked,
                      }))
                    }
                    className="mt-1 w-4 h-4 accent-primary rounded"
                  />

                  <span className="text-sm text-foreground/70">
                    Saya menyetujui{" "}
                    <a
                      href="#"
                      className="text-primary font-semibold hover:text-secondary"
                    >
                      syarat & ketentuan
                    </a>{" "}
                    booking kelas.
                  </span>
                </label>

                {/* BUTTON */}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("payment")}
                    className="flex-1 border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-primary/10 transition-colors"
                  >
                    Kembali
                  </button>

                  <button
                    type="submit"
                    disabled={!formData.agreeTerms || paymentStatus !== "paid"}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                      formData.agreeTerms && paymentStatus === "paid"
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

          {/* ====================================================
              RIGHT SUMMARY CARD
              ==================================================== */}

          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-8 space-y-6 sticky top-24 h-fit bg-primary/10">
              {/* CLASS */}

              <div>
                <p className="text-foreground/70 text-sm mb-2">
                  Kelas yang Anda Booking
                </p>

                <h3 className="text-xl font-bold text-foreground">
                  {classData.name}
                </h3>
              </div>

              {/* CLASS INFO */}

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{classData.image}</span>

                  <div>
                    <p className="text-xs text-foreground/60">Mentor</p>

                    <p className="font-semibold text-foreground">
                      {classData.mentor}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <Calendar className="w-4 h-4" />

                  {classData.schedule}
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <Clock className="w-4 h-4" />

                  {classData.duration}
                </div>
              </div>

              {/* PRICE */}

              <div className="border-t border-primary/30 pt-6">
                <p className="text-foreground/70 text-sm mb-2">
                  Total Pembayaran
                </p>

                <p className="text-3xl font-bold text-primary mb-4">
                  Rp {classData.price.toLocaleString("id-ID")}
                </p>

                <p className="text-xs text-foreground/60">
                  Pembayaran dilakukan satu kali untuk akses kelas.
                </p>
              </div>

              {/* PAYMENT STATUS CARD */}

              {paymentStatus === "waiting" && (
                <div className="rounded-lg bg-orange-50 border border-orange-200 p-4">
                  <div className="flex items-center gap-3">
                    <Timer className="w-5 h-5 text-orange-600" />

                    <div>
                      <p className="text-xs text-orange-700">
                        Batas pembayaran
                      </p>

                      <p className="font-bold text-orange-700">
                        {formatRemainingTime(remainingTime)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {paymentStatus === "paid" && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />

                    <div>
                      <p className="text-xs text-green-700">
                        Status pembayaran
                      </p>

                      <p className="font-bold text-green-700">
                        Pembayaran Berhasil
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* INFO */}

              <div className="glass-effect bg-white/50 rounded-lg p-4 space-y-2 text-sm">
                <p className="font-semibold text-foreground">Info Penting</p>

                <ul className="space-y-1 text-foreground/70 text-xs">
                  <li>
                    <Check className="w-3 h-3 inline mr-1" />
                    Akses kelas sesuai jadwal
                  </li>

                  <li>
                    <Check className="w-3 h-3 inline mr-1" />
                    Sertifikat resmi
                  </li>

                  <li>
                    <Check className="w-3 h-3 inline mr-1" />
                    Pembayaran aman
                  </li>

                  <li>
                    <Check className="w-3 h-3 inline mr-1" />
                    Booking otomatis dibatalkan jika pembayaran melewati batas
                    waktu
                  </li>
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
