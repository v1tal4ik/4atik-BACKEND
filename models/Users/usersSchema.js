import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, 'Input id'],
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
  },
  {
    versionKey: false,
  },
);

const Users = mongoose.model('users', userSchema);
console.log(Users.users);

export default Users;
