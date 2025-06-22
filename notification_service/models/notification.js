import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['like', 'comment', 'follow', 'mention', 'retweet', 'message']
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
