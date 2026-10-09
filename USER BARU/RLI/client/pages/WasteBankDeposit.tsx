import { useEffect, useState } from "react";
import {
  Upload,
  AlertCircle,
  Check,
  Calendar,
  MapPin,
  MessageSquare,
  Recycle,
  Sprout,
  ExternalLink,
  Clock3,
  XCircle,
  Pencil,
  RotateCcw,
  CircleCheck,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* =========================================================
   JENIS SAMPAH
========================================================= */

const WASTE_TYPES = [
  {
    id: 1,
    name: "Organik",
    price: 3000,
    icon: Sprout,
    color: "bg-lime-50 border-lime-300",
    description: "Sisa makanan, daun, dan limbah yang mudah terurai",
  },
  {
    id: 2,
    name: "Anorganik",
    price: 10000,
    icon: Recycle,
    color: "bg-blue-50 border-blue-300",
    description:
      "Plastik, kertas, logam, kaca, dan bahan yang dapat didaur ulang",
  },
];

/* =========================================================
   LOKASI SETOR
========================================================= */

const DEPOSIT_LOCATION = {
  name: "Bank Sampah RLI",
  address:
    "V99Q+2MF, RT.01/RW.02, Lkr. Kp. Baru, Dusun Gunung Remuk, Kec. Kalipuro, Kabupaten Banyuwangi, Jawa Timur 68455",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=V99Q%2B2MF%2C%20RT.01%2FRW.02%2C%20Lkr.%20Kp.%20Baru%2C%20Dusun%20Gunung%20Remuk%2C%20Kec.%20Kalipuro%2C%20Kabupaten%20Banyuwangi%2C%20Jawa%20Timur%2068455",
};

/* =========================================================
   TYPE STATUS
========================================================= */

type SubmissionStatus =
  "menunggu_setor" | "dibatalkan" | "proses_verifikasi" | "selesai";

interface Submission {
  id: string;
  wasteType: string;
  wastePrice: number;
  weight: string;
  estimatedAmount: number;
  date: string;
  notes: string;
  image: string | null;
  status: SubmissionStatus;
  finalAmount?: number;
  createdAt: string;
}

/* =========================================================
   COMPONENT
========================================================= */

const WasteBankDeposit = () => {
  /* =======================================================
     FORM STATE
  ======================================================= */

  const [selectedWaste, setSelectedWaste] = useState<number | null>(null);
  const [weight, setWeight] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [notes, setNotes] = useState("");

  /* =======================================================
     UI STATE
  ======================================================= */

  const [activeTab, setActiveTab] = useState<"form" | "status">("form");
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState<Submission | null>(
    null,
  );

  /* =======================================================
     STATUS PENGAJUAN

     Untuk sementara menggunakan state.
     Nantinya data ini sebaiknya diambil dari backend.
  ======================================================= */

  const [submission, setSubmission] = useState<Submission | null>(null);

  /* =======================================================
     DATA SAMPAH TERPILIH
  ======================================================= */

  const selectedWasteData = WASTE_TYPES.find(
    (waste) => waste.id === selectedWaste,
  );

  /* =======================================================
     ESTIMASI

     Berat optional.
     Jika user tidak memasukkan berat,
     estimasi nominal belum dihitung.
  ======================================================= */

  const estimatedAmount =
    selectedWasteData && weight ? Number(weight) * selectedWasteData.price : 0;

  /* =======================================================
     CEK TANGGAL

     Jika tanggal setor sudah lewat,
     otomatis status menjadi dibatalkan.
  ======================================================= */

  useEffect(() => {
    if (!submission) return;

    if (submission.status !== "menunggu_setor") return;

    if (!submission.date) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const depositDate = new Date(submission.date);
    depositDate.setHours(0, 0, 0, 0);

    if (depositDate < today) {
      setSubmission((prev) =>
        prev
          ? {
              ...prev,
              status: "dibatalkan",
            }
          : null,
      );
    }
  }, [submission]);

  /* =======================================================
     UPLOAD FOTO
  ======================================================= */

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };

    reader.readAsDataURL(file);
  };

  /* =======================================================
     RESET FORM
  ======================================================= */

  const resetForm = () => {
    setSelectedWaste(null);
    setWeight("");
    setUploadedImage(null);
    setSelectedDate("");
    setNotes("");
    setEditingSubmission(null);
  };

  /* =======================================================
     SUBMIT PENGAJUAN
  ======================================================= */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedWaste || !selectedDate) {
      return;
    }

    const newSubmission: Submission = {
      id: editingSubmission?.id || `WS-${Date.now()}`,
      wasteType: selectedWasteData?.name || "",
      wastePrice: selectedWasteData?.price || 0,
      weight,
      estimatedAmount,
      date: selectedDate,
      notes,
      image: uploadedImage,
      status: "menunggu_setor",
      createdAt: editingSubmission?.createdAt || new Date().toISOString(),
    };

    /*
     * =====================================================
     * BACKEND
     * =====================================================
     *
     * Di aplikasi sebenarnya bagian ini diganti dengan:
     *
     * await fetch("/api/waste-bank/submissions", {
     *   method: "POST",
     *   body: JSON.stringify(newSubmission)
     * })
     *
     * Setelah backend menerima data,
     * frontend mengubah status ke halaman status.
     */

    setSubmission(newSubmission);

    // Form langsung dikosongkan
    resetForm();

    // Langsung pindah ke status pengajuan
    setActiveTab("status");

    // Tampilkan notifikasi berhasil
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  /* =======================================================
     VALIDASI FORM

     Berat TIDAK WAJIB.
  ======================================================= */

  const isFormValid = selectedWaste !== null && selectedDate !== "";

  /* =======================================================
     EDIT PENGAJUAN

     Data lama dikembalikan ke form.
  ======================================================= */

  const handleEditSubmission = () => {
    if (!submission) return;

    const waste = WASTE_TYPES.find(
      (item) => item.name === submission.wasteType,
    );

    setSelectedWaste(waste?.id || null);
    setWeight(submission.weight);
    setUploadedImage(submission.image);
    setSelectedDate(submission.date);
    setNotes(submission.notes);

    setEditingSubmission(submission);

    setActiveTab("form");
  };

  /* =======================================================
     AJUKAN ULANG

     Data sampah tetap dipertahankan,
     tetapi tanggal harus dipilih ulang.
  ======================================================= */

  const handleReapply = () => {
    if (!submission) return;

    const waste = WASTE_TYPES.find(
      (item) => item.name === submission.wasteType,
    );

    setSelectedWaste(waste?.id || null);
    setWeight(submission.weight);
    setUploadedImage(submission.image);
    setNotes(submission.notes);

    // Tanggal sengaja dikosongkan
    setSelectedDate("");

    setEditingSubmission(submission);

    setActiveTab("form");
  };

  /* =======================================================
     FORMAT TANGGAL
  ======================================================= */

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  /* =======================================================
     STATUS LABEL
  ======================================================= */

  const getStatusInfo = (status: SubmissionStatus) => {
    switch (status) {
      case "menunggu_setor":
        return {
          title: "Menunggu Disetor",
          description:
            "Pengajuan telah diterima. Silakan setorkan sampah sesuai tanggal yang dipilih.",
          icon: Clock3,
          className: "bg-amber-50 border-amber-200 text-amber-700",
        };

      case "dibatalkan":
        return {
          title: "Pengajuan Dibatalkan",
          description:
            "Tanggal setor telah terlewati sehingga pengajuan otomatis dibatalkan.",
          icon: XCircle,
          className: "bg-red-50 border-red-200 text-red-700",
        };

      case "proses_verifikasi":
        return {
          title: "Sedang Diverifikasi",
          description:
            "Sampah telah disetorkan. Admin IFK sedang melakukan pemeriksaan akhir.",
          icon: Clock3,
          className: "bg-blue-50 border-blue-200 text-blue-700",
        };

      case "selesai":
        return {
          title: "Setor Selesai",
          description:
            "Setoran telah diverifikasi admin dan saldo telah diperoleh.",
          icon: CircleCheck,
          className: "bg-green-50 border-green-200 text-green-700",
        };
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-teal-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl -z-10" />

        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center space-y-6">
          <div className="flex justify-center mb-4">
            <Recycle className="w-16 h-16 text-primary" />
          </div>

          <h1 className="text-5xl md:text-6xl font-poppins font-bold text-secondary">
            Setor Sampah Anda
          </h1>

          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Ajukan setoran sampah dengan mudah dan ubah sampah menjadi nilai
            yang bermanfaat.
          </p>

          {/* QUICK STATS */}

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

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ===================================================
            TAB
        =================================================== */}

        <div className="flex gap-6 mb-8 border-b">
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
            onClick={() => setActiveTab("status")}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === "status"
                ? "text-primary border-b-2 border-primary"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Status Pengajuan
          </button>
        </div>

        {/* ===================================================
            SUCCESS NOTIFICATION
        =================================================== */}

        {showSuccess && (
          <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-green-600" />
            </div>

            <div>
              <h3 className="font-bold text-green-700">
                Pengajuan berhasil dikirim
              </h3>

              <p className="text-sm text-green-700/80 mt-1">
                Data pengajuan telah diterima. Silakan cek status pengajuan
                Anda.
              </p>
            </div>
          </div>
        )}

        {/* ===================================================
            FORM TAB
        =================================================== */}

        {activeTab === "form" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ===============================================
                FORM
            =============================================== */}

            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
              {/* STEP 1 */}

              <div className="glass-effect rounded-2xl p-8 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-foreground">
                    1. Pilih Jenis Sampah
                  </h2>

                  <p className="text-sm text-foreground/60">
                    Pilih kategori sampah yang ingin disetor.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {WASTE_TYPES.map((waste) => {
                    const WasteIcon = waste.icon;

                    return (
                      <button
                        key={waste.id}
                        type="button"
                        onClick={() => setSelectedWaste(waste.id)}
                        className={`p-6 rounded-xl border-2 transition-all text-left ${
                          selectedWaste === waste.id
                            ? `border-primary ${waste.color}`
                            : "border-foreground/20 hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                            <WasteIcon className="w-7 h-7 text-primary" />
                          </div>

                          <div>
                            <div className="font-bold text-foreground">
                              {waste.name}
                            </div>

                            <div className="text-sm text-primary font-semibold mt-1">
                              Rp {waste.price.toLocaleString("id-ID")}
                              /kg
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-foreground/60 mt-4">
                          {waste.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedWaste && (
                <>
                  {/* STEP 2 */}

                  <div className="glass-effect rounded-2xl p-8 space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        2. Estimasi Berat Sampah
                      </h2>

                      <p className="text-sm text-foreground/60 mt-1">
                        Berat bersifat opsional. Jika tidak memiliki timbangan,
                        bagian ini dapat dikosongkan.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Perkiraan Berat
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

                        <span className="px-4 py-3 bg-foreground/10 rounded-lg font-semibold">
                          kg
                        </span>
                      </div>

                      <p className="text-xs text-foreground/50 mt-2">
                        * Berat akhir akan ditentukan berdasarkan hasil
                        penimbangan saat sampah disetor.
                      </p>
                    </div>

                    {weight && (
                      <div className="glass-effect rounded-xl p-5 bg-primary/10">
                        <div className="flex justify-between">
                          <span className="text-sm text-foreground/70">
                            Harga perkiraan/kg
                          </span>

                          <span className="font-semibold">
                            Rp{" "}
                            {selectedWasteData?.price.toLocaleString("id-ID")}
                          </span>
                        </div>

                        <div className="border-t border-primary/20 mt-3 pt-3 flex justify-between">
                          <span className="font-bold">Estimasi Saldo</span>

                          <span className="text-xl font-bold text-primary">
                            Rp {estimatedAmount.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* STEP 3 */}

                  <div className="glass-effect rounded-2xl p-8 space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        3. Upload Foto Sampah
                      </h2>

                      <p className="text-sm text-foreground/60 mt-1">
                        Upload foto untuk memberikan gambaran sampah yang akan
                        disetor.
                      </p>
                    </div>

                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img
                          src={uploadedImage}
                          alt="Foto sampah"
                          className="w-full h-64 object-cover rounded-xl"
                        />

                        <button
                          type="button"
                          onClick={() => setUploadedImage(null)}
                          className="w-full border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
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

                        <div className="border-2 border-dashed border-primary rounded-xl p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors">
                          <Upload className="w-8 h-8 text-primary mx-auto mb-3" />

                          <div className="font-semibold">
                            Klik untuk upload foto
                          </div>

                          <div className="text-sm text-foreground/60 mt-1">
                            Foto sampah yang akan disetor
                          </div>
                        </div>
                      </label>
                    )}
                  </div>

                  {/* STEP 4 */}

                  <div className="glass-effect rounded-2xl p-8 space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        4. Jadwal Setor
                      </h2>

                      <p className="text-sm text-foreground/60 mt-1">
                        Pilih tanggal saat Anda akan membawa sampah ke lokasi
                        Bank Sampah RLI.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Tanggal Setor *
                        </span>
                      </label>

                      <input
                        type="date"
                        value={selectedDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* STEP 5 */}

                  <div className="glass-effect rounded-2xl p-8 space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        5. Catatan Tambahan
                      </h2>

                      <p className="text-sm text-foreground/60 mt-1">
                        Opsional.
                      </p>
                    </div>

                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-foreground/40" />

                      <textarea
                        placeholder="Tambahkan catatan jika diperlukan..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      isFormValid
                        ? "bg-primary text-white hover:bg-secondary"
                        : "bg-foreground/20 text-foreground/50 cursor-not-allowed"
                    }`}
                  >
                    Ajukan Setoran Sampah
                  </button>
                </>
              )}
            </form>

            {/* ===============================================
                SIDEBAR
            =============================================== */}

            <div className="space-y-6">
              {/* INFORMASI */}

              <div className="glass-effect rounded-2xl p-6 space-y-4 bg-primary/10">
                <h3 className="font-bold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  Informasi Penting
                </h3>

                <ul className="space-y-3 text-sm text-foreground/70">
                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      Berat sampah boleh dikosongkan jika tidak memiliki
                      timbangan.
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Berat akhir akan ditimbang saat sampah disetor.</span>
                  </li>

                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      Sampah wajib disetor sesuai tanggal yang dipilih.
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      Pengajuan otomatis dibatalkan jika tanggal telah lewat.
                    </span>
                  </li>
                </ul>
              </div>

              {/* LOKASI */}

              <div className="glass-effect rounded-2xl p-6 space-y-5">
                <h3 className="font-bold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Lokasi Setor
                </h3>

                <div>
                  <div className="font-semibold text-foreground">
                    {DEPOSIT_LOCATION.name}
                  </div>

                  <p className="text-sm text-foreground/60 mt-2 leading-relaxed">
                    {DEPOSIT_LOCATION.address}
                  </p>
                </div>

                <a
                  href={DEPOSIT_LOCATION.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-secondary transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Buka di Google Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* HARGA */}

              <div className="glass-effect rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-foreground">Harga Sampah</h3>

                {WASTE_TYPES.map((waste) => {
                  const WasteIcon = waste.icon;

                  return (
                    <div
                      key={waste.id}
                      className="flex items-center justify-between py-3 border-b border-foreground/10"
                    >
                      <span className="text-sm flex items-center gap-2">
                        <WasteIcon className="w-4 h-4 text-primary" />
                        {waste.name}
                      </span>

                      <span className="font-semibold text-primary">
                        Rp {waste.price.toLocaleString("id-ID")}
                        /kg
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            STATUS PENGAJUAN TAB
        =================================================== */}

        {activeTab === "status" && (
          <div className="max-w-4xl mx-auto">
            {!submission ? (
              <div className="glass-effect rounded-2xl p-10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Clock3 className="w-8 h-8 text-primary" />
                </div>

                <h2 className="text-2xl font-bold text-secondary">
                  Belum Ada Pengajuan
                </h2>

                <p className="text-foreground/60 mt-2 max-w-md mx-auto">
                  Anda belum memiliki pengajuan setor sampah. Silakan isi
                  formulir untuk membuat pengajuan baru.
                </p>

                <button
                  onClick={() => setActiveTab("form")}
                  className="mt-6 btn-primary px-6 py-3 rounded-xl"
                >
                  Buat Pengajuan
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* STATUS HEADER */}

                {(() => {
                  const statusInfo = getStatusInfo(submission.status);

                  const StatusIcon = statusInfo.icon;

                  return (
                    <div
                      className={`rounded-2xl border p-6 ${statusInfo.className}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center shrink-0">
                          <StatusIcon className="w-6 h-6" />
                        </div>

                        <div>
                          <div className="text-sm font-semibold opacity-70">
                            STATUS PENGAJUAN
                          </div>

                          <h2 className="text-2xl font-bold mt-1">
                            {statusInfo.title}
                          </h2>

                          <p className="text-sm mt-2 opacity-80">
                            {statusInfo.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* DETAIL PENGAJUAN */}

                <div className="glass-effect rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-secondary">
                        Detail Pengajuan
                      </h2>

                      <p className="text-sm text-foreground/60 mt-1">
                        ID Pengajuan: {submission.id}
                      </p>
                    </div>

                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Recycle className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-foreground/5">
                      <div className="text-xs text-foreground/50">
                        Jenis Sampah
                      </div>

                      <div className="font-bold mt-1">
                        {submission.wasteType}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-foreground/5">
                      <div className="text-xs text-foreground/50">
                        Estimasi Berat
                      </div>

                      <div className="font-bold mt-1">
                        {submission.weight
                          ? `${submission.weight} kg`
                          : "Tidak diisi"}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-foreground/5">
                      <div className="text-xs text-foreground/50">
                        Tanggal Setor
                      </div>

                      <div className="font-bold mt-1">
                        {formatDate(submission.date)}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-foreground/5">
                      <div className="text-xs text-foreground/50">
                        Estimasi Saldo
                      </div>

                      <div className="font-bold text-primary mt-1">
                        {submission.estimatedAmount > 0
                          ? `Rp ${submission.estimatedAmount.toLocaleString(
                              "id-ID",
                            )}`
                          : "Akan dihitung saat setor"}
                      </div>
                    </div>
                  </div>

                  {/* CATATAN */}

                  {submission.notes && (
                    <div className="mt-4 p-4 rounded-xl bg-foreground/5">
                      <div className="text-xs text-foreground/50 mb-1">
                        Catatan
                      </div>

                      <div className="text-sm">{submission.notes}</div>
                    </div>
                  )}

                  {/* LOKASI */}

                  <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />

                      <div className="flex-1">
                        <div className="font-semibold">Lokasi Setor</div>

                        <div className="text-sm text-foreground/60 mt-1">
                          {DEPOSIT_LOCATION.address}
                        </div>

                        <a
                          href={DEPOSIT_LOCATION.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary mt-3 hover:text-secondary"
                        >
                          Buka Google Maps
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    STATUS MENUNGGU SETOR
                ================================================= */}

                {submission.status === "menunggu_setor" && (
                  <div className="glass-effect rounded-2xl p-6 border border-amber-200 bg-amber-50/50">
                    <div className="flex gap-3">
                      <Clock3 className="w-5 h-5 text-amber-600 mt-0.5" />

                      <div>
                        <h3 className="font-bold text-amber-800">
                          Jangan lewatkan tanggal setor
                        </h3>

                        <p className="text-sm text-amber-700/80 mt-1">
                          Silakan datang ke lokasi Bank Sampah RLI pada tanggal{" "}
                          <strong>{formatDate(submission.date)}</strong>. Jika
                          tanggal tersebut terlewati, pengajuan akan otomatis
                          dibatalkan.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* =================================================
                    STATUS SELESAI
                ================================================= */}

                {submission.status === "selesai" && (
                  <div className="glass-effect rounded-2xl p-6 bg-green-50 border border-green-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-green-600" />
                      </div>

                      <div>
                        <div className="text-sm text-green-700">
                          Saldo yang Anda peroleh
                        </div>

                        <div className="text-3xl font-bold text-green-700">
                          Rp{" "}
                          {(submission.finalAmount || 0).toLocaleString(
                            "id-ID",
                          )}
                        </div>

                        <p className="text-sm text-green-700/70 mt-1">
                          Saldo telah diperbarui setelah setoran diverifikasi
                          admin IFK.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* =================================================
                    STATUS DIBATALKAN
                ================================================= */}

                {submission.status === "dibatalkan" && (
                  <div className="glass-effect rounded-2xl p-6 border border-red-200 bg-red-50">
                    <div className="flex gap-3">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />

                      <div>
                        <h3 className="font-bold text-red-800">
                          Pengajuan otomatis dibatalkan
                        </h3>

                        <p className="text-sm text-red-700/80 mt-1">
                          Pengajuan tetap tersimpan di riwayat. Anda dapat
                          mengedit data lama atau mengajukan kembali dengan
                          tanggal baru.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                      <button
                        onClick={handleEditSubmission}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-primary/20 text-primary font-semibold hover:bg-primary/10 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit Pengajuan
                      </button>

                      <button
                        onClick={handleReapply}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-secondary transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Ajukan Ulang
                      </button>
                    </div>
                  </div>
                )}

                {/* =================================================
                    INFO PROSES
                ================================================= */}

                <div className="glass-effect rounded-2xl p-6">
                  <h3 className="font-bold text-secondary mb-5">
                    Alur Setoran
                  </h3>

                  <div className="space-y-5">
                    {/* STEP 1 */}

                    <div className="flex gap-4">
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
                        1
                      </div>

                      <div>
                        <div className="font-semibold">Pengajuan Dikirim</div>

                        <p className="text-sm text-foreground/60 mt-1">
                          Data pengajuan diterima oleh sistem.
                        </p>
                      </div>
                    </div>

                    {/* STEP 2 */}

                    <div className="flex gap-4">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                          submission.status === "menunggu_setor" ||
                          submission.status === "proses_verifikasi" ||
                          submission.status === "selesai"
                            ? "bg-primary text-white"
                            : "bg-foreground/10 text-foreground/40"
                        }`}
                      >
                        2
                      </div>

                      <div>
                        <div className="font-semibold">Menunggu Setor</div>

                        <p className="text-sm text-foreground/60 mt-1">
                          Sampah disetor sesuai tanggal pengajuan.
                        </p>
                      </div>
                    </div>

                    {/* STEP 3 */}

                    <div className="flex gap-4">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                          submission.status === "proses_verifikasi" ||
                          submission.status === "selesai"
                            ? "bg-primary text-white"
                            : "bg-foreground/10 text-foreground/40"
                        }`}
                      >
                        3
                      </div>

                      <div>
                        <div className="font-semibold">Verifikasi Setoran</div>

                        <p className="text-sm text-foreground/60 mt-1">
                          Admin IFK memeriksa hasil setoran dan berat aktual
                          sampah.
                        </p>
                      </div>
                    </div>

                    {/* STEP 4 */}

                    <div className="flex gap-4">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                          submission.status === "selesai"
                            ? "bg-green-500 text-white"
                            : "bg-foreground/10 text-foreground/40"
                        }`}
                      >
                        4
                      </div>

                      <div>
                        <div className="font-semibold">Setor Selesai</div>

                        <p className="text-sm text-foreground/60 mt-1">
                          Saldo diperoleh berdasarkan hasil penimbangan dan
                          verifikasi akhir.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WasteBankDeposit;
