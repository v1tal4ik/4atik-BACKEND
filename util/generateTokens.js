import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';

dotenv.config();

const generateAccessToken = ({ id, email }) => {
  const payload = { id, email };
  const options = { expiresIn: 86400 }; // seconds, current set a day  = [86400]
  return jwt.sign(payload, process.env.SECRET_WORD, options);
};

const generateRefreshToken = () => uuid();

export { generateAccessToken, generateRefreshToken };
