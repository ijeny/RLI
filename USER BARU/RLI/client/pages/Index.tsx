import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Leaf, Sprout, Zap, BookOpen, Recycle, Users, TrendingUp, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-teal-50">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full text-accent font-semibold text-sm">
                  <Leaf className="w-4 h-4" />
                  Selamat Datang di Pertanian Cerdas
                </div>
                <h1 className="text-5xl md:text-6xl font-poppins font-bold text-secondary leading-tight">
                  Integrated Farming Ketapang
                </h1>
                <p className="text-xl text-foreground/80">
                  Sistem Manajemen Pertanian Terpadu
                </p>
              </div>

              <p className="text-lg text-foreground/70 leading-relaxed max-w-lg">
                Kelola pertanian, edukasi, inventaris, dan keberlanjutan dalam satu platform digital terintegrasi. Transformasikan operasi pertanian Anda dengan teknologi modern.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2">
                  Mulai Sekarang
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="btn-outline inline-flex items-center justify-center gap-2">
                  Jelajahi Produk
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-sm">100% Aman</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-sm">Dukungan 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-sm">Berbasis Cloud</span>
                </div>
              </div>
            </div>

            {/* Right - Hero Illustration Card */}
            <div className="relative h-96 lg:h-full min-h-96">
              <div className="absolute inset-0 glass-effect rounded-2xl p-8 flex flex-col items-center justify-center space-y-6 group">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Sprout className="w-12 h-12 text-white" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-poppins font-bold text-2xl text-secondary">Pertanian Cerdas</h3>
                  <p className="text-foreground/70">Teknologi canggih bertemu pertanian</p>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-8 -left-8 glass-effect-sm rounded-xl p-4 max-w-xs animate-float-up">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold">Analitik Real-time</p>
                      <p className="text-xs text-foreground/60">Pantau metrik pertanian</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -right-8 glass-effect-sm rounded-xl p-4 max-w-xs animate-float-up" style={{ animationDelay: "0.5s" }}>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold">Tingkatkan Produktivitas</p>
                      <p className="text-xs text-foreground/60">Naikkan hasil hingga 40%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-poppins font-bold text-primary mb-2">500+</div>
              <p className="text-foreground/70">Petani Aktif</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-poppins font-bold text-primary mb-2">2500+</div>
              <p className="text-foreground/70">Produk Terdaftar</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-poppins font-bold text-primary mb-2">150+</div>
              <p className="text-foreground/70">Kelas Selesai</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-poppins font-bold text-primary mb-2">10K+</div>
              <p className="text-foreground/70">Sampah Terkumpul</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-4">
              Fitur Canggih
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk mengelola operasi pertanian secara efisien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              {
                icon: Sprout,
                title: "Pertanian Cerdas",
                description: "Pertanian berbasis IoT dengan pemantauan real-time dan analitik untuk hasil optimal",
              },
              {
                icon: BookOpen,
                title: "Edukasi Digital",
                description: "Kelas komprehensif dan modul pembelajaran dari para ahli industri",
              },
              {
                icon: Zap,
                title: "Manajemen Inventaris",
                description: "Lacak tingkat stok, gerakan, dan otomatisasi pemesanan",
              },
              {
                icon: TrendingUp,
                title: "Pusat Transaksi",
                description: "Platform e-commerce aman untuk membeli dan menjual produk pertanian",
              },
              {
                icon: Recycle,
                title: "Bank Sampah Digital",
                description: "Kelola konversi sampah organik dan praktik ramah lingkungan",
              },
              {
                icon: Users,
                title: "Pusat Komunitas",
                description: "Terhubung dengan petani, berbagi pengetahuan, dan bangun jaringan berkelanjutan",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="card-hover glass-effect rounded-2xl p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-secondary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary/80 opacity-10"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/30 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-6">
            Siap Mengubah Pertanian Anda?
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan petani yang sudah menggunakan IFK untuk meningkatkan produktivitas dan keberlanjutan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2">
              Mulai Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="btn-outline inline-flex items-center justify-center gap-2">
              Pesan Demo
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose IFK Section */}
      <section className="py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-4">
              Mengapa Pilih IFK?
            </h2>
            <p className="text-xl text-foreground/70">
              Dibangun untuk petani modern yang ingin sukses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                "Platform all-in-one komprehensif untuk operasi pertanian",
                "Analitik dan wawasan data real-time",
                "Integrasi mulus dengan alat yang ada",
                "Infrastruktur cloud yang aman dan dapat diandalkan",
                "Dukungan ahli dan pembaruan berkelanjutan",
                "Fokus pada pertanian berkelanjutan",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <Award className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-lg text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="glass-effect rounded-2xl p-12 flex items-center justify-center min-h-96 bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="text-center">
                <Leaf className="w-32 h-32 text-primary/30 mx-auto mb-6" />
                <p className="text-foreground/60 font-semibold">
                  Masa depan pertanian berkelanjutan Anda dimulai di sini
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
