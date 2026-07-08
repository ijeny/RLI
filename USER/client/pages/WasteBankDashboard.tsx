import { useState, useEffect } from "react";
import {
  RiseOutlined,
  PlusOutlined,
  HistoryOutlined,
  TrophyOutlined,
  EnvironmentOutlined,
  BankOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  GiftOutlined,
  InboxOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateComponents";
import {
  getWasteStats,
  getWasteDeposits,
  getWasteWithdrawals,
} from "@/services/wasteService";
import { WasteStats, WasteDeposit, WasteWithdrawal } from "@/types";

const WasteBankDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [wasteStats, setWasteStats] = useState<WasteStats | null>(null);
  const [deposits, setDeposits] = useState<WasteDeposit[]>([]);
  const [withdrawals, setWithdrawals] = useState<WasteWithdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [stats, depositsData, withdrawalsData] = await Promise.all([
          getWasteStats(),
          getWasteDeposits(1, 10),
          getWasteWithdrawals(1, 10),
        ]);
        setWasteStats(stats);
        setDeposits(depositsData.data || []);
        setWithdrawals(withdrawalsData.data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Gagal memuat data",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <LoadingState />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ErrorState
            title="Gagal memuat data"
            message="Silakan coba lagi nanti"
            onRetry={() => window.location.reload()}
          />
        </div>
        <Footer />
      </div>
    );
  }

  if (!wasteStats) {
    return (
      <div className="w-full">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <EmptyState
            title="Belum Ada Data Tabungan"
            description="Saldo dan mutasi tabungan akan muncul setelah transaksi tersedia."
            icon={InboxOutlined}
          />
        </div>
        <Footer />
      </div>
    );
  }

  const ecoLevels = [
    { name: "Eco Beginner", progress: 20, icon: "🌱" },
    { name: "Eco Saver", progress: 45, icon: "♻️" },
    { name: "Green Warrior", progress: 72, icon: "🌿", active: true },
    { name: "Eco Hero", progress: 0, icon: "🏆" },
    { name: "Earth Guardian", progress: 0, icon: "🌍" },
  ];

  const achievements = [
    { name: "Setor Pertama", icon: "🎯", earned: true },
    { name: "Sampah Warrior", icon: "⚔️", earned: true },
    { name: "Eco Champion", icon: "🥇", earned: false },
    { name: "Planet Savior", icon: "🌎", earned: false },
  ];

  const recentTransactions = [...deposits, ...withdrawals]
    .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
    .slice(0, 3)
    .map((item) => {
      const isDeposit = "wasteType" in item || "type" in item;
      const typeStr = isDeposit ? (item.wasteType || item.type || "Sampah") : "Penarikan Saldo";
      return {
        id: item.id,
        type: isDeposit ? "deposit" : "withdrawal",
        wasteType: typeStr,
        weight: isDeposit ? (item as WasteDeposit).weight : null,
        amount: item.amount || (item as WasteDeposit).total || 0,
        date: item.date || "",
        status: item.status,
      };
    });

  return (
    <div className="w-full">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-poppins font-bold text-secondary mb-2">
            Dashboard Bank Sampah
          </h1>
          <p className="text-foreground/70">Selamat datang, pengguna! 🌱</p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Balance Card */}
          <div className="glass-effect rounded-2xl p-6 space-y-3 bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="flex items-center justify-between">
              <span className="text-foreground/70 text-sm">Total Saldo</span>
              <BankOutlined className="text-primary text-xl" />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-secondary">
                Rp {wasteStats.totalBalance.toLocaleString("id-ID")}
              </div>
              <div className="flex items-center gap-1 text-accent text-sm font-semibold">
                <RiseOutlined />
                +10% bulan ini
              </div>
            </div>
          </div>

          {/* Eco Points Card */}
          <div className="glass-effect rounded-2xl p-6 space-y-3 bg-gradient-to-br from-accent/20 to-primary/20">
            <div className="flex items-center justify-between">
              <span className="text-foreground/70 text-sm">Eco Points</span>
              <GiftOutlined className="text-accent text-xl" />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-accent">
                {wasteStats.totalEcoPoints.toLocaleString("id-ID")}
              </div>
              <div className="text-xs text-foreground/60">
                +150 poin bulan ini
              </div>
            </div>
          </div>

          {/* Total Deposits */}
          <div className="glass-effect rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-foreground/70 text-sm">Setoran</span>
              <ArrowDownOutlined className="text-primary text-xl" />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">
                {deposits.length}x
              </div>
              <div className="text-xs text-foreground/60">
                {wasteStats.totalKg} kg sampah
              </div>
            </div>
          </div>

          {/* Total Withdrawals */}
          <div className="glass-effect rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-foreground/70 text-sm">Penarikan</span>
              <ArrowUpOutlined className="text-primary text-xl" />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">
                {withdrawals.length}x
              </div>
              <div className="text-xs text-foreground/60">
                Total Rp{" "}
                {withdrawals
                  .reduce((sum, w) => sum + (w.amount || 0), 0)
                  .toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link
            to="/waste-bank/deposit"
            className="glass-effect rounded-lg p-4 text-center hover:shadow-lg transition-all group"
          >
            <PlusOutlined className="text-primary text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-foreground">Setor Sampah</div>
            <div className="text-xs text-foreground/60">Dapatkan saldo</div>
          </Link>

          <Link
            to="/waste-bank/withdrawal"
            className="glass-effect rounded-lg p-4 text-center hover:shadow-lg transition-all group"
          >
            <ArrowUpOutlined className="text-primary text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-foreground">Tarik Saldo</div>
            <div className="text-xs text-foreground/60">Ke bank/e-wallet</div>
          </Link>

          <Link
            to="/waste-bank/history"
            className="glass-effect rounded-lg p-4 text-center hover:shadow-lg transition-all group"
          >
            <HistoryOutlined className="text-primary text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-foreground">Riwayat</div>
            <div className="text-xs text-foreground/60">Lihat transaksi</div>
          </Link>

          <Link
            to="/waste-bank/rewards"
            className="glass-effect rounded-lg p-4 text-center hover:shadow-lg transition-all group"
          >
            <TrophyOutlined className="text-primary text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-foreground">Reward</div>
            <div className="text-xs text-foreground/60">Badge & poin</div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Eco Level Card */}
            <div className="glass-effect rounded-2xl p-8 space-y-6 bg-gradient-to-br from-primary/10 to-secondary/10">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary">
                      Green Warrior
                    </h3>
                    <p className="text-sm text-foreground/60 mt-1">
                      Naik level dengan setoran lebih banyak
                    </p>
                  </div>
                  <div className="text-6xl">{ecoLevels[2].icon}</div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/70">Progres Level</span>
                    <span className="font-bold text-primary">72%</span>
                  </div>
                  <div className="w-full bg-foreground/10 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `72%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Eco Levels Timeline */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Level Eco</h4>
                <div className="space-y-2">
                  {ecoLevels.map((level, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                        level.active
                          ? "bg-primary/20 border-2 border-primary"
                          : "bg-foreground/5 border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{level.icon}</span>
                        <span
                          className={`font-semibold ${
                            level.active ? "text-primary" : "text-foreground/60"
                          }`}
                        >
                          {level.name}
                        </span>
                      </div>
                      <div className="w-24 h-2 bg-foreground/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${level.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">
                Transaksi Terbaru
              </h3>
              <div className="space-y-3">
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="glass-effect rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            tx.type === "deposit"
                              ? "bg-accent/20 text-accent"
                              : "bg-primary/20 text-primary"
                          }`}
                        >
                          {tx.type === "deposit" ? (
                            <ArrowDownOutlined className="text-lg" />
                          ) : (
                            <ArrowUpOutlined className="text-lg" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">
                            {tx.wasteType}
                          </div>
                          <div className="text-xs text-foreground/60">
                            {tx.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-bold text-lg ${
                            tx.type === "deposit" ? "text-accent" : "text-primary"
                          }`}
                        >
                          {tx.type === "deposit" ? "+" : "-"}Rp{" "}
                          {tx.amount.toLocaleString("id-ID")}
                        </div>
                        <div className="text-xs text-foreground/60">
                          {tx.status}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    title="Belum Ada Data Tabungan"
                    description="Saldo dan mutasi tabungan akan muncul setelah transaksi tersedia."
                    icon={InboxOutlined}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Achievements */}
          <div className="space-y-8">
            {/* Waste Composition */}
            <div className="glass-effect rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <EnvironmentOutlined className="text-primary" />
                Komposisi Sampah
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "Plastik",
                    kg: wasteStats.plasticKg,
                    color: "bg-blue-500",
                    percent: 36,
                  },
                  {
                    name: "Kertas",
                    kg: wasteStats.paperKg,
                    color: "bg-amber-500",
                    percent: 26,
                  },
                  {
                    name: "Logam",
                    kg: wasteStats.metalKg,
                    color: "bg-gray-500",
                    percent: 23,
                  },
                  {
                    name: "Organik",
                    kg: wasteStats.organicKg,
                    color: "bg-green-500",
                    percent: 15,
                  },
                ].map((waste, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">
                        {waste.name}
                      </span>
                      <span className="text-sm text-foreground/60">
                        {waste.kg} kg
                      </span>
                    </div>
                    <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${waste.color} rounded-full`}
                        style={{ width: `${waste.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-effect rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <TrophyOutlined className="text-accent" />
                Badge Pencapaian
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg text-center transition-all ${
                      achievement.earned
                        ? "glass-effect bg-primary/10"
                        : "glass-effect opacity-50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <div className="text-xs font-semibold text-foreground">
                      {achievement.name}
                    </div>
                    {achievement.earned && (
                      <div className="text-xs text-accent mt-1">✓ Diraih</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-effect rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-foreground">Statistik</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-foreground/70">
                    Total Sampah
                  </span>
                  <span className="font-bold text-primary">
                    {wasteStats.totalKg} kg
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-foreground/70">
                    Rata-rata/Bulan
                  </span>
                  <span className="font-bold text-primary">
                    {(wasteStats.totalKg / 3).toFixed(1)} kg
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-foreground/70">Kontribusi</span>
                  <span className="font-bold text-accent">Top 15%</span>
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

export default WasteBankDashboard;
