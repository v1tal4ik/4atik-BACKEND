import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Input email'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Input full name'],
    },
    password: {
      type: String,
      required: [true, 'Input password'],
    },
    salt: {
      type: String,
      required: [true, 'Input salt'],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const Users = mongoose.model('users', userSchema);

export default Users;
