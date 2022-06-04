import { logger } from "@/utils/logger";
import { ChatCreation } from "./chats";
import { MessageCreation } from "./messages";


const run = async() => {
    await Promise.all([
        new ChatCreation().consume(),
        new MessageCreation().consume(),
    ])
    logger.info('worker is running...')
}

run()