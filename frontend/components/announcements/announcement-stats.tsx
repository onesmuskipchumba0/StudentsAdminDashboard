interface Announcement {
  id: string;
  category: string;
  priority: string;
  createdAt: string;
  pinned: boolean;
}

interface AnnouncementStatsProps {
  announcements: Announcement[];
}

export function AnnouncementStats({ announcements }: AnnouncementStatsProps) {
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const stats = {
    total: announcements.length,
    thisWeek: announcements.filter(a => new Date(a.createdAt) >= lastWeek).length,
    highPriority: announcements.filter(a => a.priority === 'high').length,
    pinned: announcements.filter(a => a.pinned).length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Announcements</div>
          <div className="stat-value">{stats.total}</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">This Week</div>
          <div className="stat-value text-primary">{stats.thisWeek}</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">High Priority</div>
          <div className="stat-value text-error">{stats.highPriority}</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Pinned</div>
          <div className="stat-value text-warning">{stats.pinned}</div>
        </div>
      </div>
    </div>
  );
} 