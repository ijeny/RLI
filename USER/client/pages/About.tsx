import { ArrowRight, Leaf, TrendingUp, Users, Award, MapPin, Mail, Phone, Facebook, Instagram, Twitter, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function About() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const team = [
    { name: "Budi Santoso", role: "Founder & CEO", image: "👨‍💼" },
    { name: "Siti Rahayu", role: "Head of Agriculture", image: "👩‍🌾" },
    { name: "Ahmad Wijaya", role: "Tech Lead", image: "👨‍💻" },
    { name: "Dewi Lestari", role: "Community Manager", image: "👩‍💼" },
  ];

  const partners = [
    { name: "Kementerian Pertanian", logo: "🏛️" },
    { name: "Universitas Tanjungpura", logo: "🎓" },
    { name: "BKKBN", logo: "🏛️" },
    { name: "Bank Rakyat Indonesia", logo: "🏦" },
    { name: "Komunitas Petani Lokal", logo: "👥" },
    { name: "WWF Indonesia", logo: "🌍" },
  ];

  const faqs = [
    {
      q: "Bagaimana cara menjadi bagian dari komunitas IFK?",
      a: "Anda dapat mendaftar melalui platform kami. Isi formulir registrasi dengan informasi lengkap dan kami akan memverifikasi akun Anda dalam 24 jam.",
    },
    {
      q: "Apakah ada biaya untuk menggunakan layanan Bank Sampah Digital?",
      a: "Layanan dasar Bank Sampah Digital gratis. Fitur premium tersedia dengan paket berlangganan mulai dari Rp 50.000 per bulan.",
    },
    {
      q: "Bagaimana proses pengambilan sampah organik?",
      a: "Anda dapat menghubungi tim pengumpul melalui aplikasi. Kami akan mengatur jadwal pengambilan sesuai dengan lokasi Anda.",
    },
    {
      q: "Apa keuntungan mengikuti kelas edukasi di IFK?",
      a: "Dapatkan sertifikat resmi, akses ke mentor ahli, dan kesempatan networking dengan petani modern lainnya di komunitas kami.",
    },
    {
      q: "Bagaimana cara menjual produk di marketplace IFK?",
      a: "Daftarkan diri Anda sebagai penjual, lengkapi profil toko, dan upload produk Anda. Tim kami akan melakukan verifikasi dalam 2-3 hari kerja.",
    },
  ];

  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-teal-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-poppins font-bold text-secondary leading-tight">
                  Tentang IFK
                </h1>
                <p className="text-xl text-foreground/80">
                  Integrated Farming Ketapang - Platform Ekosistem Pertanian Berkelanjutan
                </p>
              </div>

              <p className="text-lg text-foreground/70 leading-relaxed max-w-lg">
                IFK adalah platform terpadu yang menghubungkan petani modern, edukasi pertanian, ekonomi sirkular, dan komunitas keberlanjutan dalam satu ekosistem digital yang powerful.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div>
                  <div className="text-3xl font-poppins font-bold text-primary mb-2">2023</div>
                  <p className="text-sm text-foreground/70">Tahun Didirikan</p>
                </div>
                <div>
                  <div className="text-3xl font-poppins font-bold text-primary mb-2">500+</div>
                  <p className="text-sm text-foreground/70">Pengguna Aktif</p>
                </div>
                <div>
                  <div className="text-3xl font-poppins font-bold text-primary mb-2">50+</div>
                  <p className="text-sm text-foreground/70">Partner Kolaborasi</p>
                </div>
              </div>
            </div>

            {/* Right - Illustration */}
            <div className="glass-effect rounded-2xl p-12 flex items-center justify-center min-h-96 bg-gradient-to-br from-primary/10 to-accent/10">
              <Leaf className="w-48 h-48 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-poppins font-bold text-secondary mb-4">Sejarah Singkat</h3>
              <p className="text-foreground/70 leading-relaxed">
                IFK didirikan pada tahun 2023 dengan visi untuk mentransformasi pertanian tradisional menjadi pertanian cerdas yang berkelanjutan. Kami memulai sebagai inisiatif lokal di Ketapang dan berkembang menjadi platform regional.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-poppins font-bold text-secondary mb-4">Latar Belakang</h3>
              <p className="text-foreground/70 leading-relaxed">
                Pertanian menghadapi tantangan besar: rendahnya produktivitas, kurangnya akses pasar, kesulitan edukasi, dan ketidakefisienan pengelolaan limbah. IFK lahir untuk mengatasi semua masalah ini dalam satu platform.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-poppins font-bold text-secondary mb-4">Tujuan Program</h3>
              <p className="text-foreground/70 leading-relaxed">
                Memberdayakan petani lokal dengan teknologi modern, menciptakan ekonomi sirkular yang berkelanjutan, meningkatkan pengetahuan pertanian, dan membangun komunitas petani yang kolaboratif.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="glass-effect rounded-2xl p-10 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-secondary">Visi</h3>
              </div>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Menjadi ekosistem pertanian digital terdepan di Asia Tenggara yang menghubungkan petani, teknologi, pendidikan, dan keberlanjutan dalam satu platform terintegrasi untuk menciptakan pertanian yang lebih cerdas, berkelanjutan, dan menguntungkan.
              </p>
            </div>

            {/* Mission */}
            <div className="glass-effect rounded-2xl p-10 bg-gradient-to-br from-secondary/5 to-accent/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-secondary">Misi</h3>
              </div>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Memberdayakan petani dengan akses teknologi dan pengetahuan modern</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Menciptakan peluang pasar yang adil dan menguntungkan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Mempromosikan praktik pertanian berkelanjutan dan ekonomi sirkular</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Circular Economy Flow */}
      <section className="py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-4">
              Ekonomi Sirkular IFK
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Alur transformasi limbah organik menjadi nilai ekonomi berkelanjutan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center">
            {[
              { title: "Sampah Organik", emoji: "♻️" },
              { title: "Maggot & Kasgot", emoji: "🐛" },
              { title: "Pupuk Organik", emoji: "🌱" },
              { title: "Peternakan & Perkebunan", emoji: "🐄" },
              { title: "Marketplace", emoji: "🛍️" },
              { title: "Dampak Ekonomi", emoji: "💰" },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                  {step.emoji}
                </div>
                <p className="text-center font-semibold text-foreground text-sm">{step.title}</p>
                {idx < 5 && <ArrowRight className="w-6 h-6 text-primary hidden md:block -ml-6" />}
              </div>
            ))}
          </div>

          <div className="mt-12 glass-effect rounded-2xl p-8 bg-gradient-to-br from-accent/10 to-primary/10">
            <h4 className="text-xl font-poppins font-bold text-secondary mb-4">Bagaimana Sistem Ini Bekerja?</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-foreground/70 leading-relaxed">
                  <strong>Input:</strong> Sampah organik dikumpulkan melalui Bank Sampah Digital dari rumah tangga dan bisnis lokal.
                </p>
              </div>
              <div>
                <p className="text-foreground/70 leading-relaxed">
                  <strong>Proses:</strong> Limbah dikonversi menjadi produk bernilai tinggi (maggot, kasgot, pupuk) melalui teknologi biotechnology.
                </p>
              </div>
              <div>
                <p className="text-foreground/70 leading-relaxed">
                  <strong>Output:</strong> Produk dijual di marketplace dengan harga kompetitif, menciptakan nilai ekonomi untuk semua pihak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-4">
              Program Unggulan IFK
            </h2>
            <p className="text-xl text-foreground/70">
              6 pilar utama ekosistem keberlanjutan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Marketplace Pertanian",
                description: "Platform e-commerce terintegrasi untuk jual-beli produk pertanian organik dan berkelanjutan langsung dari petani ke konsumen.",
                icon: "🛍️",
              },
              {
                title: "Edukasi Smart Farming",
                description: "Kelas online dan offline tentang pertanian modern, teknologi IoT, dan praktik berkelanjutan dari mentor bersertifikat.",
                icon: "📚",
              },
              {
                title: "Bank Sampah Digital",
                description: "Sistem manajemen limbah organik yang mengubah sampah menjadi aset. Kumpulkan sampah dan dapatkan reward serta poin ekologi.",
                icon: "♻️",
              },
              {
                title: "Program Keberlanjutan",
                description: "Dashboard analytics untuk mengukur dampak lingkungan, jejak karbon, dan kontribusi terhadap ekonomi sirkular.",
                icon: "🌍",
              },
              {
                title: "Wisata Literasi",
                description: "Paket edukasi experiential dengan kunjungan langsung ke lokasi proyek, demonstrasi teknologi, dan networking dengan petani.",
                icon: "🚌",
              },
              {
                title: "Komunitas Petani",
                description: "Forum diskusi, berbagi praktik terbaik, kolaborasi proyek, dan membangun jaringan petani modern berkelanjutan.",
                icon: "👥",
              },
            ].map((program, idx) => (
              <div key={idx} className="card-hover glass-effect rounded-2xl p-8 group">
                <div className="text-5xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-poppins font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-4">
              Dampak Program IFK
            </h2>
            <p className="text-xl text-foreground/70">
              Hasil nyata dari komitmen kami terhadap keberlanjutan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Statistik Lingkungan", stats: ["500+ Ton Sampah Dikelola", "50K+ Pohon Setara Ditanam", "1000+ Ton CO2 Dikurangi"] },
              { label: "Statistik Ekonomi", stats: ["Rp 500M+ Nilai Transaksi", "Rp 2B+ Income Petani", "200+ UKM Bermitra"] },
              { label: "Statistik Edukasi", stats: ["5000+ Peserta Edukasi", "150+ Kelas Terselenggara", "95% Kepuasan Peserta"] },
            ].map((section, idx) => (
              <div key={idx} className="glass-effect rounded-2xl p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-xl font-poppins font-bold text-secondary mb-6">{section.label}</h3>
                <div className="space-y-4">
                  {section.stats.map((stat, sidx) => (
                    <div key={sidx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground/80 font-semibold">{stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-4">
              Tim Pengelola
            </h2>
            <p className="text-xl text-foreground/70">
              Profesional berdedikasi yang memimpin visi IFK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="glass-effect rounded-2xl p-6 text-center group card-hover">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{member.image}</div>
                <h4 className="text-lg font-poppins font-bold text-secondary mb-2">{member.name}</h4>
                <p className="text-foreground/70 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & Collaboration */}
      <section className="py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-4">
              Partner & Kolaborasi
            </h2>
            <p className="text-xl text-foreground/70">
              Bermitra dengan institusi terkemuka untuk kesuksesan bersama
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, idx) => (
              <div key={idx} className="glass-effect rounded-2xl p-6 flex flex-col items-center justify-center gap-3 group card-hover">
                <div className="text-4xl group-hover:scale-125 transition-transform">{partner.logo}</div>
                <p className="text-sm font-semibold text-foreground/80 text-center">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-4">
              Pertanyaan Umum
            </h2>
            <p className="text-xl text-foreground/70">
              Jawaban untuk pertanyaan yang sering diajukan
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass-effect rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary/5 transition-colors"
                >
                  <span className="text-lg font-semibold text-foreground text-left">{faq.q}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-primary transition-transform ${openFAQ === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {openFAQ === idx && (
                  <div className="px-6 py-4 border-t bg-primary/5">
                    <p className="text-foreground/70 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-4">
              Kontak Kami
            </h2>
            <p className="text-xl text-foreground/70">
              Hubungi kami untuk informasi lebih lanjut atau kolaborasi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Alamat</h4>
                  <p className="text-foreground/70">
                    Jl. Diponegoro No. 123<br />
                    Ketapang, Kalimantan Barat 78811<br />
                    Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Email</h4>
                  <p className="text-foreground/70">
                    info@ifkketapang.id<br />
                    support@ifkketapang.id
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Telepon</h4>
                  <p className="text-foreground/70">
                    +62 534-1234-5678<br />
                    +62 812-3456-7890
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-4">Ikuti Kami</h4>
                <div className="flex items-center gap-4">
                  <button className="p-3 hover:bg-primary/10 rounded-lg transition-colors">
                    <Facebook className="w-6 h-6 text-primary" />
                  </button>
                  <button className="p-3 hover:bg-primary/10 rounded-lg transition-colors">
                    <Instagram className="w-6 h-6 text-primary" />
                  </button>
                  <button className="p-3 hover:bg-primary/10 rounded-lg transition-colors">
                    <Twitter className="w-6 h-6 text-primary" />
                  </button>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass-effect rounded-2xl p-8 flex items-center justify-center min-h-96 bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="text-center">
                <MapPin className="w-24 h-24 text-primary/30 mx-auto mb-6" />
                <p className="text-foreground/60 font-semibold">
                  Lokasi IFK Ketapang<br />
                  Kalimantan Barat, Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary/80 opacity-10"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/30 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-6">
            Bergabunglah dengan Ekosistem IFK
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Mari bersama-sama membangun pertanian yang lebih cerdas, berkelanjutan, dan menguntungkan untuk generasi mendatang.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary inline-flex items-center justify-center gap-2">
              Daftar Sekarang
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-outline inline-flex items-center justify-center gap-2">
              Hubungi Kami
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
