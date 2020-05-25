import mongoose from 'mongoose';

const { Schema } = mongoose;

const dialogSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    partner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Dialog = mongoose.model('dialogs', dialogSchema);

export default Dialog;
