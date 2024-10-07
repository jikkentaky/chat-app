import mongoose, { Schema } from "mongoose";
import { Message } from "../types/message";

const messageSchema = new Schema<Message>({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  messageType: {
    type: String,
    enum: ['text', 'file'],
    required: true
  },
  content: {
    type: String,
    required: function () {
      return this.messageType === 'text';
    }
  },
  fileUrl: {
    type: String,
    required: function () {
      return this.messageType === 'file';
    }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model<Message>('Message', messageSchema);

export { Message };