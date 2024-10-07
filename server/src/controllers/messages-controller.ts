import { Message } from "../models/message-model";
import { CustomRequest } from "../types/custom-request";
import { Response } from "express";
import { mkdirSync, renameSync } from 'fs'


const getMessages = async (req: CustomRequest, res: Response) => {
  try {
    const messageOwnerId = req.userId;
    const messageRecipientId = req.body.id;

    if (!messageOwnerId || !messageRecipientId) {
      return res.status(400).send('Message owner id and recipient id are required');
    }

    const messages = await Message.find({
      $or: [
        { sender: messageOwnerId, recipient: messageRecipientId },
        { sender: messageRecipientId, recipient: messageOwnerId }
      ]
    }).sort({ timestamp: 1 });

    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
}

const uploadFile = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('File is required');
    }

    const date = Date.now();
    const fileDir = 'uploads/files/' + date;
    const fileName = fileDir + '/' + req.file.originalname;

    mkdirSync(fileDir, { recursive: true });
    renameSync(req.file.path, fileName);

    return res.status(200).json({ filePath: fileName });
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
}

export { getMessages, uploadFile }