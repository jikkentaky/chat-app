import { Socket, Server as SocketIoServer } from "socket.io";
import config from "./config";
import { Message } from "./models/message-model";
import { Channel } from "./models/channel-model";

const setupSocket = (server: Express.Application) => {
  const io = new SocketIoServer(server, {
    cors: {
      origin: config.origin,
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  const userSocketMap = new Map();

  const disconnect = (socket: Socket) => {
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        console.log(`User ${userId} disconnected with socket id: ${socket.id}`);
        break;
      }
    }
  };

  const sendMessage = async (message: Message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createMessage = await Message.create(message);

    const messageData = await Message.findById(createMessage.id)
      .populate('sender', 'id email firstName lastName')
      .populate('recipient', 'id email firstName lastName')
      .lean(); // Преобразование в обычный объект

    if (recipientSocketId) {
      io.to(recipientSocketId).emit('receiveMessage', messageData);
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit('receiveChannelMessage', messageData);
    }
  };

  const sendChannelMessage = async (message: Message & { channelId: string }) => {
    const { channelId, sender, content, messageType, fileUrl } = message;

    const createdMessage = await Message.create({
      sender,
      recipient: null,
      content,
      messageType,
      timestamp: new Date(),
      fileUrl
    });

    const messageData = await Message
      .findById(createdMessage._id)
      .populate('sender', 'id email firstName lastName')
      .lean();

    await Channel.findByIdAndUpdate(channelId, {
      $push: { messages: createdMessage._id }
    });

    const channel = await Channel
      .findById(channelId)
      .populate('members')
      .lean();

    const finalData = { ...messageData, channelId: channelId };

    if (channel && channel.members) {
      channel.members.forEach(member => {
        const memberSocketId = userSocketMap.get(member._id.toString());

        if (memberSocketId) {
          io.to(memberSocketId).emit('receiveChannelMessage', finalData);
        }
      });

      const adminSocketId = userSocketMap.get(channel.admin._id.toString());

      if (adminSocketId) {
        io.to(adminSocketId).emit('receiveChannelMessage', finalData);
      }
    }
  };

  io.on('connection', socket => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} connected with socket id: ${socket.id}`);
    } else {
      console.log('User not found');
    }

    socket.on('sendMessage', sendMessage);
    socket.on('sendChannelMessage', sendChannelMessage);
    socket.on('disconnect', () => disconnect(socket));
  });
};

export { setupSocket };