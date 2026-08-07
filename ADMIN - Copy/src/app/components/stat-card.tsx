import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
}

export function StatCard({ title, value, icon: Icon, trend, color = 'primary' }: StatCardProps) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/20 text-secondary',
    accent: 'bg-accent/30 text-primary',
    muted: 'bg-muted text-primary',
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <h3 className="text-3xl text-card-foreground mb-3">{value}</h3>

          {trend && (
            <div className="flex items-center gap-1">
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.value}
              </span>
              <span className="text-sm text-muted-foreground ml-1">vs bulan lalu</span>
            </div>
          )}
        </div>

        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary}`}>
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}
