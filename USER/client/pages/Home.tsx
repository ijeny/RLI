import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ShoppingCartOutlined,
  BookOutlined,
  EnvironmentOutlined,
  RiseOutlined,
  DashboardOutlined,
  TeamOutlined,
  TrophyOutlined,
  RightOutlined,
  DollarOutlined,
  BankOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  LoadingState,
  EmptyState,
  ErrorState,
  SkeletonGrid,
} from "@/components/StateComponents";
import { getUserStats } from "@/services/userService";
import { getProducts } from "@/services/productService";
import { getEducationClasses } from "@/services/educationService";
import { getDashboard } from "@/services/dashboardService";
import { UserStats, Product, EducationClass, Activity } from "@/types";

export default function Home() {
  // User Stats State (from API)
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Products State (from API)
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  // Classes State (from API)
  const [recentClasses, setRecentClasses] = useState<EducationClass[]>([]);
  const [classesLoading, setClassesLoading] = useState(true);
  const [classesError, setClassesError] = useState<string | null>(null);

  // Community Activity State (from API)
  const [communityActivity, setCommunityActivity] = useState<Activity[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityError, setActivityError] = useState<string | null>(null);

  // Fetch user stats
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setStatsLoading(true);
        setStatsError(null);
        const data = await getUserStats();
        setUserStats(data);
      } catch (err) {
        setStatsError(
          err instanceof Error ? err.message : "Failed to load stats",
        );
      } finally {
        setStatsLoading(false);
      }
    };
    fetchUserStats();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError(null);
        const response = await getProducts(1, 4);
        setRecentProducts(response.data || []);
      } catch (err) {
        setProductsError(
          err instanceof Error ? err.message : "Failed to load products",
        );
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setClassesLoading(true);
        setClassesError(null);
        const response = await getEducationClasses(1, 3);
        setRecentClasses(response.data || []);
      } catch (err) {
        setClassesError(
          err instanceof Error ? err.message : "Failed to load classes",
        );
      } finally {
        setClassesLoading(false);
      }
    };
    fetchClasses();
  }, []);

  // Fetch community activity
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setActivityLoading(true);
        setActivityError(null);
        const dashboardData = await getDashboard();
        setCommunityActivity(dashboardData.recentActivity || []);
      } catch (err) {
        setActivityError(
          err instanceof Error ? err.message : "Failed to load activities",
        );
      } finally {
        setActivityLoading(false);
      }
    };
    fetchActivity();
  }, []);

  const quickAccess = [
    {
      title: "Produk IFK",
      desc: "Jelajahi produk organik",
      icon: ShoppingCartOutlined,
      link: "/produk",
    },
    {
      title: "Edukasi",
      desc: "Ikuti pelatihan & workshop",
      icon: BookOutlined,
      link: "/education",
    },
    {
      title: "Setor Sampah",
      desc: "Kelola sampah organik",
      icon: EnvironmentOutlined,
      link: "/waste-bank/deposit",
    },
    {
      title: "Tabungan",
      desc: "Dashboard tabungan sampah",
      icon: RiseOutlined,
      link: "/waste-bank",
    },
    {
      title: "Sustainability",
      desc: "Analytics keberlanjutan",
      icon: DashboardOutlined,
      link: "/sustainability",
    },
    {
      title: "Komunitas",
      desc: "Bergabung & berbagi",
      icon: TeamOutlined,
      link: "/komunitas",
    },
  ];

  const statsConfig = [
    {
      label: "Total Sampah Disetor",
      value: userStats ? `${userStats.totalWasteDeposited} Kg` : "-",
      icon: EnvironmentOutlined,
      color: "text-primary",
    },
    {
      label: "Saldo Tabungan Sampah",
      value: userStats ? `Rp ${userStats.totalSavings.toLocaleString("id-ID")}` : "-",
      icon: DollarOutlined,
      color: "text-accent",
    },
    {
      label: "Total Pelatihan Diikuti",
      value: userStats ? `${userStats.totalTrainingCompleted} Kelas` : "-",
      icon: BookOutlined,
      color: "text-secondary",
    },
    {
      label: "Eco Point / Reward",
      value: userStats ? `${userStats.ecoPoints} Poin` : "-",
      icon: TrophyOutlined,
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-teal-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full text-accent font-semibold text-sm">
                <EnvironmentOutlined className="text-accent" />
                Smart Farming Ecosystem
              </div>
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-secondary leading-tight">
                Halo, Ahmad 👋
              </h1>
              <p className="text-xl text-foreground/80">
                Kelola produk, edukasi, sampah organik, dan sustainability dalam
                satu platform
              </p>
            </div>

            {/* Personal User Statistics */}
            {statsLoading ? (
              <SkeletonGrid count={4} />
            ) : statsError ? (
              <div className="space-y-4">
                <ErrorState
                  title="Gagal memuat data"
                  message="Silakan coba lagi nanti"
                  onRetry={() => window.location.reload()}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {statsConfig.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={idx}
                        className="glass-effect rounded-xl p-6 group hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Icon className={`text-3xl ${stat.color}`} />
                        </div>
                        <div className="text-3xl font-poppins font-bold text-secondary mb-1">
                          {stat.value}
                        </div>
                        <p className="text-sm text-foreground/70">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
                {!userStats && (
                  <p className="text-sm text-foreground/60 text-center italic mt-2">
                    Data belum tersedia.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Access Menu */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-8">
            Akses Cepat Fitur
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickAccess.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.link}
                  className="group card-hover glass-effect rounded-2xl p-8 flex items-center gap-6"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                    <Icon className="text-3xl text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-poppins font-bold text-secondary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 text-sm">{item.desc}</p>
                  </div>
                  <RightOutlined className="text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Produk IFK */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-soft border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary">
              Produk IFK Terbaru
            </h2>
            <Link
              to="/produk"
              className="text-primary hover:text-secondary transition-colors font-semibold flex items-center gap-2"
            >
              Lihat Semua
              <RightOutlined className="w-4 h-4" />
            </Link>
          </div>

          {productsLoading ? (
            <SkeletonGrid count={4} />
          ) : productsError ? (
            <ErrorState
              title="Gagal memuat data"
              message="Silakan coba lagi nanti"
              onRetry={() => window.location.reload()}
            />
          ) : recentProducts.length === 0 ? (
            <EmptyState
              title="Daftar Produk Kosong"
              description="Belum ada produk yang tersedia saat ini."
              icon={InboxOutlined}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="card-hover glass-effect rounded-xl p-6 group"
                >
                  <div className="text-6xl mb-4 text-center">
                    {product.image}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-sm text-foreground/70 mb-2">
                    {product.category}
                  </p>
                  <p className="text-sm font-semibold text-primary mb-4">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  <button className="w-full btn-primary text-sm py-2">
                    Lihat Detail
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Edukasi */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary">
              Edukasi & Pelatihan
            </h2>
            <Link
              to="/education"
              className="text-primary hover:text-secondary transition-colors font-semibold flex items-center gap-2"
            >
              Lihat Semua
              <RightOutlined className="w-4 h-4" />
            </Link>
          </div>

          {classesLoading ? (
            <SkeletonGrid count={3} />
          ) : classesError ? (
            <ErrorState
              title="Gagal memuat data"
              message="Silakan coba lagi nanti"
              onRetry={() => window.location.reload()}
            />
          ) : recentClasses.length === 0 ? (
            <EmptyState
              title="Daftar Pelatihan Kosong"
              description="Belum ada pelatihan yang tersedia saat ini."
              icon={InboxOutlined}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="card-hover glass-effect rounded-xl p-6 group"
                >
                  <div className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-4">
                    {cls.category}
                  </div>
                  <h4 className="font-poppins font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {cls.title || cls.name}
                  </h4>
                  <div className="space-y-2 mb-4 text-sm text-foreground/70">
                    <p>👥 {cls.enrolled || 0} Peserta</p>
                    <p>📊 Level: {cls.level}</p>
                  </div>
                  <button className="w-full btn-outline text-sm py-2">
                    Lihat Detail
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bank Sampah Summary */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-soft border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Total Sampah Saya",
                value: userStats ? `${userStats.totalWasteDeposited} Kg` : "-",
                subtitle: "Tahun ini",
                icon: EnvironmentOutlined,
                change: userStats ? "+15%" : "-",
              },
              {
                title: "Total Saldo",
                value: userStats ? `Rp ${userStats.totalSavings.toLocaleString("id-ID")}` : "-",
                subtitle: "Tersedia untuk tarik",
                icon: BankOutlined,
                change: userStats ? "+8%" : "-",
              },
              {
                title: "Eco Points",
                value: userStats ? `${userStats.ecoPoints} Poin` : "-",
                subtitle: "Level: Eco Hero",
                icon: TrophyOutlined,
                change: userStats ? "+25%" : "-",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-effect rounded-2xl p-8 bg-gradient-to-br from-primary/5 to-accent/5"
                >
                  <div className="flex items-start justify-between mb-6">
                    <Icon className="text-3xl text-primary" />
                    <span className="text-accent font-semibold text-sm">
                      {item.change}
                    </span>
                  </div>
                  <h3 className="text-foreground/70 text-sm mb-2 uppercase">
                    {item.title}
                  </h3>
                  <div className="text-4xl font-poppins font-bold text-secondary mb-2">
                    {item.value}
                  </div>
                  <p className="text-foreground/60 text-sm">{item.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Komunitas */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary">
              Aktivitas Komunitas
            </h2>
            <Link
              to="/komunitas"
              className="text-primary hover:text-secondary transition-colors font-semibold flex items-center gap-2"
            >
              Lihat Semua
              <RightOutlined className="w-4 h-4" />
            </Link>
          </div>

          {activityLoading ? (
            <SkeletonGrid count={3} />
          ) : activityError ? (
            <ErrorState
              title="Gagal memuat data"
              message="Silakan coba lagi nanti"
              onRetry={() => window.location.reload()}
            />
          ) : communityActivity.length === 0 ? (
            <EmptyState
              title="Daftar Kosong"
              description="Belum ada data tersedia"
              icon={InboxOutlined}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {communityActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="card-hover glass-effect rounded-xl p-6 group"
                >
                  <h4 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {activity.title}
                  </h4>
                  <div className="space-y-2 text-sm text-foreground/70">
                    <p>📅 {activity.date}</p>
                    <p>👥 {activity.participants || 0} Peserta</p>
                  </div>
                  <button className="w-full btn-outline text-sm py-2 mt-4">
                    Selengkapnya
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sustainability Snapshot */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-soft border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary">
              Sustainability Score
            </h2>
            <Link
              to="/sustainability"
              className="text-primary hover:text-secondary transition-colors font-semibold flex items-center gap-2"
            >
              Dashboard Lengkap
              <RightOutlined className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-effect rounded-2xl p-8 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Pengurangan CO2", value: userStats ? `${(userStats.totalWasteDeposited * 1.5).toFixed(1)} Kg` : "-", icon: "🌍" },
                { label: "Produksi Pupuk", value: userStats ? `${(userStats.totalWasteDeposited * 0.8).toFixed(1)} Kg` : "-", icon: "🌱" },
                { label: "Dampak Ekonomi", value: userStats ? `Rp ${userStats.totalSavings.toLocaleString("id-ID")}` : "-", icon: "💰" },
                { label: "Kontribusi Eco Poin", value: userStats ? `${userStats.ecoPoints} Poin` : "-", icon: "🏆" },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="text-foreground/70 text-sm mb-1">
                    {item.label}
                  </p>
                  <p className="text-2xl font-poppins font-bold text-primary">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary/80 opacity-10"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/30 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-6">
            Mari Bersama Bangun Masa Depan Berkelanjutan
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Jelajahi semua fitur IFK untuk pertanian cerdas, edukasi, ekonomi
            sirkular, dan keberlanjutan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/produk"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Jelajahi Produk
              <RightOutlined className="w-4 h-4" />
            </Link>
            <Link
              to="/education"
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              Lihat Edukasi
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
