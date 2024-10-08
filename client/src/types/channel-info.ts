import { MessageInfo } from "./message-info";

type ChannelInfo = {
  name: string;
  messages: MessageInfo[];
  admin: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
};

export type { ChannelInfo }
