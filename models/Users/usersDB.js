import crypto from 'crypto';
import uuidv4 from 'uuid/v4';
import Users from './usersSchema';

const getUserById = async ({ id }) => {
  const doc = await Users.findOne({ id });
  if (doc) {
    if (doc.id === id) {
      return Promise.resolve(doc);
    }
  }
  return Promise.reject(new Error(`User with id:${id} - not found:(`));
};

const getUserByCredential = async ({ email, password }) => {
  try {
    const user = await Users.findOne({ email });
    const { salt } = user;
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 512, 'sha512').toString('hex');
    if (hash === user.password) {
      return Promise.resolve(user);
    }
    throw new Error();
  } catch (e) {
    return Promise.reject(new Error('Opps, your email or password is wrong :( '));
  }
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
    refreshToken: '',
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

const setRefreshToken = async ({ id, refreshToken }) => {
  try {
    const user = await Users.findOneAndUpdate({ id }, { refreshToken }, { new: true });
    return Promise.resolve(user);
  } catch (e) {
    return Promise.reject(new Error('Set new refresh token - failed'));
  }
};

export default {
  getUserById,
  getUserByCredential,
  addNewUser,
  setRefreshToken,
};
