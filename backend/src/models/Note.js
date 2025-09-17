import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    favorite: { type: Boolean, default: false },

    // 👇 New fields for collaboration
    owner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    collaborators: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],

    lastEditedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
