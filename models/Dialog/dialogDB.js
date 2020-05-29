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
    const isAlreadyDefine = !(await Dialog.findOne({ author, partner }).id);
    if (isAlreadyDefine) {
      throw new Error('Dialog with this user was aleady created :(');
    } else {
      const doc = await new Dialog({ author, partner }).save();
      return Promise.resolve(doc);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export default {
  fetchDialogsByUserId,
  createNewDialogByUserId,
};
