import mongoose from "mongoose";

type Message = Document & {
  sender: mongoose.Schema.Types.ObjectId;
  recipient?: mongoose.Schema.Types.ObjectId;
  messageType: 'text' | 'file';
  content?: string;
  fileUrl?: string;
  timestamp: Date;
}

export type { Message }