import asyncHandler from 'express-async-handler';
import Tweet from '../models/tweet.js';
import Hashtag from '../models/hashtag.js';

// @desc    Get all tweets
// @route   GET /api/tweets
// @access  Public
const getTweets = asyncHandler(async (req, res) => {
  const tweets = await Tweet.find({})
    .populate('hashtags')
    .sort({ createdAt: -1 });
  res.json(tweets);
});

// @desc    Get tweet by ID
// @route   GET /api/tweets/:id
// @access  Public
const getTweetById = asyncHandler(async (req, res) => {
  const tweet = await Tweet.findById(req.params.id).populate('hashtags');
  
  if (tweet) {
    res.json(tweet);
  } else {
    res.status(404);
    throw new Error('Tweet not found');
  }
});

// @desc    Get tweets by user
// @route   GET /api/tweets/user/:userId
// @access  Public
const getTweetsByUser = asyncHandler(async (req, res) => {
  const tweets = await Tweet.find({ user_id: req.params.userId })
    .populate('hashtags')
    .sort({ createdAt: -1 });
  res.json(tweets);
});

// @desc    Create tweet
// @route   POST /api/tweets
// @access  Private
const createTweet = asyncHandler(async (req, res) => {
  const { title, content, user_id, hashtags } = req.body;
  
  if (!title || !content || !user_id) {
    res.status(400);
    throw new Error('Title, content and user_id are required');
  }
  
  // Process hashtags if provided
  let hashtagIds = [];
  if (hashtags && hashtags.length > 0) {
    for (const hashtagName of hashtags) {
      let hashtag = await Hashtag.findOne({ name: hashtagName });
      if (!hashtag) {
        hashtag = await Hashtag.create({ name: hashtagName });
      }
      hashtagIds.push(hashtag._id);
    }
  }
  
  const tweet = await Tweet.create({
    title,
    content,
    user_id,
    hashtags: hashtagIds
  });
  
  const populatedTweet = await Tweet.findById(tweet._id).populate('hashtags');
  res.status(201).json(populatedTweet);
});

// @desc    Update tweet
// @route   PUT /api/tweets/:id
// @access  Private
const updateTweet = asyncHandler(async (req, res) => {
  const { title, content, hashtags } = req.body;
  
  const tweet = await Tweet.findById(req.params.id);
  
  if (tweet) {
    tweet.title = title || tweet.title;
    tweet.content = content || tweet.content;
    
    // Update hashtags if provided
    if (hashtags) {
      let hashtagIds = [];
      for (const hashtagName of hashtags) {
        let hashtag = await Hashtag.findOne({ name: hashtagName });
        if (!hashtag) {
          hashtag = await Hashtag.create({ name: hashtagName });
        }
        hashtagIds.push(hashtag._id);
      }
      tweet.hashtags = hashtagIds;
    }
    
    const updatedTweet = await tweet.save();
    const populatedTweet = await Tweet.findById(updatedTweet._id).populate('hashtags');
    res.json(populatedTweet);
  } else {
    res.status(404);
    throw new Error('Tweet not found');
  }
});

// @desc    Delete tweet
// @route   DELETE /api/tweets/:id
// @access  Private
const deleteTweet = asyncHandler(async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);
  
  if (tweet) {
    await Tweet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tweet deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Tweet not found');
  }
});

// @desc    Like tweet
// @route   PATCH /api/tweets/:id/like
// @access  Private
const likeTweet = asyncHandler(async (req, res) => {
  const { user_id } = req.body;
  
  if (!user_id) {
    res.status(400);
    throw new Error('User ID is required');
  }
  
  const tweet = await Tweet.findById(req.params.id);
  
  if (!tweet) {
    res.status(404);
    throw new Error('Tweet not found');
  }
  
  // Check if user already liked the tweet
  const alreadyLiked = tweet.liked_by.some(like => like.user_id === user_id);
  
  if (alreadyLiked) {
    res.status(400);
    throw new Error('Tweet already liked by this user');
  }
  
  tweet.liked_by.push({ user_id });
  await tweet.save();
  
  const populatedTweet = await Tweet.findById(tweet._id).populate('hashtags');
  res.json(populatedTweet);
});

// @desc    Unlike tweet
// @route   PATCH /api/tweets/:id/unlike
// @access  Private
const unlikeTweet = asyncHandler(async (req, res) => {
  const { user_id } = req.body;
  
  if (!user_id) {
    res.status(400);
    throw new Error('User ID is required');
  }
  
  const tweet = await Tweet.findById(req.params.id);
  
  if (!tweet) {
    res.status(404);
    throw new Error('Tweet not found');
  }
  
  tweet.liked_by = tweet.liked_by.filter(like => like.user_id !== user_id);
  await tweet.save();
  
  const populatedTweet = await Tweet.findById(tweet._id).populate('hashtags');
  res.json(populatedTweet);
});

// @desc    Retweet
// @route   PATCH /api/tweets/:id/retweet
// @access  Private
const retweetTweet = asyncHandler(async (req, res) => {
  const { user_id } = req.body;
  
  if (!user_id) {
    res.status(400);
    throw new Error('User ID is required');
  }
  
  const tweet = await Tweet.findById(req.params.id);
  
  if (!tweet) {
    res.status(404);
    throw new Error('Tweet not found');
  }
  
  // Check if user already retweeted
  const alreadyRetweeted = tweet.retweeted_by.some(retweet => retweet.user_id === user_id);
  
  if (alreadyRetweeted) {
    res.status(400);
    throw new Error('Tweet already retweeted by this user');
  }
  
  tweet.retweeted_by.push({ user_id });
  await tweet.save();
  
  const populatedTweet = await Tweet.findById(tweet._id).populate('hashtags');
  res.json(populatedTweet);
});

// @desc    Unretweet
// @route   PATCH /api/tweets/:id/unretweet
// @access  Private
const unretweetTweet = asyncHandler(async (req, res) => {
  const { user_id } = req.body;
  
  if (!user_id) {
    res.status(400);
    throw new Error('User ID is required');
  }
  
  const tweet = await Tweet.findById(req.params.id);
  
  if (!tweet) {
    res.status(404);
    throw new Error('Tweet not found');
  }
  
  tweet.retweeted_by = tweet.retweeted_by.filter(retweet => retweet.user_id !== user_id);
  await tweet.save();
  
  const populatedTweet = await Tweet.findById(tweet._id).populate('hashtags');
  res.json(populatedTweet);
});

// @desc    Get tweets by hashtag
// @route   GET /api/tweets/hashtag/:hashtag
// @access  Public
const getTweetsByHashtag = asyncHandler(async (req, res) => {
  const hashtag = await Hashtag.findOne({ name: req.params.hashtag });
  
  if (!hashtag) {
    res.status(404);
    throw new Error('Hashtag not found');
  }
  
  const tweets = await Tweet.find({ hashtags: hashtag._id })
    .populate('hashtags')
    .sort({ createdAt: -1 });
  
  res.json(tweets);
});

export {
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
};
