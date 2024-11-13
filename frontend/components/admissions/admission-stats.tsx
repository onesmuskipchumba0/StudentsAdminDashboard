interface StatsProps {
  stats: {
    totalApplications: number;
    pendingReview: number;
    approved: number;
    rejected: number;
    thisWeek: number;
  };
}

export function AdmissionStats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Applications</div>
          <div className="stat-value text-primary">{stats.totalApplications}</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Pending Review</div>
          <div className="stat-value text-warning">{stats.pendingReview}</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Approved</div>
          <div className="stat-value text-success">{stats.approved}</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Rejected</div>
          <div className="stat-value text-error">{stats.rejected}</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">This Week</div>
          <div className="stat-value text-info">{stats.thisWeek}</div>
        </div>
      </div>
    </div>
  );
} 