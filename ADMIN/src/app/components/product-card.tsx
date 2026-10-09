import { Package, Pencil, Trash2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image: string;
  unit: string;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Pupuk Organik Premium",
    price: 25000,
    stock: 150,
    image: "/uploads/pupuk.jpg",
    unit: "kg",
  },
  {
    id: 2,
    name: "Air Lindi Berkualitas",
    price: 15000,
    stock: 80,
    image:
      "https://images.unsplash.com/photo-1557234195-bd9f290f0e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    unit: "liter",
  },
  {
    id: 3,
    name: "Ekstrak Bunga Telang",
    price: 50000,
    stock: 45,
    image:
      "https://images.unsplash.com/photo-1613036582025-ba1d4ccb3226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    unit: "botol",
  },
  {
    id: 4,
    name: "Ekstrak Rosella",
    price: 35000,
    stock: 120,
    image:
      "https://images.unsplash.com/photo-1589135716303-d04b9f3ab4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    unit: "botol",
  },
];

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: number) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const normalizeSatuan = (value?: string) => {
    const normalized = String(value ?? "")
      .trim()
      .toLowerCase();
    return normalized && normalized !== "unit" ? normalized : "pcs";
  };

  const unit = normalizeSatuan(product.unit);

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm hover:shadow-lg transition-all overflow-hidden group">
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <div
            className={`px-3 py-1 rounded-full text-xs ${
              product.stock > 100
                ? "bg-primary/90 text-primary-foreground"
                : product.stock > 50
                  ? "bg-secondary/90 text-secondary-foreground"
                  : "bg-destructive/90 text-destructive-foreground"
            }`}
          >
            {product.stock > 100
              ? "Stok Banyak"
              : product.stock > 50
                ? "Stok Sedang"
                : "Stok Terbatas"}
          </div>
        </div>
      </div>

      <div className="p-5">
        <h4 className="text-base text-card-foreground mb-2">{product.name}</h4>

        {product.description && (
          <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
            {product.description}
          </p>
        )}

        <div className="flex items-center gap-2 mb-4">
          <Package className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Stok: {product.stock} {unit}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Harga</p>
            <p className="text-xl text-primary">
              Rp {product.price.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">per {unit}</p>
          </div>
          {(onEdit || onDelete) && (
            <div className="flex items-center gap-2">
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(product)}
                  className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm text-card-foreground hover:bg-muted transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(product.id)}
                  className="inline-flex items-center gap-1 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive hover:bg-destructive/15 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Hapus
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
