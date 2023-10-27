/*
  Warnings:

  - You are about to drop the column `lineWebhook` on the `LineWebhook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LineWebhook" DROP COLUMN "lineWebhook";

-- AlterTable
ALTER TABLE "WebhookEvent" ADD COLUMN     "lineWebhookEvent" JSONB NOT NULL DEFAULT '{}';
