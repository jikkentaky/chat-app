import { Socket, Server as SocketIoServer } from "socket.io"
import config from "./config"
import { Message } from "./models/message-model";


const setupSocket = (server: Express.Application) => {
  const io = new SocketIoServer(server, {
    cors: {
      origin: config.origin,
      methods: ['GET', 'POST'],
      credentials: true
    }
  })

  const userSocketMap = new Map();

  const disconnect = (socket: Socket) => {
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId)
        console.log(`User ${userId} disconnected with socket id: ${socket.id}`)
        break;
      }
    }
  }

  const sendMessage = async (message: Message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createMessage = await Message.create(message);

    const messageData = await Message.findById(createMessage.id)
      .populate('sender', 'id email firstName lastName')
      .populate('recipient', 'id email firstName lastName');

    if (recipientSocketId) {
      io.to(recipientSocketId).emit('receiveMessage', messageData);
    }
    
    if (senderSocketId) {
      io.to(senderSocketId).emit('receiveMessage', messageData);
    }
  }

  io.on('connection', socket => {
    const userId = socket.handshake.query.userId

    if (userId) {
      userSocketMap.set(userId, socket.id)
      console.log(`User ${userId} connected with socket id: ${socket.id}`)
    } else {
      console.log('User not found')
    }

    socket.on('sendMessage', sendMessage)

    socket.on('disconnect', () => disconnect(socket))
  })
}

export { setupSocket }
