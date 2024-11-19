import React from 'react';
import { Plus, MessageSquare, Sun, Moon } from 'lucide-react';
import type { Chat } from '../types';

interface SidebarProps {
  chats: Chat[];
  activeChat: string | null;
  isDark: boolean;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onToggleTheme: () => void;
}

export default function Sidebar({
  chats,
  activeChat,
  isDark,
  onNewChat,
  onSelectChat,
  onToggleTheme,
}: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col">
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 w-full p-3 rounded-md hover:bg-gray-700 transition-colors border border-gray-700"
      >
        <Plus size={16} />
        New chat
      </button>

      <div className="flex-1 mt-4 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`flex items-center gap-2 w-full p-3 rounded-md hover:bg-gray-700 transition-colors mb-2 ${
              activeChat === chat.id ? 'bg-gray-700' : ''
            }`}
          >
            <MessageSquare size={16} />
            <span className="truncate text-sm">{chat.title}</span>
          </button>
        ))}
      </div>

      <button
        onClick={onToggleTheme}
        className="flex items-center gap-2 w-full p-3 rounded-md hover:bg-gray-700 transition-colors mt-auto"
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
        {isDark ? 'Light mode' : 'Dark mode'}
      </button>
    </div>
  );
}