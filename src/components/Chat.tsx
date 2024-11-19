import React from 'react';
import { Send } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import type { Message } from '../types';

interface ChatProps {
  messages: Message[];
  newMessage: string;
  onNewMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

export default function Chat({
  messages,
  newMessage,
  onNewMessageChange,
  onSendMessage,
}: ChatProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage();
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              Ask me anything...
            </h2>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={`${message.role}-${message.id}`}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
              }`}
            >
              {message.role === 'assistant' ? (
                <div className="min-h-[20px]">
                  <Typewriter
                    options={{
                      strings: [message.content],
                      autoStart: true,
                      delay: 30,
                      cursor: '▋',
                      loop: false,
                      deleteSpeed: Infinity,
                    }}
                  />
                </div>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => onNewMessageChange(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}