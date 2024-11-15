interface StatsProps {
  stats: {
    totalCollected: number;
    pendingPayments: number;
    thisMonth: number;
    overduePayments: number;
    totalStudents: number;
  };
}

export function PaymentStats({ stats, loading = false }: StatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="stats shadow animate-pulse">
            <div className="stat">
              <div className="h-4 bg-base-300 rounded w-20 mb-2"></div>
              <div className="h-6 bg-base-300 rounded w-32"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="alert alert-info">
        <span>No statistics available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Collected</div>
          <div className="stat-value text-lg text-primary">{formatCurrency(stats.totalCollected)}</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Pending Payments</div>
          <div className="stat-value text-lg text-warning">{formatCurrency(stats.pendingPayments)}</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">This Month</div>
          <div className="stat-value text-lg text-info">{formatCurrency(stats.thisMonth)}</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Overdue Payments</div>
          <div className="stat-value text-lg text-error">{formatCurrency(stats.overduePayments)}</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Students</div>
          <div className="stat-value text-lg">{stats.totalStudents}</div>
        </div>
      </div>
    </div>
  );
} 