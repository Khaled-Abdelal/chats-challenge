-- AlterTable
ALTER TABLE `Application` ADD COLUMN `chatsCount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Chat` ADD COLUMN `messagesCount` INTEGER NOT NULL DEFAULT 0;
