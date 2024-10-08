import { ContactInfo } from "./contact-info";

type User = Omit<ContactInfo, 'profileSetup' | 'password'>;

type MessageInfo = {
  _id: string;
  sender: User;
  channelId?: string;
  recipient: User;
  messageType: 'text' | 'file';
  content: string | null;
  fileUrl: string | null;
  timestamp: string;
};

export type { MessageInfo, User }
