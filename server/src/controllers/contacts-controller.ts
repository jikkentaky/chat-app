import { Response } from 'express';
import { User } from '../models/user-model';
import { CustomRequest } from '../types/custom-request';
import mongoose, { mongo } from 'mongoose';
import { Message } from '../models/message-model';

type SearchRequest = CustomRequest & {
  searchTerm?: string;
};

const searchContact = async (req: SearchRequest, res: Response) => {
  try {
    const { searchTerm } = req.body;

    if (!searchTerm) {
      return res.status(400).send('Search term is required');
    }

    const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const regex = new RegExp(`^${sanitizedSearchTerm}`, 'i');

    const contacts = await User.find({
      $and: [{ _id: { $ne: req.userId } },
      { $or: [{ firstName: regex }, { lastName: regex }, { email: regex }] }]
    });

    return res.status(200).json({ contacts });
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};

const getContactsForDMList = async (req: SearchRequest, res: Response) => {
  try {
    const { userId } = req;
    const userObjectId = new mongoose.Types.ObjectId(userId as string);

    const contacts = await Message.aggregate([
      { $match: { $or: [{ sender: userObjectId }, { recipient: userObjectId }] } },
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ['$sender', userObjectId] }, then: '$recipient', else: '$sender'
            }
          },
          lastMessageTime: { $first: '$timestamp' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'contactInfo',
        },
      },
      { $unwind: '$contactInfo' },
      {
        $project: {
          _id: 1,
          lastMessageTime: -1,
          email: '$contactInfo.email',
          firstName: '$contactInfo.firstName',
          lastName: '$contactInfo.lastName',
        }
      },
      { $sort: { lastMessageTime: -1 } }
    ]);

    return res.status(200).json({ contacts });
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};

const getAllContacts = async (req: SearchRequest, res: Response) => {
  try {
    const users = await User.find(
      { _id: { $ne: req.userId } },
      'firstName lastName _id email'
    );

    const contacts = users.map((user) => ({
      label: user.firstName
        ? `${user.firstName} ${user.lastName}`
        : `${user.email}`,
    }));

    return res.status(200).json({ contacts });
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};

export { searchContact, getContactsForDMList, getAllContacts };