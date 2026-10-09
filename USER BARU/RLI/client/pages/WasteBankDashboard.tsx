import {
  TrendingUp,
  History,
  Award,
  Leaf,
  Droplet,
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  Recycle,
  Trophy,
  Target,
  ShieldCheck,
  Sparkles,
  ClipboardCheck,
  Clock3,
  CircleCheck,
  Medal,
  Globe2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WasteBankDashboard = () => {
  const user = {
    name: "Budi Santoso",
    totalBalance: 1250000,
    totalDeposit: 45,
    totalWithdrawal: 5,
    totalEcoPoints: 3450,
    ecoLevel: "Green Warrior",
    ecoLevelProgress: 72,
  };

  /*
   * Statistik sampah
   * Hanya dibagi menjadi 2 kategori:
   * - Organik
   * - Anorganik
   */
  const wasteStats = {
    totalKg: 125.5,
    organicKg: 45.5,
    inorganicKg: 80,
  };

  const recentTransactions = [
    {
      id: 1,
      type: "deposit",
      wasteType: "Sampah Anorganik",
      weight: 5,
      amount: 50000,
      date: "2024-01-15",
      status: "Diterima",
    },
    {
      id: 2,
      type: "withdrawal",
      wasteType: "Penarikan Saldo",
      weight: null,
      amount: 200000,
      date: "2024-01-14",
      status: "Berhasil",
    },
    {
      id: 3,
      type: "deposit",
      wasteType: "Sampah Organik",
      weight: 8.5,
      amount: 85000,
      date: "2024-01-13",
      status: "Diterima",
    },
  ];

  /*
   * Level Eco
   * Emoji diganti dengan Lucide Icon
   */
  const ecoLevels = [
    {
      name: "Eco Beginner",
      progress: 20,
      icon: SproutIcon,
    },
    {
      name: "Eco Saver",
      progress: 45,
      icon: Recycle,
    },
    {
      name: "Green Warrior",
      progress: 72,
      icon: Leaf,
      active: true,
    },
    {
      name: "Eco Hero",
      progress: 0,
      icon: Trophy,
    },
    {
      name: "Earth Guardian",
      progress: 0,
      icon: Globe2,
    },
  ];

  /*
   * Badge pencapaian
   * Emoji diganti dengan Lucide Icon
   */
  const achievements = [
    {
      name: "Setoran Pertama",
      icon: Target,
      earned: true,
    },
    {
      name: "Sampah Warrior",
      icon: ShieldCheck,
      earned: true,
    },
    {
      name: "Eco Champion",
      icon: Medal,
      earned: false,
    },
    {
      name: "Planet Savior",
      icon: Globe2,
      earned: false,
    },
  ];

  /*
   * Persentase komposisi sampah
   * Dihitung otomatis berdasarkan total berat.
   */
  const organicPercent = (wasteStats.organicKg / wasteStats.totalKg) * 100;

  const inorganicPercent = (wasteStats.inorganicKg / wasteStats.totalKg) * 100;

  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />

      {/* =====================================================
          HEADER
      ===================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-teal-50 border-b">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

        <div className="absolute -bottom-32 -left-24 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Recycle className="w-4 h-4" />
              Bank Sampah RLI
            </div>

            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-3">
              Tabungan Sampah
            </h1>

            <p className="text-foreground/70 text-lg">
              Halo,{" "}
              <span className="font-semibold text-foreground">{user.name}</span>
              . Kelola saldo, ajukan sampah, dan pantau kontribusi lingkunganmu
              dalam satu tempat.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* =====================================================
            INFO ALUR BANK SAMPAH
        ===================================================== */}
        <div className="glass-effect rounded-2xl p-5 mb-8 border border-primary/10 bg-primary/5">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-6 h-6 text-primary" />
            </div>

            <div className="flex-1">
              <h2 className="font-bold text-secondary mb-1">
                Cara menggunakan Bank Sampah
              </h2>

              <p className="text-sm text-foreground/70 leading-relaxed">
                Ajukan data sampah yang ingin disetorkan melalui sistem.
                Selanjutnya admin RLI akan melakukan pemeriksaan dan verifikasi.
                Setelah diterima, saldo akan otomatis diperbarui sesuai hasil
                verifikasi.
              </p>
            </div>

            <Link
              to="/waste-bank/deposit"
              className="inline-flex items-center justify-center gap-2 btn-primary px-5 py-3 rounded-xl whitespace-nowrap"
            >
              <ClipboardCheck className="w-4 h-4" />
              Ajukan Sampah
            </Link>
          </div>
        </div>

        {/* =====================================================
            MAIN STATS
        ===================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* SALDO */}
          <div className="glass-effect rounded-2xl p-6 bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground/70 text-sm font-medium">
                Total Saldo
              </span>

              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Droplet className="w-5 h-5 text-primary" />
              </div>
            </div>

            <div className="text-3xl font-bold text-secondary mb-2">
              Rp {user.totalBalance.toLocaleString("id-ID")}
            </div>

            <div className="flex items-center gap-1 text-accent text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              +10% bulan ini
            </div>
          </div>

          {/* ECO POINT */}
          <div className="glass-effect rounded-2xl p-6 bg-gradient-to-br from-accent/20 to-primary/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground/70 text-sm font-medium">
                Eco Points
              </span>

              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-accent" />
              </div>
            </div>

            <div className="text-3xl font-bold text-accent mb-2">
              {user.totalEcoPoints.toLocaleString("id-ID")}
            </div>

            <div className="text-xs text-foreground/60">
              +150 poin bulan ini
            </div>
          </div>

          {/* PENGAJUAN */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground/70 text-sm font-medium">
                Pengajuan Sampah
              </span>

              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ArrowDownLeft className="w-5 h-5 text-primary" />
              </div>
            </div>

            <div className="text-3xl font-bold text-primary mb-2">
              {user.totalDeposit}x
            </div>

            <div className="text-xs text-foreground/60">
              {wasteStats.totalKg} kg sampah tercatat
            </div>
          </div>

          {/* PENARIKAN */}
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground/70 text-sm font-medium">
                Penarikan Saldo
              </span>

              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
            </div>

            <div className="text-3xl font-bold text-primary mb-2">
              {user.totalWithdrawal}x
            </div>

            <div className="text-xs text-foreground/60">Total Rp 1jt+</div>
          </div>
        </div>

        {/* =====================================================
            QUICK ACTION
        ===================================================== */}
        <div className="mb-10">
          <div className="mb-5">
            <h2 className="text-2xl font-poppins font-bold text-secondary">
              Akses Cepat
            </h2>

            <p className="text-sm text-foreground/60 mt-1">
              Pilih aktivitas yang ingin kamu lakukan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* AJUKAN SAMPAH */}
            <Link
              to="/waste-bank/deposit"
              className="glass-effect rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all group border border-transparent hover:border-primary/20"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <ClipboardCheck className="w-6 h-6 text-primary" />
              </div>

              <div className="font-bold text-foreground mb-1">
                Ajukan Sampah
              </div>

              <div className="text-sm text-foreground/60">
                Ajukan sampah untuk diverifikasi admin
              </div>
            </Link>

            {/* TARIK SALDO */}
            <Link
              to="/waste-bank/withdrawal"
              className="glass-effect rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all group border border-transparent hover:border-primary/20"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <ArrowUpRight className="w-6 h-6 text-primary" />
              </div>

              <div className="font-bold text-foreground mb-1">Tarik Saldo</div>

              <div className="text-sm text-foreground/60">
                Tarik saldo ke bank atau e-wallet
              </div>
            </Link>

            {/* RIWAYAT */}
            <Link
              to="/waste-bank/history"
              className="glass-effect rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all group border border-transparent hover:border-primary/20"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <History className="w-6 h-6 text-primary" />
              </div>

              <div className="font-bold text-foreground mb-1">Riwayat</div>

              <div className="text-sm text-foreground/60">
                Lihat pengajuan dan transaksi
              </div>
            </Link>

            {/* REWARD */}
            <Link
              to="/waste-bank/rewards"
              className="glass-effect rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all group border border-transparent hover:border-primary/20"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6 text-primary" />
              </div>

              <div className="font-bold text-foreground mb-1">Reward</div>

              <div className="text-sm text-foreground/60">
                Lihat badge dan Eco Points
              </div>
            </Link>
          </div>
        </div>

        {/* =====================================================
            CONTENT GRID
        ===================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===================================================
              LEFT COLUMN
          =================================================== */}
          <div className="lg:col-span-2 space-y-8">
            {/* ECO LEVEL */}
            <div className="glass-effect rounded-2xl p-8 bg-gradient-to-br from-primary/10 to-secondary/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    Level Eco
                  </div>

                  <h3 className="text-2xl font-bold text-secondary">
                    {user.ecoLevel}
                  </h3>

                  <p className="text-sm text-foreground/60 mt-1">
                    Naik level dengan berkontribusi lebih banyak.
                  </p>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-white/70 shadow-sm flex items-center justify-center">
                  <Leaf className="w-9 h-9 text-primary" />
                </div>
              </div>

              {/* PROGRESS */}
              <div className="space-y-2 mb-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/70">Progres Level</span>

                  <span className="font-bold text-primary">
                    {user.ecoLevelProgress}%
                  </span>
                </div>

                <div className="w-full bg-foreground/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{
                      width: `${user.ecoLevelProgress}%`,
                    }}
                  />
                </div>
              </div>

              {/* LEVEL LIST */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">
                  Perjalanan Level
                </h4>

                <div className="space-y-2">
                  {ecoLevels.map((level, idx) => {
                    const Icon = level.icon;

                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                          level.active
                            ? "bg-primary/15 border border-primary/30"
                            : "bg-foreground/5 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              level.active ? "bg-primary/15" : "bg-foreground/5"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 ${
                                level.active
                                  ? "text-primary"
                                  : "text-foreground/40"
                              }`}
                            />
                          </div>

                          <span
                            className={`font-semibold ${
                              level.active
                                ? "text-primary"
                                : "text-foreground/60"
                            }`}
                          >
                            {level.name}
                          </span>
                        </div>

                        <div className="w-24 h-2 bg-foreground/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{
                              width: `${level.progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RECENT TRANSACTIONS */}
            <div>
              <div className="flex items-end justify-between mb-5">
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-secondary">
                    Transaksi Terbaru
                  </h3>

                  <p className="text-sm text-foreground/60 mt-1">
                    Aktivitas terbaru pada tabungan sampah kamu.
                  </p>
                </div>

                <Link
                  to="/waste-bank/history"
                  className="hidden sm:inline-flex text-sm font-semibold text-primary hover:text-secondary transition-colors"
                >
                  Lihat Semua
                </Link>
              </div>

              <div className="space-y-3">
                {recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="glass-effect rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          tx.type === "deposit"
                            ? "bg-accent/15 text-accent"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {tx.type === "deposit" ? (
                          <ArrowDownLeft className="w-6 h-6" />
                        ) : (
                          <ArrowUpRight className="w-6 h-6" />
                        )}
                      </div>

                      <div>
                        <div className="font-semibold text-foreground">
                          {tx.wasteType}
                        </div>

                        <div className="text-xs text-foreground/60 mt-1">
                          {tx.date}
                          {tx.weight && ` • ${tx.weight} kg`}
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <div
                        className={`font-bold text-lg ${
                          tx.type === "deposit" ? "text-accent" : "text-primary"
                        }`}
                      >
                        {tx.type === "deposit" ? "+" : "-"}Rp{" "}
                        {tx.amount.toLocaleString("id-ID")}
                      </div>

                      <div className="inline-flex items-center gap-1 text-xs text-foreground/60 mt-1">
                        <CircleCheck className="w-3.5 h-3.5 text-accent" />
                        {tx.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===================================================
              RIGHT COLUMN
          =================================================== */}
          <div className="space-y-8">
            {/* =================================================
                KOMPOSISI SAMPAH
            ================================================= */}
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>

                <div>
                  <h3 className="font-bold text-foreground">
                    Komposisi Sampah
                  </h3>

                  <p className="text-xs text-foreground/60">
                    Total {wasteStats.totalKg} kg
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* ORGANIK */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />

                      <span className="text-sm font-semibold text-foreground">
                        Organik
                      </span>
                    </div>

                    <span className="text-sm text-foreground/60">
                      {wasteStats.organicKg} kg
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-foreground/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${organicPercent}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-foreground/50">
                      {organicPercent.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* ANORGANIK */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />

                      <span className="text-sm font-semibold text-foreground">
                        Anorganik
                      </span>
                    </div>

                    <span className="text-sm text-foreground/60">
                      {wasteStats.inorganicKg} kg
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-foreground/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{
                        width: `${inorganicPercent}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-foreground/50">
                      {inorganicPercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* TOTAL */}
              <div className="mt-6 pt-4 border-t flex items-center justify-between">
                <span className="text-sm font-medium text-foreground/70">
                  Total sampah
                </span>

                <span className="font-bold text-primary">
                  {wasteStats.totalKg} kg
                </span>
              </div>
            </div>

            {/* BADGE */}
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-accent" />
                </div>

                <div>
                  <h3 className="font-bold text-foreground">
                    Badge Pencapaian
                  </h3>

                  <p className="text-xs text-foreground/60">Pencapaian kamu</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, idx) => {
                  const Icon = achievement.icon;

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl text-center transition-all ${
                        achievement.earned
                          ? "bg-primary/10 border border-primary/10"
                          : "bg-foreground/5 opacity-50"
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                          achievement.earned
                            ? "bg-primary/10"
                            : "bg-foreground/5"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            achievement.earned
                              ? "text-primary"
                              : "text-foreground/40"
                          }`}
                        />
                      </div>

                      <div className="text-xs font-semibold text-foreground">
                        {achievement.name}
                      </div>

                      {achievement.earned && (
                        <div className="inline-flex items-center gap-1 text-xs text-accent mt-2">
                          <CircleCheck className="w-3 h-3" />
                          Diraih
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STATISTIK */}
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>

                <h3 className="font-bold text-foreground">Statistik</h3>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-sm text-foreground/70">
                    Total Sampah
                  </span>

                  <span className="font-bold text-primary">
                    {wasteStats.totalKg} kg
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-sm text-foreground/70">
                    Rata-rata/Bulan
                  </span>

                  <span className="font-bold text-primary">
                    {(wasteStats.totalKg / 3).toFixed(1)} kg
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-foreground/70">Kontribusi</span>

                  <span className="font-bold text-accent">Top 15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM INFO
        ===================================================== */}
        <section className="mt-10">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-teal-50 to-secondary/10 border border-primary/10 p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shrink-0">
                <Clock3 className="w-6 h-6 text-primary" />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-secondary mb-1">
                  Perlu diketahui
                </h3>

                <p className="text-sm text-foreground/70 leading-relaxed">
                  Setiap pengajuan sampah akan diperiksa oleh admin RLI. Saldo
                  dan Eco Points akan diperbarui setelah pengajuan dinyatakan
                  diterima.
                </p>
              </div>

              <Link
                to="/waste-bank/history"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-primary/20 text-primary font-semibold hover:bg-primary/10 transition-colors"
              >
                <History className="w-4 h-4" />
                Cek Riwayat
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WasteBankDashboard;

/* =========================================================
   ICON HELPER
========================================================= */

function SproutIcon({ className }: { className?: string }) {
  return <Leaf className={className} />;
}
