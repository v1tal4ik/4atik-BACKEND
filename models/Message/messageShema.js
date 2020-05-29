import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    id: {
      type: String,
      default: function () {
        return this._id;
      },
    },
    text: {
      type: String,
      required: true,
    },
    dialogId: {
      type: Schema.Types.ObjectId,
      ref: 'dialogs',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    unRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Messages = mongoose.model('messages', messageSchema);

export default Messages;
