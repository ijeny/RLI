import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Leaf, Zap, Award } from "lucide-react";
import { InboxOutlined } from "@ant-design/icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateComponents";
import { getWasteStats } from "@/services/wasteService";
import { getUserStats } from "@/services/userService";
import { WasteStats, UserStats } from "@/types";
import { Link } from "react-router-dom";

export default function Sustainability() {
  const [wasteStats, setWasteStats] = useState<WasteStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [wStats, uStats] = await Promise.all([
          getWasteStats().catch(() => null),
          getUserStats().catch(() => null),
        ]);
        setWasteStats(wStats);
        setUserStats(uStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat data keberlanjutan");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex items-center justify-center">
          <LoadingState />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !wasteStats || wasteStats.totalKg === 0) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex items-center justify-center">
          <EmptyState
            title="Daftar Kosong"
            description="Belum ada data keberlanjutan tersedia saat ini."
            icon={InboxOutlined}
          />
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate dynamic metrics based on real stats
  const monthlyData = [
    { month: "Hari Ini", sampah: wasteStats.totalKg, co2: Math.round(wasteStats.totalKg * 1.5), pupuk: Math.round(wasteStats.totalKg * 0.8) }
  ];

  const categoryData = [
    { name: "Plastik", value: wasteStats.plasticKg, color: "#10b981" },
    { name: "Organik", value: wasteStats.organicKg, color: "#059669" },
    { name: "Kertas", value: wasteStats.paperKg, color: "#047857" },
    { name: "Logam", value: wasteStats.metalKg, color: "#065f46" },
  ].filter(c => c.value > 0);

  // If categoryData is empty, fall back to organic if totalKg > 0
  if (categoryData.length === 0 && wasteStats.totalKg > 0) {
    categoryData.push({ name: "Organik", value: wasteStats.totalKg, color: "#059669" });
  }

  const impactMetrics = [
    {
      icon: Leaf,
      label: "Total Sampah Didaur Ulang",
      value: `${wasteStats.totalKg} Kg`,
      color: "text-primary",
    },
    {
      icon: Zap,
      label: "Pengurangan CO2",
      value: `${(wasteStats.totalKg * 1.5).toFixed(1)} Kg`,
      color: "text-accent",
    },
    {
      icon: Leaf,
      label: "Produksi Pupuk Organik",
      value: `${(wasteStats.totalKg * 0.8).toFixed(1)} Kg`,
      color: "text-secondary",
    },
    {
      icon: Award,
      label: "Dampak Ekonomi",
      value: `Rp ${wasteStats.totalBalance.toLocaleString("id-ID")}`,
      color: "text-emerald-600",
    },
  ];

  const sustainabilityScores = [
    { category: "Environmental", score: 90 },
    { category: "Economic", score: 85 },
    { category: "Social", score: 80 },
    { category: "Innovation", score: 85 },
  ];

  const certs = [
    { title: "Sertifikasi Organik", status: "Tersertifikasi", badge: "🏆" },
    { title: "Eco Label Premium", status: "Tersertifikasi", badge: "🌿" },
    { title: "Circular Economy Badge", status: "Dalam Proses", badge: "♻️" },
  ];

  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-white via-cyan-50 to-teal-50 border-b">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-secondary mb-4">
              Sustainability Dashboard 🌍
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Pantau dampak lingkungan, jejak karbon, dan kontribusi Anda terhadap ekonomi sirkular
            </p>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className="glass-effect rounded-2xl p-6 bg-gradient-to-br from-primary/5 to-accent/5"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon className={`w-12 h-12 ${metric.color}`} />
                  </div>
                  <p className="text-foreground/70 text-sm mb-2">{metric.label}</p>
                  <div className="text-3xl font-poppins font-bold text-secondary">
                    {metric.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-12 bg-gradient-to-br from-white to-gray-soft border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-8">
            Analitik Keberlanjutan
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Line Chart */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="font-poppins font-bold text-secondary mb-6">
                Trend Sampah & Dampak
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sampah"
                      stroke="#10b981"
                      name="Sampah (Kg)"
                    />
                    <Line
                      type="monotone"
                      dataKey="co2"
                      stroke="#f59e0b"
                      name="Reduksi CO2 (Kg)"
                    />
                    <Line
                      type="monotone"
                      dataKey="pupuk"
                      stroke="#8b5cf6"
                      name="Pupuk (Kg)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="font-poppins font-bold text-secondary mb-6">
                Komposisi Sampah yang Dikelola
              </h3>
              {categoryData.length > 0 ? (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center">
                  <EmptyState title="Daftar Kosong" description="Belum ada data komposisi" />
                </div>
              )}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="glass-effect rounded-2xl p-6 mb-8">
            <h3 className="font-poppins font-bold text-secondary mb-6">
              Sustainability Score per Kategori
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sustainabilityScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#10b981" name="Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Certification & Goals */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-8">
            Sertifikasi & Target
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certs.map((cert, idx) => (
              <div
                key={idx}
                className="card-hover glass-effect rounded-2xl p-6 text-center"
              >
                <div className="text-5xl mb-4">{cert.badge}</div>
                <h3 className="font-poppins font-bold text-secondary mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm font-semibold text-accent">{cert.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Contribution */}
      {userStats && (
        <section className="py-12 bg-gradient-to-br from-white to-gray-soft border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-8">
              Kontribusi Anda
            </h2>

            <div className="glass-effect rounded-2xl p-8 bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    icon: "🌱",
                    label: "Sampah Didaur Ulang",
                    value: `${userStats.totalWasteDeposited} Kg`,
                  },
                  {
                    icon: "🌍",
                    label: "CO2 Terselamatkan",
                    value: `${(userStats.totalWasteDeposited * 1.5).toFixed(1)} Kg`,
                  },
                  {
                    icon: "📚",
                    label: "Kelas Diikuti",
                    value: `${userStats.totalTrainingCompleted} Kelas`,
                  },
                  {
                    icon: "🏆",
                    label: "Eco Poin",
                    value: `${userStats.ecoPoints} Poin`,
                  },
                ].map((contrib, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl mb-3">{contrib.icon}</div>
                    <p className="text-foreground/70 text-sm mb-2">{contrib.label}</p>
                    <p className="text-2xl font-poppins font-bold text-primary mb-3">
                      {contrib.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary/80 opacity-10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-6">
            Tingkatkan Kontribusi Anda
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Semakin banyak sampah yang dikelola dan edukasi yang diikuti, semakin besar dampak Anda
          </p>
          <Link to="/waste-bank/deposit" className="btn-primary inline-flex items-center justify-center gap-2">
            Mulai Setor Sampah
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
