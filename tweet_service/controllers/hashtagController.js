import asyncHandler from 'express-async-handler';
import Hashtag from '../models/hashtag.js';

// @desc    Get all hashtags
// @route   GET /api/hashtags
// @access  Public
const getHashtags = asyncHandler(async (req, res) => {
    const hashtags = await Hashtag.find({}).sort({ count: -1 });
    res.json(hashtags);
});

// @desc    Get hashtag by ID
// @route   GET /api/hashtags/:id
// @access  Public
const getHashtagById = asyncHandler(async (req, res) => {
    const hashtag = await Hashtag.findById(req.params.id);
    
    if (hashtag) {
        res.json(hashtag);
    } else {
        res.status(404);
        throw new Error('Hashtag not found');
    }
});

// @desc    Create hashtag
// @route   POST /api/hashtags
// @access  Private
const createHashtag = asyncHandler(async (req, res) => {
    const { title } = req.body;
    
    if (!title) {
        res.status(400);
        throw new Error('Hashtag title is required');
    }
    
    const hashtag = await Hashtag.create({
        title: title.toLowerCase(),
        count: 1
    });
    
    res.status(201).json(hashtag);
});

// @desc    Update hashtag
// @route   PUT /api/hashtags/:id
// @access  Private
const updateHashtag = asyncHandler(async (req, res) => {
    const { title, count } = req.body;
    
    const hashtag = await Hashtag.findById(req.params.id);
    
    if (hashtag) {
        hashtag.title = title || hashtag.title;
        hashtag.count = count !== undefined ? count : hashtag.count;
        
        const updatedHashtag = await hashtag.save();
        res.json(updatedHashtag);
    } else {
        res.status(404);
        throw new Error('Hashtag not found');
    }
});

// @desc    Delete hashtag
// @route   DELETE /api/hashtags/:id
// @access  Private
const deleteHashtag = asyncHandler(async (req, res) => {
    const hashtag = await Hashtag.findById(req.params.id);
    
    if (hashtag) {
        await Hashtag.findByIdAndDelete(req.params.id);
        res.json({ message: 'Hashtag deleted successfully' });
    } else {
        res.status(404);
        throw new Error('Hashtag not found');
    }
});

// @desc    Increment hashtag count
// @route   PATCH /api/hashtags/:id/increment
// @access  Private
const incrementHashtagCount = asyncHandler(async (req, res) => {
    const hashtag = await Hashtag.findByIdAndUpdate(
        req.params.id,
        { $inc: { count: 1 } },
        { new: true }
    );
    
    if (hashtag) {
        res.json(hashtag);
    } else {
        res.status(404);
        throw new Error('Hashtag not found');
    }
});

export {
    getHashtags,
    getHashtagById,
    createHashtag,
    updateHashtag,
    deleteHashtag,
    incrementHashtagCount
};

export default Hashtag;
