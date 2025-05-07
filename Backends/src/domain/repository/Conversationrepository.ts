import { IConversation } from "../models/Converstaion";

export interface ConversationRepository {
    findOrCreateConversation(user1: string, user2: string): Promise<IConversation>;
    getConversationsByUser(userId: string): Promise<IConversation[]>;
  }