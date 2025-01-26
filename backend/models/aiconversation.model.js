import mongoose from "mongoose";


const partSchema = new mongoose.Schema({
  text: {
    type: String,
    required: false,
  },
});


const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "model"],
      required: true,
    },
    parts: [partSchema],
    img: {
      type: String,
      required: false,
    },
  },
  { timestamps: true } 
);


const aiConversationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    history: [messageSchema], 
  },
  { timestamps: true } 
);

export default mongoose.models.aiConversation || mongoose.model("aiConversation", aiConversationSchema);
