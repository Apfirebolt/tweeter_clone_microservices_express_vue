import express from "express";
import {
  getHashtags,
  getHashtagById,
  createHashtag,
  updateHashtag,
  deleteHashtag,
  incrementHashtagCount,
} from "../controllers/hashtagController.js";

const router = express.Router();

router.get("/", getHashtags).post("/", createHashtag);
router
  .route("/:id")
  .get(getHashtagById)
  .put(updateHashtag)
  .delete(deleteHashtag);
router.patch("/:id/increment", incrementHashtagCount);

export default router;
