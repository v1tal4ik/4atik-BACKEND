import dotenv from 'dotenv';
import db from '../models/Users/usersDB';
import { generateAccessToken, generateRefreshToken } from '../util/generateTokens';

dotenv.config();

const getDataById = async (req, res) => {
  try {
    const { id, email, name } = await db.getUserById({ id: req.id });
    res.status(200).json({ status: true, user: { id, email, name } });
  } catch (e) {
    res.status(404).json({ status: false, msg: e.message });
  }
};

const getDataByCredential = async (req, res) => {
  try {
    const user = await db.getUserByCredential(req.body);
    const accessToken = generateAccessToken({ id: user.id, email: user.email });
    const refreshToken = generateRefreshToken();
    const { id, email, name } = await db.setRefreshToken({ id: user.id, refreshToken });
    res
      .status(200)
      .json({ status: true, user: { id, email, name }, auth: { accessToken, refreshToken } });
  } catch (e) {
    res.status(401).json({ status: false, msg: e.message });
  }
};

const createNewUser = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const response = await db.createNewUser({ email, name, password });
    res.status(201).json(response);
  } catch (e) {
    res.status(400).json({ status: false, msg: e.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const {
      id,
      body: { oldPassword, newPassword },
    } = req;

    const msg = await db.changePassword({ id, oldPassword, newPassword });
    res.status(200).json({ status: true, msg });
  } catch (e) {
    res.status(400).json({ status: false, msg: e.message });
  }
};

const refreshTokens = async (req, res) => {
  try {
    const { id, refreshToken } = req.body;
    const user = await db.getUserById({ id });
    if (user.refreshToken === refreshToken) {
      const accessToken = generateAccessToken({ id: user.id, email: user.email });
      const newRefreshToken = generateRefreshToken();
      await db.setRefreshToken({ id: user.id, refreshToken: newRefreshToken });
      res.status(200).json({ id, accessToken, refreshToken: newRefreshToken });
    } else {
      throw new Error('Refresh token is not valid');
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export default {
  getDataById,
  getDataByCredential,
  createNewUser,
  changePassword,
  refreshTokens,
};
