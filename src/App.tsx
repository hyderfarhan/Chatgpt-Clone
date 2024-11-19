import React, { useState, useEffect } from 'react';
import { initialChats } from './data';
import type { Chat, Message } from './types';
import Sidebar from './components/Sidebar';
import ChatComponent from './components/Chat';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      timestamp: new Date(),
    };
    setChats([newChat, ...chats]);
    setActiveChat(newChat.id);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: newMessage,
      role: 'user',
      timestamp: new Date(),
    };

    setChats(prevChats => 
      prevChats.map(chat => {
        if (chat.id === activeChat) {
          const title = chat.messages.length === 0 ? newMessage : chat.title;
          return {
            ...chat,
            title,
            messages: [...chat.messages, userMessage],
          };
        }
        return chat;
      })
    );

    setNewMessage('');

    // Simulate API response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: getResponse(newMessage),
        role: 'assistant',
        timestamp: new Date(),
      };

      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === activeChat
            ? {
                ...chat,
                messages: [...chat.messages, assistantMessage],
              }
            : chat
        )
      );
    }, 500);
  };

  const getResponse = (question: string): string => {
    const normalizedQuestion = question.trim().toLowerCase();
    const responses: Record<string, string> = {
      'who is allama iqbal': 'Allama Iqbal, known as the Poet of the East, was a philosopher, poet, and politician who played a significant role in inspiring the Pakistan Movement. Born on November 9, 1877, in Sialkot, British India, he envisioned a separate homeland for Muslims in the Indian subcontinent. His poetry, written in Urdu and Persian, emphasizes self-realization, spiritual awakening, and unity among Muslims. His famous works include Bang-e-Dra and Payam-e-Mashriq. Pakistan celebrates Iqbal Day to honor his contributions.',
      'who is quaid-e-azam': 'Quaid-e-Azam Muhammad Ali Jinnah was the founder of Pakistan and its first Governor-General. Born on December 25, 1876, in Karachi, he was a visionary leader and an accomplished lawyer. Jinnah worked tirelessly for the rights of Muslims in India and led the All-India Muslim League. His leadership culminated in the creation of Pakistan on August 14, 1947. Known for his integrity, Jinnah emphasized unity, faith, and discipline. He is regarded as the Father of the Nation.',
      'who is imran khan': 'Imran Khan, born on October 5, 1952, in Lahore, is a former cricketer, politician, and philanthropist. As a cricketer, he led Pakistan to its first-ever Cricket World Cup victory in 1992. After retiring, he founded the Shaukat Khanum Memorial Cancer Hospital and Namal University. In politics, he established the Pakistan Tehreek-e-Insaf (PTI) and served as the Prime Minister of Pakistan from 2018 to 2022. Known for his charisma, Khan remains a significant figure in Pakistan\'s political landscape.',
      'who is rehan allahwala': 'Rehan Allahwala is a Pakistani entrepreneur, philanthropist, and social media influencer. Known for promoting digital transformation and education in Pakistan, he focuses on creating opportunities through technology. He runs initiatives to teach digital skills and connect people globally to foster entrepreneurship. Rehan is a strong advocate of using the internet for positive change, and his platform inspires individuals to contribute to Pakistan\'s development.',
      'who is farhan hyder': 'Farhan Hyder was born on 20 oct 2005 in khairpur mirs, He is an aspiring frontend developer and AI enthusiast from Karachi, Pakistan. With a strong foundation in HTML, CSS, and JavaScript, Farhan is building projects like a ChatGPT clone named General Knowledge OK and an OLPP clone. He is also passionate about creating AI-related content, including faceless videos and story posts. Currently, Farhan is interning at Rehan Foundation, focusing on advancing his skills in web development and ethical hacking while sharing knowledge about AI.',
    };

    return responses[normalizedQuestion] || "I'm sorry, I don't have specific information about that question. Please try asking something else.";
  };

  const activeMessages = chats.find((chat) => chat.id === activeChat)?.messages || [];

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="flex h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <Sidebar
          chats={chats}
          activeChat={activeChat}
          isDark={isDark}
          onNewChat={handleNewChat}
          onSelectChat={setActiveChat}
          onToggleTheme={() => setIsDark(!isDark)}
        />
        {activeChat ? (
          <ChatComponent
            messages={activeMessages}
            newMessage={newMessage}
            onNewMessageChange={setNewMessage}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Welcome to ChatGPT Clone</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Start a new chat or select an existing one to begin
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;