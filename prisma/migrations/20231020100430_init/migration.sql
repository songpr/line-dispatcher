/*
  Warnings:

  - You are about to drop the column `lineWebhookCreatedAt` on the `WebhookEvent` table. All the data in the column will be lost.
  - You are about to drop the column `lineWebhookXLineSignature` on the `WebhookEvent` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WebhookEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "replyToken" TEXT,
    "isRedelivery" BOOLEAN DEFAULT false,
    "lineWebhookEvent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_WebhookEvent" ("createdAt", "id", "isRedelivery", "lineWebhookEvent", "mode", "replyToken", "timestamp", "type", "updatedAt") SELECT "createdAt", "id", "isRedelivery", "lineWebhookEvent", "mode", "replyToken", "timestamp", "type", "updatedAt" FROM "WebhookEvent";
DROP TABLE "WebhookEvent";
ALTER TABLE "new_WebhookEvent" RENAME TO "WebhookEvent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
