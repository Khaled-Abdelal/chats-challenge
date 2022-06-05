/*
  Warnings:

  - You are about to drop the column `chatsCount` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `applicationToken` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `messagesCount` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `applicationToken` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Message` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[application_token,number]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[application_token,chatNumber,number]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `application_token` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `application_token` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Chat` DROP FOREIGN KEY `Chat_applicationToken_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_applicationToken_chatNumber_fkey`;

-- DropIndex
DROP INDEX `Chat_applicationToken_number_key` ON `Chat`;

-- DropIndex
DROP INDEX `Chat_createdAt_idx` ON `Chat`;

-- DropIndex
DROP INDEX `Chat_updatedAt_idx` ON `Chat`;

-- DropIndex
DROP INDEX `Message_applicationToken_chatNumber_number_key` ON `Message`;

-- DropIndex
DROP INDEX `Message_createdAt_idx` ON `Message`;

-- DropIndex
DROP INDEX `Message_updatedAt_idx` ON `Message`;

-- AlterTable
ALTER TABLE `Application` DROP COLUMN `chatsCount`,
    ADD COLUMN `chats_count` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Chat` DROP COLUMN `applicationToken`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `messagesCount`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `application_token` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `messages_count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `applicationToken`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `application_token` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE INDEX `Chat_updated_at_idx` ON `Chat`(`updated_at`);

-- CreateIndex
CREATE INDEX `Chat_created_at_idx` ON `Chat`(`created_at`);

-- CreateIndex
CREATE UNIQUE INDEX `Chat_application_token_number_key` ON `Chat`(`application_token`, `number`);

-- CreateIndex
CREATE INDEX `Message_updated_at_idx` ON `Message`(`updated_at`);

-- CreateIndex
CREATE INDEX `Message_created_at_idx` ON `Message`(`created_at`);

-- CreateIndex
CREATE UNIQUE INDEX `Message_application_token_chatNumber_number_key` ON `Message`(`application_token`, `chatNumber`, `number`);

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_application_token_fkey` FOREIGN KEY (`application_token`) REFERENCES `Application`(`token`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_application_token_chatNumber_fkey` FOREIGN KEY (`application_token`, `chatNumber`) REFERENCES `Chat`(`application_token`, `number`) ON DELETE RESTRICT ON UPDATE CASCADE;
