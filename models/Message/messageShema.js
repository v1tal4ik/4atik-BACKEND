import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    partner: { type: Schema.Types.ObjectId, ref: 'Users' },
    author: { type: Schema.Types.ObjectId, ref: 'Users' },
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
  },
  {
    versionKey: false,
  }
);

const Message = mongoose.model('message', messageSchema);

export default Message;
