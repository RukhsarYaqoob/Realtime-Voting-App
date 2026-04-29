import Vote from "../models/Vote.js";
import Poll from "../models/Poll.js";

export const castVote = async (req, res) => {
  try {
    const { pollId, selectedOptions } = req.body;
    const voterId = req.user._id?.toString();

    if (!voterId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    if (!selectedOptions || selectedOptions.length === 0) {
      return res.status(400).json({ message: "No option selected" });
    }

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    const now = new Date();
    if (poll.startTime > now)
      return res.status(400).json({ message: "Poll not started yet" });
    if (poll.endTime < now)
      return res.status(400).json({ message: "Poll closed" });

    if (poll.pollType === "single" && selectedOptions.length > 1) {
      return res.status(400).json({ message: "Only one option allowed" });
    }

    const alreadyVoted = await Vote.findOne({ pollId, voterId });
    if (alreadyVoted || poll.voters.includes(voterId)) {
      return res.status(400).json({ message: "Duplicate vote not allowed" });
    }

    const vote = await Vote.create({
      pollId,
      voterId,
      selectedOptions,
    });

    const updatedPoll = await Poll.findByIdAndUpdate(
  pollId,
  {
    $push: { voters: voterId },
    $inc: { "options.$[elem].votes": 1 },
  },
  {
    arrayFilters: [{ "elem._id": { $in: selectedOptions } }],
    new: true, 
  }
);

const io = req.app.get("io");
if (io) {
  io.to("polls").emit("live_results", updatedPoll);
  io.to("polls").emit("vote_cast", { pollId: pollId.toString() }); 
}

return res.status(201).json(vote);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Vote failed",
    });
  }
};

export const checkUserVote = async (req, res) => {
  try {
    const voterId = req.user._id?.toString();
    const { pollId } = req.params;

    if (!voterId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const hasVoted = await Vote.findOne({ pollId, voterId });

    return res.status(200).json({
      hasVoted: !!hasVoted,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error checking vote" });
  }
};

export const getUserVotes = async (req, res) => {
  try {
    const voterId = req.user._id?.toString();

    if (!voterId) return res.status(401).json({ message: "Unauthorized" });

    const votes = await Vote.find({ voterId }).select("pollId");

    const votedPolls = votes.map((v) => v.pollId.toString());

    res.status(200).json({ votedPolls });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch votes" });
  }
};
