/*
  Warnings:

  - You are about to drop the column `xLineSignature` on the `WebhookEvent` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "LineWebhook" (
    "destination" TEXT NOT NULL,
    "lineWebhook" TEXT NOT NULL,
    "xLineSignature" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("xLineSignature", "createdAt")
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WebhookEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "replyToken" TEXT,
    "isRedelivery" BOOLEAN DEFAULT false,
    "lineWebhookEvent" TEXT NOT NULL
);
INSERT INTO "new_WebhookEvent" ("id", "isRedelivery", "lineWebhookEvent", "mode", "replyToken", "timestamp", "type") SELECT "id", "isRedelivery", "lineWebhookEvent", "mode", "replyToken", "timestamp", "type" FROM "WebhookEvent";
DROP TABLE "WebhookEvent";
ALTER TABLE "new_WebhookEvent" RENAME TO "WebhookEvent";
CREATE UNIQUE INDEX "WebhookEvent_type_key" ON "WebhookEvent"("type");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
