import { useState, useEffect } from "react";
import {
  CalendarOutlined,
  FilterOutlined,
  DownloadOutlined,
  DownOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getWasteDeposits } from "@/services/wasteService";
import { WasteDeposit } from "@/types";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateComponents";

const getStatusBadge = (status: string) => {
  const styles: Record<string, { bg: string; text: string; icon: any }> = {
    pending: { bg: "bg-amber-100", text: "text-amber-700", icon: ClockCircleOutlined },
    processing: { bg: "bg-blue-100", text: "text-blue-700", icon: ClockCircleOutlined },
    accepted: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircleOutlined },
    rejected: { bg: "bg-red-100", text: "text-red-700", icon: CloseCircleOutlined },
    diterima: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircleOutlined },
    ditolak: { bg: "bg-red-100", text: "text-red-700", icon: CloseCircleOutlined },
  };
  const normalizedStatus = (status || "").toLowerCase();
  const style = styles[normalizedStatus] || { bg: "bg-gray-100", text: "text-gray-700", icon: ClockCircleOutlined };
  const Icon = style.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
      <Icon className="w-3 h-3" />
      {normalizedStatus === "accepted" || normalizedStatus === "diterima" ? "Diterima" : ""}
      {normalizedStatus === "processing" ? "Diproses" : ""}
      {normalizedStatus === "pending" ? "Pending" : ""}
      {normalizedStatus === "rejected" || normalizedStatus === "ditolak" ? "Ditolak" : ""}
    </span>
  );
};

