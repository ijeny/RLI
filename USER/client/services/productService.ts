import { apiRequest, API_ENDPOINTS } from "@/config/api";

// Interface sesuai backend
interface ProductApi {
  id_produk: number;
  nama_produk: string;
  deskripsi: string;
  harga_satuan: number;
  stok_tersedia: number;
  gambar_url: string;
  nama_kategori: string;
}

export const getProducts = async () => {
  const result = await apiRequest<ProductApi[]>(API_ENDPOINTS.PRODUCTS);

  return result.map((item) => ({
    id: item.id_produk,
    name: item.nama_produk,
    category: item.nama_kategori,
    price: Number(item.harga_satuan),
    rating: 5,
    reviews: 0,
    image: item.gambar_url,
    seller: "Rumah Literasi Indonesia",
    stock: item.stok_tersedia,
    badge: undefined,
    isFavorite: false,
  }));
};

export const getProductById = async (id: number) => {
  const item = await apiRequest<ProductApi>(
    API_ENDPOINTS.PRODUCTS_BY_ID(id)
  );

  return {
    id: item.id_produk,
    name: item.nama_produk,
    category: item.nama_kategori,
    price: Number(item.harga_satuan),
    rating: 5,
    reviews: 0,
    image: item.gambar_url,
    seller: "Rumah Literasi Indonesia",
    stock: item.stok_tersedia,
    badge: undefined,
    isFavorite: false,
  };
};