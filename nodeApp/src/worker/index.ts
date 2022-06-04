import { logger } from "@/utils/logger";
import { ChatCreation } from "./chat";


const run = async() => {
    await Promise.all([
        new ChatCreation().consume()
    ])
    logger.info('worker is running...')
}

run()