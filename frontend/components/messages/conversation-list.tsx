import Image from 'next/image';

interface Recipient {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
}

interface Conversation {
  id: string;
  recipient: Recipient;
  lastMessage: {
    content: string;
    timestamp: string;
    unread: boolean;
  };
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`
            p-3 rounded-lg cursor-pointer hover:bg-base-200 transition-colors
            ${selectedId === conversation.id ? 'bg-base-200' : ''}
            ${conversation.lastMessage.unread ? 'font-medium' : ''}
          `}
          onClick={() => onSelect(conversation.id)}
        >
          <div className="flex items-start gap-3">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                <Image
                  src={conversation.recipient.avatar}
                  alt={conversation.recipient.name}
                  width={48}
                  height={48}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium truncate">
                  {conversation.recipient.name}
                </h3>
                <span className="text-xs text-gray-500">
                  {formatTimestamp(conversation.lastMessage.timestamp)}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {conversation.lastMessage.content}
              </p>
              <p className="text-xs text-gray-500">
                {conversation.recipient.role} • {conversation.recipient.department}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 