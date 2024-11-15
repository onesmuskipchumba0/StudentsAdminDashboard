'use client';

import { useRef, useEffect, useState } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'react-hot-toast';
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
    id: string;
    recipient: {
      id: string;
      name: string;
      avatar: string;
      role: string;
      department: string;
    };
  };
  messages: Message[];
}

export function MessageThread({ conversation, messages: initialMessages }: MessageThreadProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { socket } = useSocket();
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('new_message', (data) => {
      if (data.conversationId === conversation.id) {
        setMessages(prev => [...prev, data.message]);
        scrollToBottom();
      }
    });

    socket.on('message_sent', (message) => {
      setMessages(prev => [...prev, message]);
      setSending(false);
      setNewMessage('');
      scrollToBottom();
    });

    socket.on('message_error', (error) => {
      toast.error(error);
      setSending(false);
    });

    return () => {
      socket.off('new_message');
      socket.off('message_sent');
      socket.off('message_error');
    };
  }, [socket, conversation.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || sending || !user) return;

    setSending(true);
    socket.emit('send_message', {
      conversationId: conversation.id,
      recipientId: conversation.recipient.id,
      content: newMessage.trim()
    });
  };

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!user) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Conversation Header */}
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
            <h3 className="font-medium">{conversation.recipient.name}</h3>
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
              message.senderId === user.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === user.id
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
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <button
            type="button"
            className="btn btn-circle btn-ghost"
            disabled={sending}
          >
            <FaPaperclip />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="input input-bordered flex-1"
            disabled={sending}
          />
          <button
            type="submit"
            className="btn btn-primary btn-circle"
            disabled={sending || !newMessage.trim()}
          >
            {sending ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 