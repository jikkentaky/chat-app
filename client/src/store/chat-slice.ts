import { StateCreator } from "zustand";

type ChatSlice = {
  selectedChatType: any | null;
  selectedChatData: any | null;
  selectedChatMessages: any[];
  directMessagesContacts: any[];
  setDirectMessagesContacts: (directMessagesContacts: any) => void;
  setSelectedChatData: (selectedChatData: any) => void;
  setSelectedChatType: (selectedChatType: any) => void;
  setSelectedChatMessages: (selectedChatMessaged: any) => void;
  closeChat: () => void;
  addMessage: (message: any) => void;
};

const chatSlice: StateCreator<ChatSlice> = (set, get) => ({
  selectedChatType: null,
  selectedChatData: null,
  directMessagesContacts: [],
  selectedChatMessages: [],
  setDirectMessagesContacts: (directMessagesContacts) => set({ directMessagesContacts }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatMessages: (selectedChatMessaged) => set({ selectedChatMessages: selectedChatMessaged }),
  closeChat: () => set({ selectedChatType: null, selectedChatData: null, selectedChatMessages: [] }),
  addMessage: (message: any) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;

    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient: selectedChatType === 'channel'
            ? message.recipient
            : message.recipient._id,
          sender: selectedChatType === 'channel'
            ? message.sender
            : message.sender._id,
        }
      ]
    });
  }
});

export type { ChatSlice };
export { chatSlice };
