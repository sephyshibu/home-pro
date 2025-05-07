import { IConversation } from "../../domain/models/Converstaion";
import { ConversationRepository } from "../../domain/repository/Conversationrepository";
import { ConversationModels } from "../db/schemas/ConversationModel";

export class ConversationModelImpl implements ConversationRepository{
    async findOrCreateConversation(user1: string, user2: string): Promise<IConversation> {
        const sortedIds=[user1,user2].sort()
        let conversation=await ConversationModels.findOne({participants:sortedIds})
        if(!conversation){
            conversation=await ConversationModels.create({participants:sortedIds})

        }
        return conversation.toObject()

    }

    async getConversationsByUser(userId: string): Promise<IConversation[]> {
        return await ConversationModels.find({ participants: userId });

    }

}