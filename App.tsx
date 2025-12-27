
import React, { useState, useEffect } from 'react';
import { Screen, UserProfile, Chat, Message } from './types';
import { MOCK_PROFILES } from './constants';
import SplashScreen from './components/SplashScreen';
import RegisterScreen from './components/RegisterScreen';
import RadarScreen from './components/RadarScreen';
import ChatListScreen from './components/ChatListScreen';
import ChatDetailScreen from './components/ChatDetailScreen';
import VaultScreen from './components/VaultScreen';
import BottomNav from './components/BottomNav';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [currentUser, setCurrentUser] = useState<{ name: string; age: number; image: string } | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('register');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleRegister = (name: string, age: number, image: string) => {
    setCurrentUser({ name, age, image });
    setCurrentScreen('radar');
  };

  const handleStartChat = (profile: UserProfile) => {
    const existingChat = chats.find(c => c.user.id === profile.id);
    if (existingChat) {
      setActiveChatId(existingChat.id);
    } else {
      const newChat: Chat = {
        id: Date.now().toString(),
        user: profile,
        messages: [],
      };
      setChats(prev => [newChat, ...prev]);
      setActiveChatId(newChat.id);
    }
    setCurrentScreen('chat-detail');
  };

  const updateChatMessages = (chatId: string, message: Message) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, message],
          lastMessage: message.text
        };
      }
      return chat;
    }));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'register':
        return <RegisterScreen onRegister={handleRegister} />;
      case 'radar':
        return <RadarScreen onProfileClick={handleStartChat} />;
      case 'chats':
        return <ChatListScreen chats={chats} onChatClick={(id) => { setActiveChatId(id); setCurrentScreen('chat-detail'); }} />;
      case 'chat-detail':
        const activeChat = chats.find(c => c.id === activeChatId);
        if (!activeChat) return <RadarScreen onProfileClick={handleStartChat} />;
        return <ChatDetailScreen 
          chat={activeChat} 
          currentUserName={currentUser?.name || 'User'}
          onBack={() => setCurrentScreen('chats')} 
          onNewMessage={(msg) => updateChatMessages(activeChat.id, msg)}
        />;
      case 'vault':
        return <VaultScreen />;
      default:
        return <RadarScreen onProfileClick={handleStartChat} />;
    }
  };

  const showNav = ['radar', 'chats', 'vault'].includes(currentScreen);

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-gray-50 overflow-hidden relative shadow-2xl">
      {showNav && <Header title={currentScreen.toUpperCase()} />}
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-20">
        {renderScreen()}
      </main>
      {showNav && (
        <BottomNav 
          activeScreen={currentScreen} 
          onNavigate={(screen) => setCurrentScreen(screen as Screen)} 
        />
      )}
    </div>
  );
};

export default App;
