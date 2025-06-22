import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/user.js';
import Follow from '../models/follow.js';

// @desc    Follow a user
// @route   POST /api/follow/:userId
// @access  Private
const followUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    if (userId === currentUserId.toString()) {
        res.status(400);
        throw new Error('You cannot follow yourself');
    }

    const userToFollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow) {
        res.status(404);
        throw new Error('User not found');
    }

    if (currentUser.following.includes(userId)) {
        res.status(400);
        throw new Error('You are already following this user');
    }

    // Add to following list of current user
    currentUser.following.push(userId);
    await currentUser.save();

    // Add to followers list of target user
    userToFollow.followers.push(currentUserId);
    await userToFollow.save();

    res.status(200).json({
        message: `You are now following ${userToFollow.username}`,
    });
});

// @desc    Unfollow a user
// @route   DELETE /api/follow/:userId
// @access  Private
const unfollowUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    if (userId === currentUserId.toString()) {
        res.status(400);
        throw new Error('You cannot unfollow yourself');
    }

    const userToUnfollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow) {
        res.status(404);
        throw new Error('User not found');
    }

    if (!currentUser.following.includes(userId)) {
        res.status(400);
        throw new Error('You are not following this user');
    }

    // Remove from following list of current user
    currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== userId
    );
    await currentUser.save();

    // Remove from followers list of target user
    userToUnfollow.followers = userToUnfollow.followers.filter(
        (id) => id.toString() !== currentUserId.toString()
    );
    await userToUnfollow.save();

    res.status(200).json({
        message: `You have unfollowed ${userToUnfollow.username}`,
    });
});

// @desc    Get followers of a user
// @route   GET /api/follow/:userId/followers
// @access  Public
const getFollowers = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('followers', 'username email');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({
        followers: user.followers,
        followersCount: user.followers.length,
    });
});

// @desc    Get following list of a user
// @route   GET /api/follow/:userId/following
// @access  Public
const getFollowing = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('following', 'username email');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({
        following: user.following,
        followingCount: user.following.length,
    });
});

export {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
};
