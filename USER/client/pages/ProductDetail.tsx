import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, Share2, Minus, Plus, TrendingUp, Truck, Shield } from "lucide-react";
import { InboxOutlined } from "@ant-design/icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateComponents";
import { getProductById, getProducts } from "@/services/productService";
import { Product } from "@/types";

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("deskripsi");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (!id) throw new Error("ID produk tidak ditemukan");
        setLoading(true);
        setError(null);
        const productData = await getProductById(parseInt(id));
        setProduct(productData);

        // Fetch related products
        const productsResponse = await getProducts(1, 4, productData.category);
        setRelatedProducts(
          (productsResponse.data || []).filter((p) => p.id !== productData.id).slice(0, 3)
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Gagal memuat data produk"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

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

  if (error || !product) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex items-center justify-center">
          <ErrorState
            title="Produk tidak ditemukan"
            message={error || "Detail produk yang Anda cari tidak tersedia."}
            onRetry={() => window.location.reload()}
          />
        </div>
        <Footer />
      </div>
    );
  }

  const badge = product.rating >= 4.5 ? "Terlaris" : undefined;
  const originalPrice = Math.round(product.price * 1.25);
  const sellerName = typeof product.seller === "object" ? product.seller.name : (product.seller || "IFK Seller");

  const specs = [
    `Kategori: ${product.category || "Umum"}`,
    `Stok: ${product.stock} unit`,
    `Penjual: ${sellerName}`,
    `Garansi Kualitas: 7 Hari`,
  ];

  const benefits = [
    "100% Organik tanpa pestisida",
    "Langsung dari petani lokal Ketapang",
    "Mendukung ekonomi sirkular dan kelestarian lingkungan",
    "Kemasan ramah lingkungan",
  ];

  return (
    <div className="w-full">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <Link
          to="/produk"
          className="text-primary font-semibold hover:text-secondary mb-4 inline-flex items-center gap-2"
        >
          ← Kembali ke Produk
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left - Product Images */}
          <div className="space-y-4">
            <div className="glass-effect rounded-2xl p-12 h-96 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <div className="text-9xl">{product.image}</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="glass-effect rounded-lg p-4 h-20 flex items-center justify-center cursor-pointer hover:border-primary transition-colors text-3xl"
                >
                  {product.image}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                {badge && (
                  <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-bold">
                    {badge}
                  </span>
                )}
                <span className="text-sm text-foreground/60">{product.category}</span>
              </div>
              <h1 className="text-4xl font-poppins font-bold text-foreground mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-accent text-accent"
                            : "text-foreground/20"
                        }`}
                      />
                    ))}
                </div>
                <span className="font-semibold text-foreground">
                  {product.rating}
                </span>
                <span className="text-foreground/60">
                  ({product.reviews} ulasan)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary">
                  Rp {product.price.toLocaleString("id-ID")}
                </span>
                <span className="text-xl text-foreground/60 line-through">
                  Rp {originalPrice.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="text-sm text-accent font-semibold">
                Hemat Rp {(originalPrice - product.price).toLocaleString("id-ID")} (25%)
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-effect rounded-lg p-4 space-y-2">
                <Truck className="w-6 h-6 text-primary" />
                <div className="text-sm font-semibold">Pengiriman Cepat</div>
                <div className="text-xs text-foreground/60">Hari yang sama tersedia</div>
              </div>
              <div className="glass-effect rounded-lg p-4 space-y-2">
                <Shield className="w-6 h-6 text-primary" />
                <div className="text-sm font-semibold">Garansi Kualitas</div>
                <div className="text-xs text-foreground/60">7 hari uang kembali</div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="glass-effect rounded-lg p-4">
              <p className="text-sm text-foreground/60 mb-2">Penjual</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">{sellerName}</span>
                <button className="text-primary font-semibold hover:text-secondary transition-colors">
                  Kunjungi Toko
                </button>
              </div>
            </div>

            {/* Stock Info */}
            <div className="flex items-center justify-between glass-effect rounded-lg p-4">
              <span className="text-foreground/70">Stok Tersedia</span>
              <span className="font-bold text-primary">{product.stock} pcs</span>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-foreground/70">Jumlah:</span>
                <div className="flex items-center border-2 border-primary rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-primary/10 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 hover:bg-primary/10 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex items-center justify-center gap-2 px-4 py-3 glass-effect rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-accent text-accent" : ""}`} />
                  <span className="hidden sm:inline text-sm">Wishlist</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 glass-effect rounded-lg hover:bg-primary/10 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm">Bagikan</span>
                </button>
                <button className="col-span-1 sm:col-span-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors">
                  Beli Sekarang
                </button>
              </div>

              <button className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                Tambah ke Keranjang
              </button>
            </div>

            {/* Benefits */}
            <div className="space-y-3 pt-4 border-t">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t pt-8">
          <div className="flex gap-8 border-b mb-8">
            {["deskripsi", "spesifikasi", "ulasan"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-semibold transition-colors ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "deskripsi" && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">Deskripsi Produk</h3>
              <p className="text-foreground/70 leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === "spesifikasi" && (
            <div className="space-y-3">
              {specs.map((spec, i) => (
                <div key={i} className="flex justify-between py-3 border-b">
                  <span className="text-foreground/60">{spec.split(":")[0]}</span>
                  <span className="font-semibold text-foreground">{spec.split(":")[1]}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "ulasan" && (
            <div className="space-y-8">
              <EmptyState
                title="Belum Ada Ulasan"
                description="Belum ada ulasan untuk produk ini saat ini."
                icon={InboxOutlined}
              />
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-8">
              Produk Terkait
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="glass-effect rounded-lg overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 h-40 flex items-center justify-center text-6xl">
                    {p.image}
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-foreground">{p.name}</h3>
                    <div className="flex items-center gap-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(p.rating)
                                ? "fill-accent text-accent"
                                : "text-foreground/20"
                            }`}
                          />
                        ))}
                      <span className="text-sm text-foreground/60">{p.rating}</span>
                    </div>
                    <p className="text-xl font-bold text-primary">
                      Rp {p.price.toLocaleString("id-ID")}
                    </p>
                    <Link
                      to={`/product/${p.id}`}
                      className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-secondary transition-colors text-center block"
                    >
                      Lihat Produk
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
