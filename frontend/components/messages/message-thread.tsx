'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaPaperPlane, FaPaperclip } from 'react-icons/fa';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface MessageThreadProps {
  conversation: {
    recipient: {
      name: string;
      avatar: string;
      role: string;
      department: string;
    };
  };
  messages: Message[];
}

export function MessageThread({ conversation, messages }: MessageThreadProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = 'current-user'; // This would come from auth context

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-base-100 border-b">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <Image
                src={conversation.recipient.avatar}
                alt={conversation.recipient.name}
                width={40}
                height={40}
              />
            </div>
          </div>
          <div>
            <h2 className="font-medium">{conversation.recipient.name}</h2>
            <p className="text-sm text-gray-500">
              {conversation.recipient.role} • {conversation.recipient.department}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === currentUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === currentUserId
                  ? 'bg-primary text-primary-content'
                  : 'bg-base-100'
              }`}
            >
              <p>{message.content}</p>
              <div className="text-xs mt-1 opacity-70">
                {formatMessageTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-base-100 border-t">
        <form className="flex gap-2">
          <button
            type="button"
            className="btn btn-circle btn-ghost"
          >
            <FaPaperclip />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered flex-1"
          />
          <button
            type="submit"
            className="btn btn-primary btn-circle"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
} 