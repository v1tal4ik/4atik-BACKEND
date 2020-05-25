import { v4 as uuidv4 } from 'uuid';
import Dialog from './dialogShema';

const fetchDialogsByUserId = async ({ authorId }) => {
  try {
    console.log(authorId);
    const doc = await Dialog.find({ author: authorId }).populate(['author']);
    console.log({ doc });
    return Promise.resolve(doc);
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

const createNewDialogByUserId = async ({ author, partner, lastMessage }) => {
  try {
    const id = uuidv4();
    const dialogInstance = new Dialog({ id, author, partner, lastMessage });
    const doc = await dialogInstance.save();
    if (doc.id === id) {
      return Promise.resolve(doc);
    }
    return Promise.reject(new Error('Creating new dialog was failed:('));
  } catch (e) {
    return Promise.reject(new Error('Something went wrong'));
  }
};

export default {
  fetchDialogsByUserId,
  createNewDialogByUserId,
};
