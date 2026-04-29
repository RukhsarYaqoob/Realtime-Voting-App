import express from "express";
import {
  createPoll,
  getPolls,
  getPollResults,
  deletePoll,
  updatePoll
} from "../controllers/pollController.js";

const router = express.Router();

router.post("/", createPoll);
router.get("/", getPolls);
router.get("/:id/results", getPollResults);

router.put("/:id", updatePoll);   
router.delete("/:id", deletePoll);

export default router;