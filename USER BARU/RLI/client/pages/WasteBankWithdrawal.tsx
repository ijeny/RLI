import { useState } from "react";
import { ArrowUpRight, AlertCircle, Check, Copy, Info } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PAYMENT_METHODS = [
  {
    id: "bank",
    name: "Transfer Bank",
    icon: "🏦",
    description: "Ke rekening bank Anda",
  },
  {
    id: "dana",
    name: "Dana",
    icon: "💰",
    description: "E-wallet Dana",
  },
  {
    id: "ovo",
    name: "OVO",
    icon: "🔵",
    description: "E-wallet OVO",
  },
  {
    id: "gopay",
    name: "GoPay",
    icon: "🚗",
    description: "E-wallet GoPay",
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    icon: "🛒",
    description: "E-wallet ShopeePay",
  },
];

const BANKS = [
  { id: 1, name: "Bank Mandiri", code: "008" },
  { id: 2, name: "Bank BCA", code: "002" },
  { id: 3, name: "Bank BNI", code: "009" },
  { id: 4, name: "Bank BTN", code: "073" },
  { id: 5, name: "Bank CIMB", code: "022" },
];

const WasteBankWithdrawal = () => {
  const [currentStep, setCurrentStep] = useState<"method" | "form" | "confirm" | "success">("method");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState<number | null>(null);
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const userBalance = 1250000;
  const minWithdraw = 50000;
  const maxWithdraw = userBalance;
  const fee = amount ? Math.ceil(parseInt(amount) * 0.01) : 0; // 1% fee
  const totalDeduct = amount ? parseInt(amount) + fee : 0;

  const isFormValid = amount && recipientName && accountNumber && (selectedMethod !== "bank" || selectedBank);

  const handleNext = () => {
    if (selectedMethod) {
      setCurrentStep("form");
    }
  };

  const handleConfirm = () => {
    if (isFormValid) {
      setCurrentStep("confirm");
    }
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      // Reset form
      setCurrentStep("method");
      setSelectedMethod(null);
      setAmount("");
      setRecipientName("");
      setAccountNumber("");
      setSelectedBank(null);
      setPhone("");
      setNotes("");
      setShowSuccess(false);
    }, 3000);
  };

  const methodLabel =
    PAYMENT_METHODS.find((m) => m.id === selectedMethod)?.name ||
    (selectedBank ? BANKS.find((b) => b.id === selectedBank)?.name : "");

  return (
    <div className="w-full">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/waste-bank" className="text-primary font-semibold hover:text-secondary mb-4 inline-flex items-center gap-2">
            ← Kembali
          </Link>
          <h1 className="text-4xl font-poppins font-bold text-secondary mb-2">
            Tarik Saldo
          </h1>
          <p className="text-foreground/70">
            Tarik saldo tabungan sampah Anda ke bank atau e-wallet
          </p>
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
                  Permintaan Withdrawal Berhasil!
                </h2>
                <p className="text-foreground/70 mb-4">
                  Jumlah: <span className="font-bold text-primary">Rp {parseInt(amount).toLocaleString("id-ID")}</span>
                </p>
                <p className="text-sm text-foreground/60">
                  Verifikasi admin memerlukan 1-2 jam. Saldo akan masuk setelah verified.
                </p>
              </div>
              <Link to="/waste-bank" className="btn-primary w-full">
                Kembali ke Dashboard
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Select Payment Method */}
            {currentStep === "method" && (
              <div className="glass-effect rounded-2xl p-8 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    1. Pilih Metode Penarikan
                  </h2>
                  <p className="text-foreground/60">
                    Pilih metode penerima dana yang Anda inginkan
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-6 rounded-xl border-2 text-center space-y-3 transition-all ${
                        selectedMethod === method.id
                          ? "border-primary bg-primary/10"
                          : "border-foreground/20 hover:border-primary/50"
                      }`}
                    >
                      <div className="text-4xl">{method.icon}</div>
                      <div>
                        <div className="font-bold text-foreground">{method.name}</div>
                        <div className="text-xs text-foreground/60">
                          {method.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={!selectedMethod}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    selectedMethod
                      ? "bg-primary text-white hover:bg-secondary"
                      : "bg-foreground/20 text-foreground/50 cursor-not-allowed"
                  }`}
                >
                  Lanjut
                </button>
              </div>
            )}

            {/* Step 2: Fill Form */}
            {currentStep === "form" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleConfirm();
                }}
                className="space-y-6"
              >
                {/* Amount */}
                <div className="glass-effect rounded-2xl p-8 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">
                      2. Jumlah Penarikan
                    </h2>
                    <p className="text-foreground/60">
                      Masukkan jumlah yang ingin ditarik (Min. Rp {minWithdraw.toLocaleString("id-ID")})
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Jumlah (Rp) *
                    </label>
                    <input
                      type="number"
                      min={minWithdraw}
                      max={maxWithdraw}
                      step="10000"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none text-lg"
                    />
                    <div className="mt-2 text-xs text-foreground/60">
                      Saldo tersedia: Rp {userBalance.toLocaleString("id-ID")}
                    </div>
                  </div>

                  {amount && (
                    <div className="glass-effect bg-primary/10 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Jumlah Penarikan</span>
                        <span className="font-semibold">
                          Rp {parseInt(amount).toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Admin Fee (1%)</span>
                        <span className="font-semibold">
                          Rp {fee.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="border-t border-primary/20 pt-2 flex justify-between font-bold">
                        <span>Total Dipotong</span>
                        <span className="text-primary">
                          Rp {totalDeduct.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recipient Data */}
                <div className="glass-effect rounded-2xl p-8 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">
                      3. Data Penerima
                    </h2>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Nama Penerima *
                    </label>
                    <input
                      type="text"
                      placeholder="Nama lengkap"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>

                  {selectedMethod === "bank" ? (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Bank *
                        </label>
                        <select
                          value={selectedBank || ""}
                          onChange={(e) => setSelectedBank(Number(e.target.value))}
                          className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                        >
                          <option value="">Pilih bank...</option>
                          {BANKS.map((bank) => (
                            <option key={bank.id} value={bank.id}>
                              {bank.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Nomor Rekening *
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: 1234567890"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                        />
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Nomor {methodLabel} *
                      </label>
                      <input
                        type="text"
                        placeholder="Nomor telepon atau ID"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Catatan (Opsional)
                    </label>
                    <textarea
                      placeholder="Tambahkan catatan jika ada..."
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    isFormValid
                      ? "bg-primary text-white hover:bg-secondary"
                      : "bg-foreground/20 text-foreground/50 cursor-not-allowed"
                  }`}
                >
                  Verifikasi
                </button>
              </form>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === "confirm" && (
              <div className="glass-effect rounded-2xl p-8 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    3. Verifikasi Penarikan
                  </h2>
                  <p className="text-foreground/60">
                    Periksa kembali data Anda sebelum melakukan penarikan
                  </p>
                </div>

                <div className="space-y-4 bg-primary/10 rounded-lg p-6">
                  <h3 className="font-bold text-foreground">Detail Penarikan</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-foreground/70">Metode</span>
                      <span className="font-semibold text-foreground">{methodLabel}</span>
                    </div>

                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-foreground/70">Penerima</span>
                      <span className="font-semibold text-foreground">
                        {recipientName}
                      </span>
                    </div>

                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-foreground/70">
                        {selectedMethod === "bank" ? "Rekening" : "Nomor"}
                      </span>
                      <span className="font-mono font-semibold text-foreground">
                        {accountNumber}
                      </span>
                    </div>

                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-foreground/70">Jumlah</span>
                      <span className="font-bold text-primary text-lg">
                        Rp {parseInt(amount).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex justify-between pb-3 border-b">
                      <span className="text-foreground/70">Admin Fee</span>
                      <span className="font-semibold text-foreground">
                        Rp {fee.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-foreground">Total Dipotong</span>
                      <span className="text-primary">
                        Rp {totalDeduct.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="glass-effect bg-amber-100/50 border border-amber-300 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-700">
                    Verifikasi admin memerlukan 1-2 jam. Pastikan data yang Anda masukkan sudah benar.
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep("form")}
                    className="flex-1 border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-primary/10 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition-colors"
                  >
                    Konfirmasi Penarikan
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Balance Info */}
            <div className="glass-effect rounded-2xl p-6 space-y-4 bg-primary/10">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-primary" />
                Informasi Penarikan
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-foreground/60 mb-1">Saldo Anda</div>
                  <div className="text-2xl font-bold text-primary">
                    Rp {userBalance.toLocaleString("id-ID")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-foreground/60 mb-1">Minimum Penarikan</div>
                  <div className="font-semibold text-foreground">
                    Rp {minWithdraw.toLocaleString("id-ID")}
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Info */}
            <div className="glass-effect rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Biaya Admin
              </h3>
              <div className="space-y-2 text-sm text-foreground/70">
                <p>
                  Admin fee sebesar <span className="font-bold text-foreground">1%</span> akan dipotong dari jumlah penarikan Anda.
                </p>
                <p>
                  Contoh: Tarik Rp 100.000 → Biaya Rp 1.000 → Diterima Rp 99.000
                </p>
              </div>
            </div>

            {/* Processing Time */}
            <div className="glass-effect rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-foreground">Waktu Proses</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Verifikasi Admin</span>
                  <span className="font-semibold text-foreground">1-2 jam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Transfer Dana</span>
                  <span className="font-semibold text-foreground">1-2 hari kerja</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WasteBankWithdrawal;
