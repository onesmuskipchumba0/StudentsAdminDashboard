'use client';

import { useState } from 'react';
import { 
  ConversationList, 
  MessageThread, 
  NewMessageModal 
} from '@/components/messages';
import { FaPlus, FaEnvelope } from 'react-icons/fa';

// Dummy conversations data
const conversations = [
  {
    id: '1',
    recipient: {
      id: 'u1',
      name: 'Dr. Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      role: 'Professor',
      department: 'Computer Science'
    },
    lastMessage: {
      content: 'When would be a good time to discuss the project proposal?',
      timestamp: '2024-03-15T14:30:00Z',
      unread: true
    }
  },
  {
    id: '2',
    recipient: {
      id: 'u2',
      name: 'Prof. Michael Chen',
      avatar: '/avatars/michael.jpg',
      role: 'Department Head',
      department: 'Mathematics'
    },
    lastMessage: {
      content: 'The faculty meeting has been rescheduled to next Tuesday.',
      timestamp: '2024-03-15T11:20:00Z',
      unread: false
    }
  },
  // Add more conversations...
];

// Dummy messages for a conversation
const messages = [
  {
    id: 'm1',
    senderId: 'current-user',
    content: 'Hello Dr. Johnson, I wanted to discuss the project proposal.',
    timestamp: '2024-03-15T14:25:00Z',
    status: 'read'
  },
  {
    id: 'm2',
    senderId: 'u1',
    content: 'Of course! When would be a good time for you?',
    timestamp: '2024-03-15T14:30:00Z',
    status: 'received'
  },
  // Add more messages...
];

export default function MessagesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv =>
    conv.recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.recipient.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r bg-base-100">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-xl" />
              <h1 className="text-xl font-bold">Messages</h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary btn-sm"
            >
              <FaPlus className="mr-2" /> New Message
            </button>
          </div>

          <input
            type="text"
            placeholder="Search conversations..."
            className="input input-bordered w-full mb-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <ConversationList
            conversations={filteredConversations}
            selectedId={selectedConversation}
            onSelect={setSelectedConversation}
          />
        </div>
      </div>

      {/* Message Thread */}
      <div className="flex-1 bg-base-200">
        {selectedConversation ? (
          <MessageThread
            conversation={conversations.find(c => c.id === selectedConversation)!}
            messages={messages}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>

      {/* New Message Modal */}
      <NewMessageModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
} 