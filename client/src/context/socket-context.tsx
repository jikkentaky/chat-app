import { useStore } from "@/store";
import { MessageInfo } from "@/types/message-info";
import { HOST } from "@/utils/config";
import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const socket = useRef<Socket | null>(null);
  const { userInfo } = useStore();

  useEffect(() => {
    if (!userInfo) {
      return;
    }

    socket.current = io(HOST, {
      withCredentials: true,
      query: {
        userId: userInfo.id,
      },
    });

    socket.current.on('connect', () => {
      console.log('Socket connected');
    });

    const handleReceiveMessage = (message: MessageInfo) => {
      const { selectedChatData, selectedChatType, addMessage } = useStore.getState();

      if (selectedChatType && (selectedChatData?._id === message.recipient._id || selectedChatData?._id === message.sender._id)) {
        addMessage(message);
      }
    };

    socket.current.on('receiveMessage', handleReceiveMessage);

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [userInfo]);

  return (
    <SocketContext.Provider value={{ socket: socket.current! }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
