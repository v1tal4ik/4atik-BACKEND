import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';
import db from '../models/Users/usersDB';

dotenv.config();


const generateAccessToken = (userId) => {
  const payload = {
    userId,
  };
  const options = { expiresIn: 10 }; // seconds
  return jwt.sign(payload, process.env.SECRET_WORD, options);
};

const generateRefreshToken = () => (uuid());

const refreshAndGetNewTokens = async ({ id, refreshToken: oldRefreshToken }) => (
  new Promise(async (resolve, reject) => {
    try {
      const doc = await db.getUserById({ id });
      if (doc.refreshToken === oldRefreshToken) {
        const accessToken = generateAccessToken(id);
        const refreshToken = generateRefreshToken();
        await db.replaceTokenById({ id, refreshToken });
        resolve({ id, accessToken, refreshToken });
      } else {
        reject(Error('Resfres token is not valid'));
      }
    } catch (err) {
      reject(err.message);
    }
  })
);

export {
  generateAccessToken,
  generateRefreshToken,
  refreshAndGetNewTokens,
};
