import Messages from './messageShema';

const fetchMessagesByDialogId = async ({ dialogId }) => {
  try {
    const doc = await Messages.find({ dialogId }).populate(['dialogs']);
    return Promise.resolve(doc);
  } catch (e) {
    return Promise.reject(e);
  }
};

const createMessageForDialog = async ({ user, text, dialogId }) => {
  try {
    const doc = await new Messages({ user, text, dialogId }).save();
    return Promise.resolve(doc);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  fetchMessagesByDialogId,
  createMessageForDialog,
};
