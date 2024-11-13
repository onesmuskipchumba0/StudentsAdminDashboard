interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  description: string;
}

interface EventsListProps {
  events: Event[];
}

export function EventsList({ events }: EventsListProps) {
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-red-100 text-red-800';
      case 'holiday':
        return 'bg-green-100 text-green-800';
      case 'semester':
        return 'bg-blue-100 text-blue-800';
      case 'registration':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="divide-y">
      {events.sort((a, b) => a.startDate.localeCompare(b.startDate)).map(event => (
        <div key={event.id} className="p-4 hover:bg-base-200 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-lg">{event.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            </div>
            <div className={`badge ${getEventTypeColor(event.type)}`}>
              {event.type}
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {event.startDate === event.endDate ? (
              <span>{new Date(event.startDate).toLocaleDateString()}</span>
            ) : (
              <span>
                {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 