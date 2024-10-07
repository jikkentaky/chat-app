import { compare } from "bcrypt";
import config from "../config";
import { User } from "../models/user-model";
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import { CustomRequest } from "../types/custom-request";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email: string, userId: string) => {
  return jwt.sign({ email, userId }, config.jwt_secret as string, { expiresIn: maxAge });
}

const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    const user = await User.create({ email, password });

    res.cookie('jwt', createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: 'none',
    });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup
      }
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const auth = await compare(password, user.password);

    if (!auth) {
      return res.status(401).send('Invalid credentials');
    }

    res.cookie('jwt', createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: 'none',
    });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
}

const getUserInfo = async (req: CustomRequest, res: Response) => {
  const foundUser = await User.findById(req.userId);

  if (!foundUser) {
    return res.status(404).send('User not found');
  }

  return res.status(200).json({
    id: foundUser.id,
    email: foundUser.email,
    profileSetup: foundUser.profileSetup,
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
  })
}

const updateUserInfo = async (req: CustomRequest, res: Response) => {
  const { userId } = req;
  const { firstName, lastName } = req.body.data;

  if (!firstName || !lastName) {
    return res.status(400).send('First name and last name are required');
  }

  const updatedUser = await User.findByIdAndUpdate(userId, {
    firstName,
    lastName,
    profileSetup: true
  }, {
    new: true, runValidators: true
  });

  if (!updatedUser) {
    return res.status(404).send('User not found');
  }

  return res.status(200).json({
    user: {
      id: updatedUser.id,
      email: updatedUser.email,
      profileSetup: updatedUser.profileSetup,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    }
  });
}

const logOut = async (_req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', { maxAge: 1, secure: true, sameSite: 'none' });
    return res.status(200).send('Logged out');
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
}

export { signUp, login, getUserInfo, updateUserInfo, logOut }