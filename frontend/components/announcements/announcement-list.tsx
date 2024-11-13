import { FaThumbtack, FaPaperclip } from 'react-icons/fa';

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: string;
  author: string;
  createdAt: string;
  department: string;
  attachments: string[];
  pinned: boolean;
}

interface AnnouncementListProps {
  announcements: Announcement[];
}

export function AnnouncementList({ announcements }: AnnouncementListProps) {
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'badge-error';
      case 'medium':
        return 'badge-warning';
      case 'low':
        return 'badge-info';
      default:
        return 'badge-ghost';
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'academic':
        return 'badge-primary';
      case 'facility':
        return 'badge-secondary';
      case 'event':
        return 'badge-accent';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div 
          key={announcement.id}
          className="card bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {announcement.pinned && (
                  <FaThumbtack className="text-warning" />
                )}
                <h2 className="card-title">{announcement.title}</h2>
              </div>
              <div className="flex gap-2">
                <div className={`badge ${getCategoryClass(announcement.category)}`}>
                  {announcement.category}
                </div>
                <div className={`badge ${getPriorityClass(announcement.priority)}`}>
                  {announcement.priority}
                </div>
              </div>
            </div>

            <p className="whitespace-pre-line mt-4">{announcement.content}</p>

            {announcement.attachments.length > 0 && (
              <div className="flex items-center gap-2 mt-4">
                <FaPaperclip />
                <div className="flex gap-2">
                  {announcement.attachments.map((attachment, index) => (
                    <a key={index} href={attachment} download>
                      {attachment}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 