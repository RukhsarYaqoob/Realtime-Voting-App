import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 } 
});

const pollSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: {
      type: [optionSchema],
      validate: [v => Array.isArray(v) && v.length >= 2, "At least 2 options required"]
    },
    pollType: {
      type: String,
      enum: ["single", "multiple"], 
      default: "single"
    },
    
    
    voters: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }], 

    category: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
  },
  { timestamps: true }
);


pollSchema.index({ startTime: 1, endTime: 1 });

export default mongoose.model("Poll", pollSchema);