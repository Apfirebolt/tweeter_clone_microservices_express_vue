import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    from_user_id: {
      type: String,
      required: true,
    },
    to_user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
