export type ChatMessage = {
  id: string;
  text: string | null;
  sender: 'user' | 'bot';
  avatar: string;
  timeStamp: Date;
};

export type Contact = {
  id: string;
  name: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  messages: ChatMessage[];
}

export type ChatFormInputs = {
  message: string;
  searchQuery?: string;
};