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
    const instanceOfDialog = await Dialog.findOne({ author, partner });
    if (instanceOfDialog) {
      throw new Error('Dialog with this user was aleady created :(');
    } else {
      const doc = await new Dialog({ author, partner }).save();
      return Promise.resolve(doc);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

const deleteDialogById = async ({ id }) => {
  try {
    const doc = await Dialog.findOneAndDelete({ id });
    if (!doc) {
      throw new Error('Oops, that dialog not found :(');
    }
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};
export default {
  fetchDialogsByUserId,
  createNewDialogByUserId,
  deleteDialogById,
};
