import { compare } from "bcrypt";
import config from "../config";
import User from "../models/user-model";
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';

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
        image: user.image,
        color: user.color
      }
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send('Internal Server Error')
  }
}

export { signUp, login }