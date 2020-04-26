import crypto from 'crypto';
import uuidv4 from 'uuid/v4';
import Users from './usersSchema';

const getUserById = async ({ id }) => {
  const doc = await Users.findOne({ id });
  if (doc.id === id) {
    return Promise.resolve({ status: true, user: doc });
  }
  return Promise.reject();
};

const addNewUser = async ({ email, name, password }) => {
  const id = uuidv4();
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 512, 'sha512').toString('hex');
  const user = new Users({
    id,
    email,
    name,
    password: hash,
    salt,
  });
  try {
    const doc = await user.save();
    if (doc.email === email) {
      return Promise.resolve({ status: true });
    }
  } catch (e) {
    return Promise.reject(new Error(`Opps, the registration ${name} was failed :(`));
  }
};

export default {
  getUserById,
  addNewUser,
};
