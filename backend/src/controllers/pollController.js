import Poll from "../models/Poll.js";
import Vote from "../models/Vote.js";
import { calculateResults } from "../utils/calculateResults.js";

// create poll
export const createPoll = async (req, res) => {
  try {
    const poll = await Poll.create(req.body);

    const io = req.app.get("io");
    if (io) {
      io.to("polls").emit("pollCreated", poll);
    }

    res.status(201).json(poll);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get polls 
export const getPolls = async (req, res) => {
  try {
    const { status, category, search } = req.query;
    const now = new Date();

    let query = {};

    if (category) query.category = category;
    if (search) query.question = { $regex: search, $options: "i" };

    if (status === "active") {
      query.startTime = { $lte: now };
      query.endTime = { $gte: now };
    } else if (status === "closed") {
      query.endTime = { $lt: now };
    } else if (status === "upcoming") {
      query.startTime = { $gt: now };
    }

    const polls = await Poll.find(query).sort({ createdAt: -1 });

    const formattedPolls = polls.map(poll => {
      let pollStatus = "upcoming";
      if (poll.startTime <= now && poll.endTime >= now) pollStatus = "active";
      if (poll.endTime < now) pollStatus = "closed";

      return { ...poll.toObject(), pollStatus };
    });

    res.json(formattedPolls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// poll result 
export const getPollResults = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) return res.status(404).json({ message: "Poll not found" });

    const votes = await Vote.find({ pollId: poll._id });

    res.json(calculateResults(poll, votes));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// deletePoll
export const deletePoll = async (req, res) => {
  try {
    const { id } = req.params;

    await Poll.findByIdAndDelete(id);

    res.status(200).json({
      message: "Poll deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// updatePoll 
export const updatePoll = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPoll = await Poll.findByIdAndUpdate(
      id,
      {
        question: req.body.question,
        pollType: req.body.pollType,
        endTime: req.body.endTime,
        options: req.body.options
      },
      { new: true, runValidators: true }
    );

    if (!updatedPoll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.status(200).json(updatedPoll);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};