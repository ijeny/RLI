import { useState, useEffect } from "react";
import {
  SearchOutlined,
  FilterOutlined,
  StarFilled,
  TeamOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  DownOutlined,
  BookOutlined,
  ThunderboltOutlined,
  UserOutlined,
  BankOutlined,
  LineChartOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getEducationClasses,
  getEducationCategories,
} from "@/services/educationService";
import { EducationClass } from "@/types";
import {
  LoadingState,
  EmptyState,
  ErrorState,
} from "@/components/StateComponents";

// Helper function to render icons based on type
function getIconComponent(iconType: string) {
  const iconProps = "text-foreground text-lg";

  switch (iconType) {
    case "farmer-male":
    case "farmer-female":
    case "businessman":
      return <UserOutlined className={iconProps} />;
    case "teacher":
      return <BookOutlined className={iconProps} />;
    case "scientist":
      return <LineChartOutlined className={iconProps} />;
    case "wheat":
    case "leaves":
    case "recycling":
      return <EnvironmentOutlined className={iconProps} />;
    default:
      return <EnvironmentOutlined className={iconProps} />;
  }
}

function getClassIconComponent(iconType: string) {
  const iconProps = "text-3xl text-foreground";
  switch (iconType) {
    case "wheat":
    case "leaves":
    case "recycling":
      return <EnvironmentOutlined className={iconProps} />;
    case "city":
      return <BankOutlined className={iconProps} />;
    case "chart":
      return <LineChartOutlined className={iconProps} />;
    default:
      return <EnvironmentOutlined className={iconProps} />;
  }
}

const Education = () => {
  const [classes, setClasses] = useState<EducationClass[]>([]);
  const [categories, setCategories] = useState<string[]>(["Semua Kategori"]);
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("populer");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch classes and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const classesResponse = await getEducationClasses(1, 100);
        setClasses(classesResponse.data || []);

        // Extract unique categories from classes
        const uniqueCategories = new Set<string>();
        (classesResponse.data || []).forEach((cls: EducationClass) => {
          if (cls.category) {
            uniqueCategories.add(cls.category);
          }
        });
        setCategories(["Semua Kategori", ...Array.from(uniqueCategories)]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredClasses = classes.filter((cls) => {
    const categoryMatch =
      selectedCategory === "Semua Kategori" ||
      cls.category === selectedCategory;
    const nameStr = cls.title || cls.name || "";
    const searchMatch = nameStr
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const levelMatch = !selectedLevel || cls.level === selectedLevel;
    return categoryMatch && searchMatch && levelMatch;
  });

  const sortedClasses = [...filteredClasses].sort((a, b) => {
    const ratingA = a.rating || 0;
    const ratingB = b.rating || 0;
    const priceA = a.price || 0;
    const priceB = b.price || 0;
    const reviewsA = a.reviews || 0;
    const reviewsB = b.reviews || 0;

    if (sortBy === "rating") return ratingB - ratingA;
    if (sortBy === "harga-rendah") return priceA - priceB;
    if (sortBy === "harga-tinggi") return priceB - priceA;
    return reviewsB - reviewsA;
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
            <div className="flex justify-center mb-4">
              <BookOutlined className="text-5xl text-primary animate-bounce" />
            </div>
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
                <SearchOutlined className="text-lg" />
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
                  {categories.map((cat) => (
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
                    <label
                      key={level}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLevel === level}
                        onChange={() =>
                          setSelectedLevel(
                            selectedLevel === level ? null : level,
                          )
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
                Menampilkan{" "}
                <span className="font-bold text-foreground">
                  {sortedClasses.length}
                </span>{" "}
                kelas
              </p>
            </div>

            {loading && <LoadingState />}
            {error && (
              <ErrorState
                title="Gagal memuat data"
                message="Silakan coba lagi nanti"
                onRetry={() => window.location.reload()}
              />
            )}
            {!loading && !error && sortedClasses.length === 0 && (
              <EmptyState
                title="Daftar Pelatihan Kosong"
                description="Belum ada pelatihan yang tersedia saat ini."
                icon={InboxOutlined}
              />
            )}
            {!loading && !error && sortedClasses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedClasses.map((cls) => (
                  <Link
                    key={cls.id}
                    to={`/education/${cls.id}`}
                    className="glass-effect rounded-xl overflow-hidden hover:shadow-xl transition-all group"
                  >
                    {/* Image */}
                    <div className="relative h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                      <div className="group-hover:scale-110 transition-transform">
                        {getClassIconComponent(cls.image || "")}
                      </div>
                      <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                        {cls.level}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div>
                        <p className="text-xs text-foreground/60 mb-1">
                          {cls.category}
                        </p>
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {cls.title || cls.name}
                        </h3>
                      </div>

                      {/* Mentor */}
                      <div className="flex items-center gap-2">
                        <div className="text-lg">
                          {getIconComponent("farmer-male")}
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60">Mentor</p>
                          <p className="text-xs font-semibold text-foreground">
                            {cls.mentor && typeof cls.mentor === "object"
                              ? cls.mentor.name
                              : (typeof cls.mentor === "string" ? cls.mentor : "Mentor IFK")}
                          </p>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="space-y-2 py-2 border-t border-foreground/10">
                        <div className="flex items-center gap-2 text-xs text-foreground/60">
                          <CalendarOutlined />
                          {cls.schedule || cls.date}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-foreground/60">
                          <ThunderboltOutlined />
                          {cls.duration || "Sesi Terjadwal"}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-foreground/60">
                          <TeamOutlined />
                          {cls.enrolled || 0}/{cls.quota} peserta
                        </div>
                      </div>

                      {/* Rating & Price */}
                      <div className="flex items-center justify-between pt-2 border-t border-foreground/10">
                        <div className="flex items-center gap-1">
                          <StarFilled className="text-yellow-500 text-sm" />
                          <span className="text-sm font-bold text-foreground">
                            {cls.rating || 0}
                          </span>
                          <span className="text-xs text-foreground/60">
                            ({cls.reviews || 0})
                          </span>
                        </div>
                        <div className="text-right">
                          {cls.price && cls.price > 0 ? (
                            <p className="text-sm font-bold text-primary">
                              Rp {cls.price.toLocaleString("id-ID")}
                            </p>
                          ) : (
                            <p className="text-sm font-bold text-accent">
                              Gratis
                            </p>
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
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Education;
