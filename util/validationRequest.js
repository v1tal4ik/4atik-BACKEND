/* eslint-disable */
import jwt from 'jsonwebtoken';

export const checkTokensFunc = (req, res, next) => {
  const headersAuth = req.headers.authorization;
  const accessToken = headersAuth.split(' ')[1];
  try {
    const { id } = jwt.verify(accessToken, process.env.SECRET_WORD);
    req.id = id;
    next();
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      res.status(401).json(e.message);
    }
    if (e.name === 'JsonWebTokenError') {
      res.status(400).json(e.message);
    }
  }
};
