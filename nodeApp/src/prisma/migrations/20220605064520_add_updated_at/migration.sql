-- AlterTable
ALTER TABLE `Chat` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Message` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE INDEX `Chat_updatedAt_idx` ON `Chat`(`updatedAt`);

-- CreateIndex
CREATE INDEX `Message_updatedAt_idx` ON `Message`(`updatedAt`);
