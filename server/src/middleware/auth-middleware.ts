import { Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import config from '../config';
import { CustomRequest } from '../types/custom-request';

type CustomJwtPayload = JwtPayload & {
  userId: string;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).send('Access denied.');

  jwt.verify(
    token,
    config.jwt_secret as string,
    (err: VerifyErrors | null, decoded?: object | string) => {
      if (err) return res.status(403).send('Invalid token.');
      const payload = decoded as CustomJwtPayload;

      if (payload) {
        req.userId = payload.userId;
        next();
      }
    }
  );
};

export { verifyToken };