import dotenv from 'dotenv';
import db from '../models/Users/usersDB';
import { generateAccessToken, generateRefreshToken } from '../services/authHelper';

dotenv.config();

const addNewUser = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const response = await db.addNewUser({ email, name, password });
    res.status(201).json(response);
  } catch (e) {
    console.log('work controllers err', e);
    res.status(400).json({ status: false, msg: e.message });
  }
};

export default {
  addNewUser,
};
