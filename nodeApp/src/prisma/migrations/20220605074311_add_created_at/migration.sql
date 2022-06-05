-- AlterTable
ALTER TABLE `Chat` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Message` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE INDEX `Chat_createdAt_idx` ON `Chat`(`createdAt`);

-- CreateIndex
CREATE INDEX `Message_createdAt_idx` ON `Message`(`createdAt`);
