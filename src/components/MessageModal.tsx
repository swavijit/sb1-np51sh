import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { User } from '../types';
import { useStore } from '../lib/store';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: User;
}

export default function MessageModal({ isOpen, onClose, tutor }: MessageModalProps) {
  const { currentUser, sendMessage, getMessages } = useStore();
  const [message, setMessage] = useState('');

  if (!isOpen || !currentUser) return null;

  const messages = getMessages(currentUser.id).filter(
    msg => msg.senderId === tutor.id || msg.receiverId === tutor.id
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendMessage(currentUser.id, tutor.id, message.trim());
    setMessage('');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Chat with {tutor.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-md">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 ${
                msg.senderId === currentUser.id
                  ? 'text-right'
                  : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  msg.senderId === currentUser.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}