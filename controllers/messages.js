import db from '../models/Message/messagesDB';

const fetchMessagesByDialogId = async (req, res) => {
  try {
    const { dialogId } = req.query;
    const data = await db.fetchMessagesByDialogId({ dialogId });
    res.status(200).json({ status: true, data });
  } catch (e) {
    res.status(404).json({ status: false, msg: e.message });
  }
};

const createMessageForDialog = async (req, res) => {
  try {
    const { user, text, dialogId } = req.body;
    const data = await db.createMessageForDialog({ user, text, dialogId });
    // TODO think about what should return
    res.status(200).json({ status: true, data });
  } catch (e) {
    res.status(400).json({ status: false, msg: e.message });
  }
};

const deleteMessageById = async (req, res) => {
  try {
    const { id } = req.query;
    await db.deleteMessageById({ id });
    res.status(200).json({ status: true });
  } catch (e) {
    res.status(400).json({ status: false, msg: e.message });
  }
};

export default {
  fetchMessagesByDialogId,
  createMessageForDialog,
  deleteMessageById,
};
