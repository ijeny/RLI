import {
  InboxOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  LoadingState,
  EmptyState,
  ErrorState,
} from "@/components/StateComponents";
import { getOrders } from "@/services/orderService";
import { Order } from "@/types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getOrders(1, 50);
        setOrders(response.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState
              title="Gagal memuat data"
              message="Silakan coba lagi nanti"
              onRetry={() => window.location.reload()}
            />
          ) : orders.length > 0 ? (
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
                          <div
                            className={`inline-block ${getStatusColor(order.status)} px-3 py-1 rounded-full text-xs font-semibold mt-2`}
                          >
                            {order.status}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-foreground/70">
                        <div className="flex items-center gap-2">
                          <CalendarOutlined className="text-primary" />
                          <span>
                            {new Date(order.date).toLocaleDateString("id-ID")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <InboxOutlined className="text-primary" />
                          <span>{order.items?.length || 0} item(s)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <EnvironmentOutlined className="text-primary" />
                          <span>{order.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Total & Actions */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                      <div className="glass-effect rounded-lg p-4 text-center">
                        <p className="text-foreground/70 text-sm mb-1">
                          Total Pesanan
                        </p>
                        <p className="text-2xl font-poppins font-bold text-primary">
                          Rp {order.total.toLocaleString("id-ID")}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 btn-outline text-sm py-2 flex items-center justify-center gap-2">
                          <EyeOutlined />
                          Detail
                        </button>
                        <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2">
                          <DownloadOutlined />
                          Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Belum Ada Pesanan"
              description="Pesanan produk akan muncul setelah melakukan pembelian."
              icon={InboxOutlined}
            />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
