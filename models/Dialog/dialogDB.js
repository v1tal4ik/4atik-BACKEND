import Dialog from './dialogShema';

const fetchDialogsByUserId = async ({ authorId }) => {
  try {
    const doc = await Dialog.find()
      .or([{ author: authorId }, { partner: authorId }])
      .populate(['author', 'partner']);
    return Promise.resolve(doc);
  } catch (e) {
    return Promise.reject(e.reason);
  }
};

const createNewDialogByUserId = async ({ author, partner }) => {
  try {
    const doc = await new Dialog({ author, partner }).save();
    return Promise.resolve(doc);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  fetchDialogsByUserId,
  createNewDialogByUserId,
};
