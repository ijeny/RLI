import { AlertCircle, Package, RefreshCw } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center space-y-4">
        <div className="inline-block">
          <div className="animate-spin">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary"></div>
          </div>
        </div>
        <p className="text-foreground/70 font-semibold">Memuat data...</p>
      </div>
    </div>
  );
}

export function EmptyState({
  title = "Tidak ada data",
  description = "Data yang Anda cari belum tersedia",
  icon: Icon = Package,
  action,
}: {
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className: string }>;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center space-y-6 max-w-md">
        <Icon className="w-16 h-16 text-foreground/30 mx-auto" />
        <div>
          <h3 className="text-xl font-poppins font-bold text-secondary mb-2">{title}</h3>
          <p className="text-foreground/70">{description}</p>
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="btn-primary"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}

export function ErrorState({
  title = "Terjadi Kesalahan",
  message = "Gagal memuat data. Silakan coba lagi.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center space-y-6 max-w-md">
        <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <div>
          <h3 className="text-xl font-poppins font-bold text-secondary mb-2">{title}</h3>
          <p className="text-foreground/70">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-effect rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="h-4 bg-foreground/10 rounded w-3/4"></div>
      <div className="h-4 bg-foreground/10 rounded w-full"></div>
      <div className="h-4 bg-foreground/10 rounded w-2/3"></div>
    </div>
  );
}

export function SkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
