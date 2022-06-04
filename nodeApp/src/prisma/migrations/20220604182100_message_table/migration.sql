-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `chatNumber` INTEGER NOT NULL,
    `applicationToken` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Message_applicationToken_chatNumber_number_key`(`applicationToken`, `chatNumber`, `number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_applicationToken_chatNumber_fkey` FOREIGN KEY (`applicationToken`, `chatNumber`) REFERENCES `Chat`(`applicationToken`, `number`) ON DELETE RESTRICT ON UPDATE CASCADE;
