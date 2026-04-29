import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true
    },

    voterId: {
      type: String,
      required: true // email / user id / ip
    },

    selectedOptions: {
      type: [String],
      required: true
    }
  },
  { timestamps: true }
);

voteSchema.index({ pollId: 1, voterId: 1 }, { unique: true });

export default mongoose.model("Vote", voteSchema);
