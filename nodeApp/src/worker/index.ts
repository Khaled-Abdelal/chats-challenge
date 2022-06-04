import { logger } from "@/utils/logger";
import { ChatCreation } from "./chats";
import { MessageCreation, MessageIndexing } from "./messages";


const run = async() => {
    await Promise.all([
        new ChatCreation().consume(),
        new MessageCreation().consume(),
        new MessageIndexing().consume()
    ])
    logger.info('worker is running...')
}

run()