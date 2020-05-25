import db from '../models/Dialog/dialogDB';

const fetchDialogsByUserId = async (req, res) => {
  try {
    const data = await db.fetchDialogsByUserId({ authorId: req.query.id });
    res.status(200).json({ status: true, data });
  } catch (e) {
    res.status(404).json({ status: false, msg: e.message });
  }
};

const createNewDialogByUserId = async (req, res) => {
  try {
    const { author, partner, lastMessage } = req.body;
    const data = await db.createNewDialogByUserId({ author, partner, lastMessage });
    // TODO think about what should return
    res.status(200).json({ status: true, data });
  } catch (e) {
    res.status(400).json({ status: false, msg: e.message });
  }
};

export default {
  fetchDialogsByUserId,
  createNewDialogByUserId,
};
