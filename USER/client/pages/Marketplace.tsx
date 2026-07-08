import { useEffect, useState } from "react";
import { ArrowRight, Heart, Star, Filter, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProducts } from "@/services/productService";
import SearchBar from "@/components/SearchBar";
// import { Product } from "@/types";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  seller: string;
  stock: number;
  isFavorite: boolean;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Sayuran Organik Premium",
    category: "Sayur Organik",
    price: 45000,
    rating: 4.8,
    reviews: 324,
    image: "🥬",
    badge: "Terlaris",
    seller: "Petani Hijau",
    stock: 50,
    isFavorite: false,
  },
  {
    id: 2,
    name: "Bibit Tomat Hibrida",
    category: "Bibit Tanaman",
    price: 12000,
    rating: 4.6,
    reviews: 156,
    image: "🍅",
    badge: "Baru",
    seller: "Benih Berkualitas",
    stock: 100,
    isFavorite: false,
  },
  {
    id: 3,
    name: "Pupuk Organik Alami",
    category: "Pupuk",
    price: 35000,
    rating: 4.7,
    reviews: 287,
    image: "🌱",
    seller: "Ekopertanian",
    stock: 75,
    isFavorite: false,
  },
  {
    id: 4,
    name: "Buah Mangga Manis",
    category: "Buah Segar",
    price: 55000,
    rating: 4.9,
    reviews: 412,
    image: "🥭",
    badge: "Organik",
    seller: "Kebun Segar",
    stock: 30,
    isFavorite: false,
  },
  {
    id: 5,
    name: "Paket Sistem Hidroponik",
    category: "Hidroponik",
    price: 250000,
    rating: 4.5,
    reviews: 89,
    image: "🌾",
    seller: "Tech Farm",
    stock: 15,
    isFavorite: false,
  },
  {
    id: 6,
    name: "Alat Pencacah Rumput",
    category: "Alat Pertanian",
    price: 180000,
    rating: 4.6,
    reviews: 124,
    image: "🔧",
    seller: "Alat Pertanian Pro",
    stock: 20,
    isFavorite: false,
  },
  {
    id: 7,
    name: "Madu Organik 500ml",
    category: "Produk Olahan",
    price: 75000,
    rating: 4.8,
    reviews: 298,
    image: "🍯",
    badge: "Terlaris",
    seller: "Lebah Madu Emas",
    stock: 40,
    isFavorite: false,
  },
  {
    id: 8,
    name: "Benih Jagung Unggul",
    category: "Bibit Tanaman",
    price: 18000,
    rating: 4.7,
    reviews: 201,
    image: "🌽",
    seller: "Benih Berkualitas",
    stock: 200,
    isFavorite: false,
  },
];

const CATEGORIES = [
  "Sayur Organik",
  "Buah Segar",
  "Bibit Tanaman",
  "Pupuk",
  "Alat Pertanian",
  "Produk Olahan",
  "Hidroponik",
];

export default function Marketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("populer");
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter((p) => {
    const categoryMatch = !selectedCategory || p.category === selectedCategory;
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "harga-rendah") return a.price - b.price;
    if (sortBy === "harga-tinggi") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-teal-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-poppins font-bold text-secondary mb-4">
            Marketplace Pertanian 🌾
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
            Temukan produk pertanian segar, kebutuhan farming modern, dan produk ramah lingkungan dalam satu platform.
          </p>

          <div className="max-w-3xl mx-auto mb-8">
            <SearchBar />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 justify-center max-w-md mx-auto">
            <div>
              <div className="text-2xl font-bold text-primary">120+</div>
              <p className="text-sm text-foreground/60">Produk</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">500+</div>
              <p className="text-sm text-foreground/60">Pelanggan</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">50+</div>
              <p className="text-sm text-foreground/60">Petani Lokal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filter */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block lg:col-span-1`}>
            <div className="space-y-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between lg:justify-start gap-4 lg:gap-0">
                <h3 className="text-lg font-poppins font-bold text-foreground">Filter</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-2 hover:bg-primary/10 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="glass-effect rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-foreground">Kategori</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      !selectedCategory
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-primary/10"
                    }`}
                  >
                    Semua Kategori
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
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

              {/* Price Filter */}
              <div className="glass-effect rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-foreground">Harga</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="text-sm text-foreground/60">
                    Rp 0 - Rp {priceRange[1].toLocaleString("id-ID")}
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="glass-effect rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-foreground">Rating</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <div className="flex items-center gap-1">
                        {Array(rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                        <span className="text-sm text-foreground/60">Ke atas</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8 gap-4">
              <div className="text-foreground/70">
                Menampilkan <span className="font-bold text-foreground">{sortedProducts.length}</span> produk
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 glass-effect rounded-lg"
                >
                  <Filter className="w-5 h-5" />
                  Filter
                </button>

                {/* Sort Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg hover:bg-primary/10 transition-colors">
                    Urutkan
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="hidden group-hover:block absolute right-0 mt-2 w-48 glass-effect rounded-lg shadow-lg py-2 z-10">
                    {[
                      { value: "populer", label: "Terpopuler" },
                      { value: "terbaru", label: "Terbaru" },
                      { value: "rating", label: "Rating Tertinggi" },
                      { value: "harga-rendah", label: "Harga Terendah" },
                      { value: "harga-tinggi", label: "Harga Tertinggi" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`w-full text-left px-4 py-2 transition-colors ${
                          sortBy === option.value
                            ? "bg-primary text-white"
                            : "text-foreground hover:bg-primary/10"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group glass-effect rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 h-48 flex items-center justify-center">
                    <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                      {product.image}
                    </div>
                    {product.badge && (
                      <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                        {product.badge}
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setProducts(
                          products.map((p) =>
                            p.id === product.id ? { ...p, isFavorite: !p.isFavorite } : p
                          )
                        );
                      }}
                      className="absolute top-3 left-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          product.isFavorite
                            ? "fill-accent text-accent"
                            : "text-foreground"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-foreground/60 mb-1">{product.category}</p>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "fill-accent text-accent"
                                  : "text-foreground/20"
                              }`}
                            />
                          ))}
                      </div>
                      <span className="text-xs text-foreground/60">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price & Stock */}
                    <div>
                      <p className="text-xl font-bold text-primary">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs text-foreground/60">
                        {product.stock} tersedia
                      </p>
                    </div>

                    {/* Seller */}
                    <p className="text-xs text-foreground/60 border-t pt-2">
                      {product.seller}
                    </p>

                    {/* CTA Button */}
                    <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-secondary transition-colors group-hover:shadow-lg">
                      Tambah Keranjang
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    page === 1
                      ? "bg-primary text-white"
                      : "glass-effect hover:bg-primary/10"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
