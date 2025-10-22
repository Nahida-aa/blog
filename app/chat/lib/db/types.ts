export interface User {
  id: string;
  email: string;
  password?: string;
}
export interface Chat {
  id: string;
  createdAt: Date;
  title: string;
  userId: string;
}

export interface Message {
  id: string;
  chatId: string;
  role: string;
  content: any; // 根据实际内容类型调整
  createdAt: Date;
}

export interface Vote {
  chatId: string;
  messageId: string;
  isUpvoted: boolean;
}

export interface Document {
  id: string;
  createdAt: Date;
  title: string;
  content?: string;
  userId: string;
}

export interface Suggestion {
  id: string;
  documentId: string;
  documentCreatedAt: Date;
  originalText: string;
  suggestedText: string;
  description?: string;
  isResolved: boolean;
  userId: string;
  createdAt: Date;
}