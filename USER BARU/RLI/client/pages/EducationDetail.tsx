import { useState } from "react";
import { Share2, Heart, Star, Users, Calendar, Clock, MapPin, BookOpen, ArrowRight, Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EducationDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "reviews">("overview");

  // Mock data
  const classData = {
    id: 1,
    name: "Pertanian Modern & Sustainable",
    category: "Pertanian Modern",
    level: "Pemula",
    mentor: "Dr. Bambang Sutrisno",
    mentorBio: "Doktor Pertanian dengan pengalaman 20 tahun di bidang sustainable farming",
    mentorImage: "👨‍🌾",
    description:
      "Kelas ini mengajarkan teknik pertanian modern yang ramah lingkungan dan berkelanjutan. Cocok untuk pemula yang ingin memulai perjalanan farming mereka.",
    schedule: "Setiap Minggu, 10:00 AM",
    duration: "8 minggu",
    quota: 30,
    enrolled: 28,
    price: 150000,
    rating: 4.9,
    reviewCount: 156,
    image: "🌾",
    location: "Online + Workshop Lapang",
    startDate: "2024-02-01",
    materialFormats: ["Video HD", "PDF Materi", "Slide Presentation", "Praktik Langsung"],
    benefits: [
      "Sertifikat resmi setelah selesai",
      "Akses materi selamanya",
      "Komunitas farmer eksklusif",
      "Mentoring pribadi",
      "Akses ke tools farming digital",
    ],
    curriculum: [
      {
        week: 1,
        title: "Fondasi Pertanian Modern",
        topics: [
          "Definisi sustainable farming",
          "Pengenalan IoT di pertanian",
          "Teknologi terbaru",
        ],
      },
      {
        week: 2,
        title: "Persiapan Lahan",
        topics: [
          "Analisis tanah",
          "Persiapan media tanam",
          "Pemilihan lokasi optimal",
        ],
      },
      {
        week: 3,
        title: "Pemilihan Tanaman",
        topics: [
          "Varietas unggulan",
          "Adaptasi iklim",
          "Musim tanam",
        ],
      },
      {
        week: 4,
        title: "Perawatan & Monitoring",
        topics: [
          "Irigasi optimal",
          "Monitoring kesehatan tanaman",
          "Sensor IoT praktis",
        ],
      },
      {
        week: "5-8",
        title: "Praktik Lapang & Project",
        topics: [
          "Tanam percobaan",
          "Dokumentasi hasil",
          "Presentasi project",
        ],
      },
    ],
    reviews: [
      {
        author: "Ahmad Suryanto",
        rating: 5,
        text: "Kelas yang sangat bermanfaat dan mentor sangat responsif!",
        avatar: "👨",
      },
      {
        author: "Siti Nurhaliza",
        rating: 5,
        text: "Praktiknya langsung di lapang, sangat memorable!",
        avatar: "👩",
      },
      {
        author: "Rendra Wijaya",
        rating: 4,
        text: "Materi bagus, hanya saja butuh lebih banyak video tutorial",
        avatar: "👨",
      },
    ],
  };

  return (
    <div className="w-full">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <Link to="/education" className="text-primary font-semibold hover:text-secondary mb-4 inline-flex items-center gap-2">
          ← Kembali ke Edukasi
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                      {classData.level}
                    </span>
                    <span className="text-sm text-foreground/60">{classData.category}</span>
                  </div>
                  <h1 className="text-4xl font-poppins font-bold text-secondary">
                    {classData.name}
                  </h1>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite ? "fill-accent text-accent" : "text-foreground"
                    }`}
                  />
                </button>
              </div>

              {/* Hero Image */}
              <div className="glass-effect rounded-2xl h-80 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 text-9xl">
                {classData.image}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="glass-effect rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                  </div>
                  <div className="font-bold text-foreground">{classData.rating}</div>
                  <div className="text-xs text-foreground/60">({classData.reviewCount})</div>
                </div>
                <div className="glass-effect rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-bold text-foreground">
                    {classData.enrolled}/{classData.quota}
                  </div>
                  <div className="text-xs text-foreground/60">Peserta</div>
                </div>
                <div className="glass-effect rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-bold text-foreground">{classData.duration}</div>
                  <div className="text-xs text-foreground/60">Durasi</div>
                </div>
                <div className="glass-effect rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-bold text-foreground">Minggu</div>
                  <div className="text-xs text-foreground/60">Terjadwal</div>
                </div>
              </div>
            </div>

            {/* Mentor Info */}
            <div className="glass-effect rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-foreground text-lg">Mentor</h3>
              <div className="flex items-center gap-4">
                <div className="text-5xl">{classData.mentorImage}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-lg">{classData.mentor}</h4>
                  <p className="text-sm text-foreground/70">{classData.mentorBio}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b flex gap-8">
              {["overview", "curriculum", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-4 font-semibold transition-colors ${
                    activeTab === tab
                      ? "text-primary border-b-2 border-primary"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {tab === "overview" && "Overview"}
                  {tab === "curriculum" && "Kurikulum"}
                  {tab === "reviews" && "Review"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Deskripsi</h3>
                  <p className="text-foreground/70 leading-relaxed">{classData.description}</p>
                </div>

                <div className="glass-effect rounded-lg p-6 space-y-4">
                  <h3 className="font-bold text-foreground">Informasi Kelas</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-foreground/60">Jadwal</p>
                        <p className="font-semibold text-foreground">
                          {classData.schedule}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-foreground/60">Lokasi</p>
                        <p className="font-semibold text-foreground">
                          {classData.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-foreground/60">Format Materi</p>
                        <p className="font-semibold text-foreground">
                          {classData.materialFormats.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-foreground">Benefit Kelas</h3>
                  <div className="space-y-2">
                    {classData.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "curriculum" && (
              <div className="space-y-4">
                {classData.curriculum.map((item, idx) => (
                  <div key={idx} className="glass-effect rounded-lg p-6 space-y-3">
                    <h4 className="font-bold text-foreground text-lg">
                      Minggu {item.week}: {item.title}
                    </h4>
                    <ul className="space-y-2">
                      {item.topics.map((topic, tidx) => (
                        <li key={tidx} className="flex items-start gap-3 text-foreground/70">
                          <span className="text-primary font-bold mt-1">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                {classData.reviews.map((review, idx) => (
                  <div key={idx} className="glass-effect rounded-lg p-6">
                    <div className="flex items-start gap-4 mb-3">
                      <span className="text-3xl">{review.avatar}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground">{review.author}</h4>
                        <div className="flex gap-1">
                          {Array(review.rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-accent text-accent"
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground/70">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right - Booking Card */}
          <div className="lg:col-span-1 sticky top-24 h-fit">
            <div className="glass-effect rounded-2xl p-8 space-y-6 bg-primary/10">
              <div>
                <p className="text-foreground/70 text-sm mb-2">Harga Kelas</p>
                <div className="text-4xl font-bold text-primary">
                  {classData.price > 0 ? (
                    <>Rp {classData.price.toLocaleString("id-ID")}</>
                  ) : (
                    "Gratis"
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">Kuota Tersisa</span>
                  <span className="font-bold text-foreground">
                    {classData.quota - classData.enrolled} dari {classData.quota}
                  </span>
                </div>
                <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${(classData.enrolled / classData.quota) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <Link
                to={`/education/${id}/booking`}
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                Booking Kelas
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button className="w-full border-2 border-primary text-primary py-2 rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                Bagikan
              </button>

              <div className="glass-effect bg-white/50 rounded-lg p-4 space-y-2 text-sm">
                <p className="font-semibold text-foreground">Informasi Penting</p>
                <ul className="space-y-1 text-foreground/70">
                  <li>✓ Mulai: {classData.startDate}</li>
                  <li>✓ Sertifikat resmi</li>
                  <li>✓ Akses seumur hidup</li>
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

export default EducationDetail;
