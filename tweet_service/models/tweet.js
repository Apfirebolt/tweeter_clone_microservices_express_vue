import mongoose from "mongoose";
import Hashtag from "./hashtag.js";

const tweetSchema = mongoose.Schema(
  {
    user_id: {
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
    liked_by: [
      {
        user_id: {
          type: String,
          required: true,
        },
        liked_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    retweeted_by: [
      {
        user_id: {
          type: String,
          required: true,
        },
        retweeted_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    hashtags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hashtag",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
