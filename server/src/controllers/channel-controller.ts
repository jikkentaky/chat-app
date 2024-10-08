import { Request, Response } from 'express';
import { User } from '../models/user-model';
import { CustomRequest } from '../types/custom-request';
import { Channel } from '../models/channel-model';
import mongoose from 'mongoose';

const createChannel = async (req: CustomRequest, res: Response) => {
  try {
    const { name, members } = req.body;
    const adminId = req.userId;
    const admin = await User.findById(adminId);

    if (!admin) {
      return res.status(404).send('Admin not found');
    }

    const validMembers = await User.find({ _id: { $in: members } });

    if (members.length !== validMembers.length) {
      return res.status(400).send('Invalid members');
    }

    const newChannel = new Channel({
      name,
      members,
      admin: adminId
    })

    await newChannel.save();

    return res.status(201).json({
      channel: newChannel
    });
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
}

const getUserChannels = async (req: CustomRequest, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const channels = await Channel.find({
      $or: [
        { members: userId },
        { admin: userId }
      ]
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      channels
    });
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
}

const getChannelMessages = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;

    const channel = await Channel
      .findById(channelId)
      .populate({
        path: 'messages',
        populate: {
          path: 'sender',
          select: 'firstName lastName email _id'
        }
      });

    if (!channel) {
      return res.status(404).send('Channel not found');
    }

    const messages = channel.messages

    return res.status(200).json({
      messages
    });
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
}

export { createChannel, getUserChannels, getChannelMessages };