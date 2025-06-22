// @desc    Get all notifications for a user
// @route   GET /api/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  const notifications = await Message.find({
    user_id: userId
  }).sort({ createdAt: -1 });
  
  res.json(notifications);
});

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Message.findById(req.params.id);
  const userId = req.user._id;

  if (notification) {
    // Only the notification owner can delete it
    if (notification.user_id === userId) {
      await Message.findByIdAndDelete(req.params.id);
      res.json({ message: 'Notification deleted successfully' });
    } else {
      res.status(403);
      throw new Error('Not authorized to delete this notification');
    }
  } else {
    res.status(404);
    throw new Error('Notification not found');
  }
});

// @desc    Delete bulk notifications
// @route   DELETE /api/notifications/bulk
// @access  Private
const deleteBulkNotifications = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { notificationIds } = req.body; // Array of notification IDs

  if (!notificationIds || !Array.isArray(notificationIds)) {
    res.status(400);
    throw new Error('Please provide an array of notification IDs');
  }

  const result = await Message.deleteMany({
    _id: { $in: notificationIds },
    user_id: userId
  });

  res.json({
    message: `${result.deletedCount} notifications deleted successfully`,
    deletedCount: result.deletedCount
  });
});

export {
  getNotifications,
  deleteNotification,
  deleteBulkNotifications
}