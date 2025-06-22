import express from "express";
import {
  getNotifications,
  deleteNotification,
  deleteBulkNotifications
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", getNotifications);
router.delete("/:id", deleteNotification);
router.delete("/bulk", deleteBulkNotifications);

export default router;
