import { useState } from "react";
import {
  Search,
  Filter,
  Star,
  Users,
  Calendar,
  MapPin,
  ChevronDown,
  BookOpen,
  Zap,
  Inbox,
  UserRound,
  Settings,
  Bell,
  ShoppingCart,
  Heart,
  Menu,
  Home,
  ArrowRight,
  CircleHelp,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Class {
  id: number;
  name: string;
  category: string;
  mentor: string;
  mentorImage: string;
  schedule: string;
  duration: string;
  quota: number;
  enrolled: number;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  level: "Pemula" | "Menengah" | "Lanjutan";
}

const CLASSES: Class[] = [
  {
    id: 1,
    name: "Pertanian Modern & Sustainable",
    category: "Pertanian Modern",
    mentor: "Dr. Bambang Sutrisno",
    mentorImage: "👨‍🌾",
    schedule: "Setiap Minggu, 10:00 AM",
    duration: "8 minggu",
    quota: 30,
    enrolled: 28,
    price: 150000,
    rating: 4.9,
    reviews: 156,
    image: "🌾",
    description: "Belajar teknik pertanian modern yang berkelanjutan",
    level: "Pemula",
  },
  {
    id: 2,
    name: "Smart Farming dengan IoT",
    category: "Smart Farming",
    mentor: "Ing. Rendra Wijaya",
    mentorImage: "👨‍💼",
    schedule: "Senin & Rabu, 2:00 PM",
    duration: "6 minggu",
    quota: 25,
    enrolled: 22,
    price: 250000,
    rating: 4.8,
    reviews: 89,
    image: "📡",
    description: "Gunakan teknologi IoT untuk mengoptimalkan hasil panen",
    level: "Menengah",
  },
  {
    id: 3,
    name: "Sistem Hidroponik untuk Pemula",
    category: "Hidroponik",
    mentor: "Ir. Siti Nurhaliza",
    mentorImage: "👩‍🌾",
    schedule: "Sabtu, 9:00 AM",
    duration: "4 minggu",
    quota: 20,
    enrolled: 18,
    price: 200000,
    rating: 4.7,
    reviews: 124,
    image: "🌿",
    description: "Mulai hidroponik tanpa lahan besar",
    level: "Pemula",
  },
  {
    id: 4,
    name: "Manajemen Sampah Organik",
    category: "Pengelolaan Sampah",
    mentor: "Drs. Hendra Kusuma",
    mentorImage: "👨‍🏫",
    schedule: "Jumat, 3:00 PM",
    duration: "5 minggu",
    quota: 25,
    enrolled: 25,
    price: 120000,
    rating: 4.6,
    reviews: 112,
    image: "♻️",
    description: "Kelola sampah organik menjadi pupuk berkualitas",
    level: "Pemula",
  },
  {
    id: 5,
    name: "Urban Farming Untuk Kota",
    category: "Urban Farming",
    mentor: "Yenny Prasetya",
    mentorImage: "👩‍💼",
    schedule: "Minggu, 11:00 AM",
    duration: "6 minggu",
    quota: 30,
    enrolled: 15,
    price: 180000,
    rating: 4.8,
    reviews: 98,
    image: "🏙️",
    description: "Bertani di lahan terbatas dengan hasil maksimal",
    level: "Pemula",
  },
  {
    id: 6,
    name: "Advanced Smart Farming Analytics",
    category: "Smart Farming",
    mentor: "Prof. Dr. Agus Hermawan",
    mentorImage: "👨‍🔬",
    schedule: "Senin & Kamis, 1:00 PM",
    duration: "8 minggu",
    quota: 20,
    enrolled: 19,
    price: 350000,
    rating: 4.9,
    reviews: 67,
    image: "📊",
    description: "Analisis data pertanian lanjutan dengan AI",
    level: "Lanjutan",
  },
];

const CATEGORIES = [
  "Semua Kategori",
  "Pertanian Modern",
  "Smart Farming",
  "Hidroponik",
  "Pengelolaan Sampah",
  "Urban Farming",
  "Digital Marketing Pertanian",
];

const Education = () => {
  const [classes, setClasses] = useState(CLASSES);
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("populer");

  const filteredClasses = classes.filter((cls) => {
    const categoryMatch =
      selectedCategory === "Semua Kategori" || cls.category === selectedCategory;
    const searchMatch = cls.name.toLowerCase().includes(searchQuery.toLowerCase());
    const levelMatch = !selectedLevel || cls.level === selectedLevel;
    return categoryMatch && searchMatch && levelMatch;
  });

  const sortedClasses = [...filteredClasses].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "harga-rendah") return a.price - b.price;
    if (sortBy === "harga-tinggi") return b.price - a.price;
    return b.reviews - a.reviews;
  });

  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-teal-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-secondary">
              Platform Edukasi Pertanian
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Belajar teknik pertanian modern dari para ahli industri
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto w-full">
            <div className="glass-effect rounded-xl p-1 flex gap-2">
              <input
                type="text"
                placeholder="Cari kelas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 bg-transparent focus:outline-none"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center gap-2">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 justify-center max-w-md mx-auto">
            <div>
              <div className="text-2xl font-bold text-primary">150+</div>
              <p className="text-xs text-foreground/60">Kelas</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">1000+</div>
              <p className="text-xs text-foreground/60">Peserta</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">100%</div>
              <p className="text-xs text-foreground/60">Gratis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filter */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Category Filter */}
              <div className="glass-effect rounded-lg p-4 space-y-3">
                <h3 className="font-bold text-foreground">Kategori</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                        selectedCategory === cat
                          ? "bg-primary text-white"
                          : "text-foreground hover:bg-primary/10"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div className="glass-effect rounded-lg p-4 space-y-3">
                <h3 className="font-bold text-foreground">Level</h3>
                <div className="space-y-2">
                  {["Pemula", "Menengah", "Lanjutan"].map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLevel === level}
                        onChange={() =>
                          setSelectedLevel(selectedLevel === level ? null : level)
                        }
                        className="w-4 h-4 accent-primary rounded"
                      />
                      <span className="text-sm text-foreground">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="glass-effect rounded-lg p-4 space-y-3">
                <h3 className="font-bold text-foreground">Urutkan</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none text-sm"
                >
                  <option value="populer">Terpopuler</option>
                  <option value="rating">Rating Tertinggi</option>
                  <option value="harga-rendah">Harga Terendah</option>
                  <option value="harga-tinggi">Harga Tertinggi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Classes Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-foreground/70">
                Menampilkan <span className="font-bold text-foreground">{sortedClasses.length}</span> kelas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedClasses.map((cls) => (
                <Link
                  key={cls.id}
                  to={`/education/${cls.id}`}
                  className="glass-effect rounded-xl overflow-hidden hover:shadow-xl transition-all group"
                >
                  {/* Image */}
                  <div className="relative h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                    <div className="text-6xl group-hover:scale-110 transition-transform">
                      {cls.image}
                    </div>
                    <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                      {cls.level}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <p className="text-xs text-foreground/60 mb-1">{cls.category}</p>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {cls.name}
                      </h3>
                    </div>

                    {/* Mentor */}
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{cls.mentorImage}</span>
                      <div>
                        <p className="text-xs text-foreground/60">Mentor</p>
                        <p className="text-xs font-semibold text-foreground">
                          {cls.mentor}
                        </p>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-2 py-2 border-t border-foreground/10">
                      <div className="flex items-center gap-2 text-xs text-foreground/60">
                        <Calendar className="w-4 h-4" />
                        {cls.schedule}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-foreground/60">
                        <Zap className="w-4 h-4" />
                        {cls.duration}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-foreground/60">
                        <Users className="w-4 h-4" />
                        {cls.enrolled}/{cls.quota} peserta
                      </div>
                    </div>

                    {/* Rating & Price */}
                    <div className="flex items-center justify-between pt-2 border-t border-foreground/10">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-bold text-foreground">
                          {cls.rating}
                        </span>
                        <span className="text-xs text-foreground/60">
                          ({cls.reviews})
                        </span>
                      </div>
                      <div className="text-right">
                        {cls.price > 0 ? (
                          <p className="text-sm font-bold text-primary">
                            Rp {cls.price.toLocaleString("id-ID")}
                          </p>
                        ) : (
                          <p className="text-sm font-bold text-accent">Gratis</p>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-secondary transition-colors mt-3">
                      Lihat Detail
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {sortedClasses.length === 0 && (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <Inbox className="w-14 h-14 text-gray-400" />
                </div>
                <p className="text-foreground/70">Tidak ada kelas yang sesuai</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Education;
