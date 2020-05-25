import crypto from 'crypto';
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

const createNewUser = async ({ email, name, password }) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 512, 'sha512').toString('hex');
  const user = new Users({
    email,
    name,
    password: hash,
    salt,
    refreshToken: '',
  });
  try {
    const doc = await user.save();
    if (doc.email === email) {
      // set id the same as _id for frontend part
      await Users.findByIdAndUpdate(doc._id, { id: doc._id });
      return Promise.resolve({ status: true });
    }
  } catch (e) {
    return Promise.reject(new Error(`Opps, the registration ${name} was failed :(`));
  }
};

const changePassword = async ({ id, oldPassword, newPassword }) => {
  const doc = await Users.findOne({ id });
  const oldHash = crypto.pbkdf2Sync(oldPassword, doc.salt, 1000, 512, 'sha512').toString('hex');

  if (doc.password === oldHash) {
    const newHash = crypto.pbkdf2Sync(newPassword, doc.salt, 1000, 512, 'sha512').toString('hex');
    const updatedUser = await Users.findOneAndUpdate({ id }, { password: newHash }, { new: true });
    if (updatedUser.id === id) {
      return Promise.resolve('Password has been change successfull:)');
    }
    return Promise.reject(new Error('Oops, something went wrong'));
  }
  return Promise.reject(new Error('Old password is wrong:('));
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
  createNewUser,
  changePassword,
  setRefreshToken,
};
