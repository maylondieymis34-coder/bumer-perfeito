
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  image: string;
  bio: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  user: UserProfile;
  lastMessage?: string;
  messages: Message[];
}

export type Screen = 'splash' | 'register' | 'radar' | 'chats' | 'chat-detail' | 'vault';
