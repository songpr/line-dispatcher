/*
  Warnings:

  - Changed the type of `lineWebhook` on the `LineWebhook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `lineWebhookEvent` on the `WebhookEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "LineWebhook" DROP COLUMN "lineWebhook",
ADD COLUMN     "lineWebhook" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "WebhookEvent" DROP COLUMN "lineWebhookEvent",
ADD COLUMN     "lineWebhookEvent" JSONB NOT NULL;
