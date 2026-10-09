import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Leaf, Zap, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Sustainability() {
  const monthlyData = [
    { month: "Jan", sampah: 2000, co2: 1200, pupuk: 800 },
    { month: "Feb", sampah: 2500, co2: 1500, pupuk: 1000 },
    { month: "Mar", sampah: 2200, co2: 1300, pupuk: 900 },
    { month: "Apr", sampah: 3000, co2: 1800, pupuk: 1200 },
    { month: "May", sampah: 3500, co2: 2100, pupuk: 1400 },
    { month: "Jun", sampah: 4200, co2: 2500, pupuk: 1700 },
  ];

  const categoryData = [
    { name: "Plastik", value: 2500, color: "#10b981" },
    { name: "Organik", value: 8500, color: "#059669" },
    { name: "Kertas", value: 4200, color: "#047857" },
    { name: "Elektronik", value: 1200, color: "#065f46" },
    { name: "Lainnya", value: 3600, color: "#0d3b2e" },
  ];

  const impactMetrics = [
    {
      icon: Leaf,
      label: "Total Sampah Didaur Ulang",
      value: "24,500 Kg",
      change: "+15%",
      color: "text-primary",
    },
    {
      icon: Zap,
      label: "Pengurangan CO2",
      value: "5,250 Ton",
      change: "+22%",
      color: "text-accent",
    },
    {
      icon: TrendingUp,
      label: "Produksi Pupuk Organik",
      value: "12,500 Kg",
      change: "+18%",
      color: "text-secondary",
    },
    {
      icon: Award,
      label: "Dampak Ekonomi",
      value: "Rp 15M+",
      change: "+12%",
      color: "text-emerald-600",
    },
  ];

  const sustainabilityScores = [
    { category: "Environmental", score: 92 },
    { category: "Economic", score: 88 },
    { category: "Social", score: 85 },
    { category: "Innovation", score: 90 },
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
                    <span className="text-accent font-semibold text-sm">{metric.change}</span>
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
                Trend Sampah & Dampak (6 Bulan Terakhir)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
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
                    name="Reduksi CO2 (Ton)"
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

            {/* Pie Chart */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="font-poppins font-bold text-secondary mb-6">
                Komposisi Sampah yang Dikelola
              </h3>
              <ResponsiveContainer width="100%" height={300}>
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
          </div>

          {/* Bar Chart */}
          <div className="glass-effect rounded-2xl p-6 mb-8">
            <h3 className="font-poppins font-bold text-secondary mb-6">
              Sustainability Score per Kategori
            </h3>
            <ResponsiveContainer width="100%" height={300}>
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
      </section>

      {/* Certification & Goals */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-8">
            Sertifikasi & Target
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Sertifikasi Organik",
                status: "Tersertifikasi",
                badge: "🏆",
              },
              {
                title: "Eco Label Premium",
                status: "Tersertifikasi",
                badge: "🌿",
              },
              {
                title: "Circular Economy Badge",
                status: "Dalam Proses",
                badge: "♻️",
              },
              {
                title: "Carbon Neutral Target 2025",
                status: "82% Tercapai",
                badge: "🌍",
              },
              {
                title: "Zero Waste Initiative",
                status: "90% Tercapai",
                badge: "✨",
              },
              {
                title: "Community Impact Score",
                status: "Excellent",
                badge: "👥",
              },
            ].map((cert, idx) => (
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
                  value: "450 Kg",
                  progress: 75,
                },
                {
                  icon: "🌍",
                  label: "CO2 Terselamatkan",
                  value: "125 Ton",
                  progress: 65,
                },
                {
                  icon: "📚",
                  label: "Kelas Diikuti",
                  value: "8 Kelas",
                  progress: 80,
                },
                {
                  icon: "👥",
                  label: "Kontribusi Komunitas",
                  value: "15 Event",
                  progress: 70,
                },
              ].map((contrib, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl mb-3">{contrib.icon}</div>
                  <p className="text-foreground/70 text-sm mb-2">{contrib.label}</p>
                  <p className="text-2xl font-poppins font-bold text-primary mb-3">
                    {contrib.value}
                  </p>
                  <div className="w-full bg-foreground/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      style={{ width: `${contrib.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-foreground/60 mt-2">
                    {contrib.progress}% Target
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
          <button className="btn-primary inline-flex items-center justify-center gap-2">
            Mulai Setor Sampah
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
