import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const yearlyData = [
  { month: 'Jan', total: 450 },
  { month: 'Feb', total: 520 },
  { month: 'Mar', total: 480 },
  { month: 'Apr', total: 610 },
  { month: 'Mei', total: 580 },
  { month: 'Jun', total: 670 },
  { month: 'Jul', total: 590 },
  { month: 'Agu', total: 540 },
  { month: 'Sep', total: 620 },
  { month: 'Okt', total: 680 },
  { month: 'Nov', total: 710 },
  { month: 'Des', total: 650 },
];

export function YearlyWasteChart() {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg text-card-foreground">Statistik Setor Tahunan</h3>
        <p className="text-sm text-muted-foreground mt-1">Data setoran sampah sepanjang tahun</p>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f4f0" />
            <XAxis
              dataKey="month"
              stroke="#146C78"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#146C78"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #f5f4f0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="total" name="Total Sampah (kg)" fill="#146C78" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