const WasteBankHistory = () => {
  const [transactions, setTransactions] = useState<WasteDeposit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<WasteDeposit | null>(null);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getWasteDeposits(1, 100);
        setTransactions(response.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    const statusMatch = !filterStatus || (tx.status || "").toLowerCase() === filterStatus.toLowerCase();
    const dateMatch = !searchDate || (tx.date || "").includes(searchDate);
    return statusMatch && dateMatch;
  });

  const totalDeposits = filteredTransactions.reduce((sum, tx) => sum + (tx.total || tx.amount || 0), 0);
  const acceptedCount = filteredTransactions.filter((tx) => {
    const s = (tx.status || "").toLowerCase();
    return s === "accepted" || s === "diterima";
  }).length;

  return (
    <div className="w-full">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/waste-bank" className="text-primary font-semibold hover:text-secondary mb-4 inline-flex items-center gap-2">
            ← Kembali
          </Link>
          <h1 className="text-4xl font-poppins font-bold text-secondary mb-2">
            Riwayat Setoran Sampah
          </h1>
          <p className="text-foreground/70">
            Kelola dan pantau semua transaksi setoran sampah Anda
          </p>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState
            title="Gagal memuat data"
            message="Silakan coba lagi nanti"
            onRetry={() => window.location.reload()}
          />
        ) : transactions.length === 0 ? (
          <EmptyState
            title="Belum Ada Setoran Sampah"
            description="Riwayat setoran sampah akan muncul di sini."
            icon={InboxOutlined}
          />
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-effect rounded-lg p-6 space-y-2">
                <div className="text-foreground/70 text-sm">Total Setoran</div>
                <div className="text-3xl font-bold text-primary">
                  Rp {totalDeposits.toLocaleString("id-ID")}
                </div>
              </div>
              <div className="glass-effect rounded-lg p-6 space-y-2">
                <div className="text-foreground/70 text-sm">Transaksi Diterima</div>
                <div className="text-3xl font-bold text-accent">{acceptedCount}</div>
              </div>
              <div className="glass-effect rounded-lg p-6 space-y-2">
                <div className="text-foreground/70 text-sm">Total Transaksi</div>
                <div className="text-3xl font-bold text-secondary">{filteredTransactions.length}</div>
              </div>
            </div>

            {/* Filters */}
            <div className="glass-effect rounded-lg p-6 mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                {/* Date Filter */}
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CalendarOutlined />
                    Cari Tanggal
                  </label>
                  <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <FilterOutlined />
                    Filter Status
                  </label>
                  <select
                    value={filterStatus || ""}
                    onChange={(e) => setFilterStatus(e.target.value || null)}
                    className="w-full px-4 py-2 border-2 border-gray-soft rounded-lg focus:border-primary focus:outline-none"
                  >
                    <option value="">Semua Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Diproses</option>
                    <option value="accepted">Diterima</option>
                    <option value="rejected">Ditolak</option>
                  </select>
                </div>

                {/* Reset & Export */}
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setFilterStatus(null);
                      setSearchDate("");
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-semibold"
                  >
                    Reset
                  </button>
                  <button className="flex-1 sm:flex-none px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center gap-2">
                    <DownloadOutlined />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="space-y-4">
              {filteredTransactions.length > 0 ? (
                <>
                  {/* Desktop View */}
                  <div className="hidden md:block glass-effect rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-primary/10 border-b">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold text-foreground">ID Transaksi</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Tanggal</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Jenis Sampah</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Berat</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Total</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {filteredTransactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-foreground/5 transition-colors">
                              <td className="px-6 py-4 text-sm font-mono text-foreground">{tx.id}</td>
                              <td className="px-6 py-4 text-sm text-foreground">{tx.date || ""}</td>
                              <td className="px-6 py-4 text-sm font-semibold text-foreground">{tx.wasteType || tx.type || ""}</td>
                              <td className="px-6 py-4 text-sm text-foreground">{tx.weight} kg</td>
                              <td className="px-6 py-4 text-sm font-bold text-primary">
                                Rp {(tx.total || tx.amount || 0).toLocaleString("id-ID")}
                              </td>
                              <td className="px-6 py-4 text-sm">{getStatusBadge(tx.status)}</td>
                              <td className="px-6 py-4 text-sm">
                                <button
                                  onClick={() => setSelectedTransaction(tx)}
                                  className="text-primary hover:text-secondary font-semibold flex items-center gap-1"
                                >
                                  <EyeOutlined />
                                  Detail
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden space-y-4">
                    {filteredTransactions.map((tx) => (
                      <div key={tx.id} className="glass-effect rounded-lg p-6 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-mono text-xs text-foreground/60 mb-1">
                              {tx.id}
                            </div>
                            <h3 className="font-bold text-foreground">{tx.wasteType || tx.type || ""}</h3>
                            <p className="text-sm text-foreground/60">{tx.date || ""}</p>
                          </div>
                          {getStatusBadge(tx.status)}
                        </div>

                        <div className="border-t pt-4 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-foreground/60">Berat / Total</div>
                            <div className="font-bold text-foreground">
                              {tx.weight} kg / Rp {(tx.total || tx.amount || 0).toLocaleString("id-ID")}
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedTransaction(tx)}
                            className="text-primary hover:text-secondary font-semibold"
                          >
                            <EyeOutlined className="text-lg" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="glass-effect rounded-lg p-12 text-center text-foreground/60">
                  Daftar Kosong
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-secondary">Detail Transaksi</h2>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="text-foreground/60 hover:text-foreground text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between pb-3 border-b">
                <span className="text-foreground/70">ID Transaksi</span>
                <span className="font-mono font-bold text-foreground">
                  {selectedTransaction.id}
                </span>
              </div>

              <div className="flex justify-between pb-3 border-b">
                <span className="text-foreground/70">Tanggal</span>
                <span className="font-semibold text-foreground">
                  {selectedTransaction.date || ""}
                </span>
              </div>

              <div className="flex justify-between pb-3 border-b">
                <span className="text-foreground/70">Jenis Sampah</span>
                <span className="font-semibold text-foreground">
                  {selectedTransaction.wasteType || selectedTransaction.type || ""}
                </span>
              </div>

              <div className="flex justify-between pb-3 border-b">
                <span className="text-foreground/70">Berat</span>
                <span className="font-semibold text-foreground">
                  {selectedTransaction.weight} kg
                </span>
              </div>

              <div className="flex justify-between pb-3 border-b">
                <span className="text-foreground/70">Harga per kg</span>
                <span className="font-semibold text-foreground">
                  Rp {(selectedTransaction.pricePerKg || 0).toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex justify-between pb-3 border-b">
                <span className="text-foreground/70">Total Saldo</span>
                <span className="font-bold text-primary text-lg">
                  Rp {(selectedTransaction.total || selectedTransaction.amount || 0).toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-foreground/70">Status</span>
                {getStatusBadge(selectedTransaction.status)}
              </div>

              <button
                onClick={() => setSelectedTransaction(null)}
                className="w-full btn-primary mt-6"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default WasteBankHistory;
