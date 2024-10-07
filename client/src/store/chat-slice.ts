import { ContactInfo } from "@/types/contact-info";
import { MessageInfo, User } from "@/types/message-info";
import { StateCreator } from "zustand";

type ChatSlice = {
  selectedChatType: 'contact' | 'channel' | null;
  selectedChatData: ContactInfo | null;
  selectedChatMessages: MessageInfo[];
  directMessagesContacts: ContactInfo[];
  setDirectMessagesContacts: (directMessagesContacts: ContactInfo[]) => void;
  setSelectedChatData: (selectedChatData: ContactInfo | null) => void;
  setSelectedChatType: (selectedChatType: 'contact' | 'channel' | null) => void;
  setSelectedChatMessages: (selectedChatMessages: MessageInfo[]) => void;
  closeChat: () => void;
  addMessage: (message: MessageInfo) => void;
};

const chatSlice: StateCreator<ChatSlice> = (set, get) => ({
  selectedChatType: null,
  selectedChatData: null,
  directMessagesContacts: [],
  selectedChatMessages: [],
  setDirectMessagesContacts: (directMessagesContacts) => set({ directMessagesContacts }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages: selectedChatMessages }),
  closeChat: () => set({ selectedChatType: null, selectedChatData: null, selectedChatMessages: [] }),
  addMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;

    const sender: User = typeof message.sender === 'string'
      ? { _id: message.sender, email: '', firstName: '', lastName: '' }
      : message.sender;

    const recipient: User = typeof message.recipient === 'string'
      ? { _id: message.recipient, email: '', firstName: '', lastName: '' }
      : message.recipient;

    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient: selectedChatType === 'channel' ? message.recipient : recipient,
          sender: selectedChatType === 'channel' ? message.sender : sender,
        }
      ]
    });
  }
});

export type { ChatSlice };
export { chatSlice };
