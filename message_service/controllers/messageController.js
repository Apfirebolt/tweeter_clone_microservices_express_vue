import asyncHandler from '../middleware/asyncHandler.js';
import Message from '../models/message.js';

// @desc    Create a new message
// @route   POST /api/messages
// @access  Private
const createMessage = asyncHandler(async (req, res) => {
  const { to_user_id, title, content } = req.body;
  const from_user_id = req.user._id; // Assuming user ID comes from auth middleware

  const message = await Message.create({
    from_user_id,
    to_user_id,
    title,
    content,
  });

  if (message) {
    res.status(201).json(message);
  } else {
    res.status(400);
    throw new Error('Invalid message data');
  }
});

// @desc    Get all messages for a user
// @route   GET /api/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  const messages = await Message.find({
    $or: [
      { from_user_id: userId },
      { to_user_id: userId }
    ]
  }).sort({ createdAt: -1 });
  
  res.json(messages);
});

// @desc    Get message by ID
// @route   GET /api/messages/:id
// @access  Private
const getMessageById = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  const userId = req.user._id;

  if (message) {
    // Check if user is sender or receiver
    if (message.from_user_id === userId || message.to_user_id === userId) {
      res.json(message);
    } else {
      res.status(403);
      throw new Error('Not authorized to view this message');
    }
  } else {
    res.status(404);
    throw new Error('Message not found');
  }
});

// @desc    Update message
// @route   PUT /api/messages/:id
// @access  Private
const updateMessage = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const message = await Message.findById(req.params.id);
  const userId = req.user._id;

  if (message) {
    // Only sender can update the message
    if (message.from_user_id === userId) {
      message.title = title || message.title;
      message.content = content || message.content;

      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } else {
      res.status(403);
      throw new Error('Not authorized to update this message');
    }
  } else {
    res.status(404);
    throw new Error('Message not found');
  }
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  const userId = req.user._id;

  if (message) {
    // Only sender can delete the message
    if (message.from_user_id === userId) {
      await Message.findByIdAndDelete(req.params.id);
      res.json({ message: 'Message deleted successfully' });
    } else {
      res.status(403);
      throw new Error('Not authorized to delete this message');
    }
  } else {
    res.status(404);
    throw new Error('Message not found');
  }
});

export {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};
