import express from "express";
import { castVote, checkUserVote, getUserVotes } from "../controllers/voteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//  protected route
router.post("/", protect, castVote);

router.get("/user/:pollId", protect, checkUserVote);
router.get("/user-all", protect, getUserVotes);

export default router;