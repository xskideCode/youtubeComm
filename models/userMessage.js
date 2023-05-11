import mongoose from "mongoose";

const userMessageSchema = mongoose.Schema({
    subject: { type: String, required: false },
    email: { type: String, required: true },
    message: { type: String, required: true },    
});

export default mongoose.model("UserMessage", userMessageSchema);