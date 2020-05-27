import db from '../models/Dialog/dialogDB';
import messagesDB from '../models/Message/messagesDB';

const fetchDialogsByUserId = async (req, res) => {
  try {
    const { id } = req;
    const data = await db.fetchDialogsByUserId({ authorId: id });
    res.status(200).json({ status: true, data });
  } catch (e) {
    res.status(404).json({ status: false, msg: e.message });
  }
};

const createNewDialogByUserId = async (req, res) => {
  try {
    const { author, partner, text } = req.body;
    const dialog = await db.createNewDialogByUserId({ author, partner });
    await messagesDB.createMessageForDialog({
      user: author,
      dialogId: dialog._id,
      text,
    });
    // TODO think about what should return
    res.status(200).json({ status: true, data: dialog });
  } catch (e) {
    res.status(400).json({ status: false, msg: e.message });
  }
};

export default {
  fetchDialogsByUserId,
  createNewDialogByUserId,
};
