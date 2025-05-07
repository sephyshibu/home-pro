import mongoose from "mongoose";
import { IConversation } from "../../../domain/models/Converstaion";

const ConversationModel=new mongoose.Schema<IConversation>({
    participants: [{ type: String, required: true }],
  },
  { timestamps: true })

export const ConversationModels= mongoose.model<IConversation>("Conversation", ConversationModel);