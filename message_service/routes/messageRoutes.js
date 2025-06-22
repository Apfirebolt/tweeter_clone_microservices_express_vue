import express from "express";
import {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", createMessage).get("/", getMessages);
router
  .route("/:id")
  .get(getMessageById)
  .put(updateMessage)
  .delete(deleteMessage);

export default router;
