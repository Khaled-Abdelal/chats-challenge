/*
  Warnings:

  - A unique constraint covering the columns `[applicationToken,number]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Chat_number_key` ON `Chat`;

-- CreateIndex
CREATE UNIQUE INDEX `Chat_applicationToken_number_key` ON `Chat`(`applicationToken`, `number`);
