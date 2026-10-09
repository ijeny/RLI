import { Package, Calendar, MapPin, DollarSign, Eye, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Orders() {
  const orders = [
    {
      id: "IFK-2024-001",
      date: "15 Juni 2024",
      items: "Pupuk Organik (2x), Sayuran Segar (1x)",
      total: "Rp 250.000",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
      location: "Ketapang, Kalbar",
    },
    {
      id: "IFK-2024-002",
      date: "10 Juni 2024",
      items: "Produk Maggot BSF (1x), Kasgot (2x)",
      total: "Rp 425.000",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
      location: "Ketapang, Kalbar",
    },
    {
      id: "IFK-2024-003",
      date: "5 Juni 2024",
      items: "Benih Sayuran Unggul (3x)",
      total: "Rp 75.000",
      status: "Shipped",
      statusColor: "bg-blue-100 text-blue-700",
      location: "Ketapang, Kalbar",
    },
  ];

  return (
    <div className="w-full">
      <Navbar />

      {/* Header */}
      <section className="relative py-12 bg-gradient-to-br from-white via-cyan-50 to-teal-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-secondary mb-2">
            Riwayat Pesanan
          </h1>
          <p className="text-foreground/70">
            Kelola dan pantau semua pesanan produk IFK Anda
          </p>
        </div>
      </section>

      {/* Orders */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="card-hover glass-effect rounded-2xl p-6 group"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                  {/* Order Info */}
                  <div className="md:col-span-3">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-poppins font-bold text-secondary text-lg group-hover:text-primary transition-colors">
                          Order {order.id}
                        </h3>
                        <div className={`inline-block ${order.statusColor} px-3 py-1 rounded-full text-xs font-semibold mt-2`}>
                          {order.status}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-foreground/70">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{order.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-primary" />
                        <span>{order.items}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{order.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Total & Actions */}
                  <div className="md:col-span-2 flex flex-col gap-4">
                    <div className="glass-effect rounded-lg p-4 text-center">
                      <p className="text-foreground/70 text-sm mb-1">Total Pesanan</p>
                      <p className="text-2xl font-poppins font-bold text-primary">
                        {order.total}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 btn-outline text-sm py-2 flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        Detail
                      </button>
                      <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
