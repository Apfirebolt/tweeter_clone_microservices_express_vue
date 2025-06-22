import express from "express";
import {
  getTweets,
  getTweetById,
  getTweetsByUser,
  createTweet,
  updateTweet,
  deleteTweet,
  likeTweet,
  unlikeTweet,
  retweetTweet,
  unretweetTweet,
  getTweetsByHashtag
} from "../controllers/tweetController.js";

const router = express.Router();

router
  .route("/")
  .get(getTweets)
  .post(createTweet);
router
  .route("/:id")
  .get(getTweetById)
  .put(updateTweet)
  .delete(deleteTweet);
router.get("/user/:userId", getTweetsByUser);
router.post("/:id/like", likeTweet);
router.post("/:id/unlike", unlikeTweet);
router.post("/:id/retweet", retweetTweet);
router.post("/:id/unretweet", unretweetTweet);
router.get("/hashtag/:hashtag", getTweetsByHashtag);

export default router;
