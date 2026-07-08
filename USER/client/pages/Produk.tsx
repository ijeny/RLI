import { useState, useEffect } from "react";
import {
  SearchOutlined,
  FilterOutlined,
  CloseOutlined,
  ShoppingCartOutlined,
  StarFilled,
  HeartOutlined,
  HeartFilled,
  InboxOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  LoadingState,
  EmptyState,
  ErrorState,
} from "@/components/StateComponents";
import { getProducts } from "@/services/productService";
import { Product } from "@/types";

export default function Produk() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "Semua Produk" },
    { id: "sayuran", name: "Sayuran Organik" },
    { id: "buah", name: "Buah Segar" },
    { id: "pupuk", name: "Pupuk Organik" },
    { id: "maggot", name: "Produk Maggot" },
    { id: "kasgot", name: "Produk Kasgot" },
    { id: "peternakan", name: "Produk Peternakan" },
    { id: "perkebunan", name: "Produk Perkebunan" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProducts(
          1,
          100,
          selectedCategory !== "all" ? selectedCategory : undefined,
          searchTerm,
        );
        setProducts(response.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  const filteredProducts = products.filter((product) => {
    const matchPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchPrice;
  });

  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-white via-cyan-50 to-teal-50 border-b">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-secondary mb-4">
              Produk IFK 🌱
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Produk berkualitas organik dari Integrated Farming Ketapang. Semua
              produk diproduksi langsung oleh IFK dengan standar keberlanjutan
              tinggi.
            </p>
          </div>

          {/* Search Bar */}
          <div className="glass-effect rounded-2xl p-4 flex items-center gap-3">
            <SearchOutlined className="text-foreground/60 text-lg" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder-foreground/50"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="glass-effect rounded-2xl p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-poppins font-bold text-secondary flex items-center gap-2">
                    <FilterOutlined />
                    Filter
                  </h3>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-4">
                    Kategori
                  </h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === cat.id
                            ? "bg-primary text-white"
                            : "hover:bg-primary/10 text-foreground"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-4">Harga</h4>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="500000"
                        step="10000"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value),
                            priceRange[1],
                          ])
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="500000"
                        step="10000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full"
                      />
                    </div>
                    <p className="text-sm text-foreground/70">
                      Rp {priceRange[0].toLocaleString("id-ID")} - Rp{" "}
                      {priceRange[1].toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchTerm("");
                    setPriceRange([0, 500000]);
                  }}
                  className="w-full btn-outline text-sm py-2"
                >
                  Reset Filter
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <LoadingState />
              ) : error ? (
                <ErrorState
                  title="Gagal memuat data"
                  message="Silakan coba lagi nanti"
                  onRetry={() => window.location.reload()}
                />
              ) : filteredProducts.length > 0 ? (
                <>
                  <div className="mb-6">
                    <p className="text-foreground/70">
                      Menampilkan {filteredProducts.length} dari{" "}
                      {products.length} produk
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="card-hover glass-effect rounded-2xl overflow-hidden group"
                      >
                        <div className="p-6 flex flex-col h-full">
                          {/* Product Image */}
                          <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">
                            {product.image}
                          </div>

                          {/* Product Info */}
                          <h3 className="font-poppins font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </h3>

                          <p className="text-sm text-foreground/70 mb-3 line-clamp-2">
                            {product.description}
                          </p>

                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-4 text-sm">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <StarFilled
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                      ? "text-yellow-500"
                                      : "text-foreground/30"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-foreground/70">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>

                          {/* Price & Stock */}
                          <div className="mb-4">
                            <p className="text-2xl font-poppins font-bold text-primary mb-1">
                              Rp {product.price.toLocaleString("id-ID")}
                            </p>
                            <p className="text-sm text-foreground/70">
                              Stock: {product.stock} unit
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 mt-auto">
                            <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2">
                              <ShoppingCartOutlined />
                              Beli
                            </button>
                            <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                              <HeartOutlined className="text-primary text-lg" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <EmptyState
                  title="Daftar Produk Kosong"
                  description="Belum ada produk yang tersedia saat ini."
                  icon={InboxOutlined}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-soft border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-secondary mb-8 text-center">
            Kenapa Memilih Produk IFK?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✅",
                title: "100% IFK Asli",
                description:
                  "Semua produk diproduksi langsung oleh Integrated Farming Ketapang",
              },
              {
                icon: "🌱",
                title: "Organik Bersertifikat",
                description:
                  "Produk organik berkualitas dengan standar keberlanjutan tinggi",
              },
              {
                icon: "♻️",
                title: "Ekonomi Sirkular",
                description:
                  "Mendukung ekonomi sirkular dan praktik pertanian berkelanjutan",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-effect rounded-2xl p-8 text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-poppins font-bold text-secondary mb-3">
                  {item.title}
                </h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
