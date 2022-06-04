-- CreateTable
CREATE TABLE `Chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `applicationToken` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Chat_number_key`(`number`),
    INDEX `applicationToken`(`applicationToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_applicationToken_fkey` FOREIGN KEY (`applicationToken`) REFERENCES `Application`(`token`) ON DELETE RESTRICT ON UPDATE CASCADE;
